import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from './supabase-server'
import { AdminPermission } from './types'

export interface AdminMiddlewareOptions {
  requiredPermissions?: AdminPermission[]
  requireAllPermissions?: boolean
  allowedRoles?: ('admin' | 'super_admin')[]
}

export async function withAdminAuth(
  request: NextRequest,
  options: AdminMiddlewareOptions = {}
) {
  const {
    requiredPermissions = [],
    requireAllPermissions = false,
    allowedRoles = ['admin', 'super_admin']
  } = options

  try {
    const supabase = createSupabaseServerClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user profile with role and permissions
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, is_active, permissions')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Check if user is active
    if (!profile.is_active) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Check if user has required role
    if (!profile.role || !allowedRoles.includes(profile.role as 'admin' | 'super_admin')) {
      return NextResponse.json(
        { error: 'Insufficient privileges' },
        { status: 403 }
      )
    }

    // Check permissions if required
    if (requiredPermissions.length > 0) {
      const userPermissions = profile.permissions || []
      
      const hasRequiredPermissions = requireAllPermissions
        ? requiredPermissions.every(permission => userPermissions.includes(permission))
        : requiredPermissions.some(permission => userPermissions.includes(permission))

      if (!hasRequiredPermissions) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }
    }

    // Add user info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-admin-user-id', user.id)
    requestHeaders.set('x-admin-role', profile.role)
    requestHeaders.set('x-admin-permissions', JSON.stringify(profile.permissions || []))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error('Admin middleware error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to get admin user info from request headers
export function getAdminUserFromRequest(request: NextRequest) {
  const userId = request.headers.get('x-admin-user-id')
  const role = request.headers.get('x-admin-role')
  const permissions = request.headers.get('x-admin-permissions')

  return {
    userId,
    role: role as 'admin' | 'super_admin' | null,
    permissions: permissions ? JSON.parse(permissions) : []
  }
}

// Higher-order function for API routes
export function withAdminAPI(
  handler: (request: NextRequest, context: any) => Promise<NextResponse>,
  options?: AdminMiddlewareOptions
) {
  return async (request: NextRequest, context: any) => {
    const authResponse = await withAdminAuth(request, options)
    
    if (authResponse.status !== 200) {
      return authResponse
    }

    return handler(request, context)
  }
}
