import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// Admin routes that require authentication
const ADMIN_ROUTES = [
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/products',
  '/admin/orders',
  '/admin/content',
  '/admin/analytics',
  '/admin/settings'
]

// Public admin routes (login, etc.)
const PUBLIC_ADMIN_ROUTES = [
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route))
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some(route => pathname.startsWith(route))

  if (isAdminRoute || isPublicAdminRoute) {
    // Create Supabase client
    const supabase = createSupabaseServerClient()

    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (isPublicAdminRoute) {
        // For public admin routes, just continue
        return NextResponse.next()
      }

      if (isAdminRoute) {
        if (authError || !user) {
          // Redirect to admin login if not authenticated
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Check if user has admin role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, is_active')
          .eq('id', user.id)
          .single()

        if (profileError || !profile) {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        if (!profile.role || !['admin', 'super_admin'].includes(profile.role)) {
          // Redirect to home if not admin
          return NextResponse.redirect(new URL('/', request.url))
        }

        if (!profile.is_active) {
          // Redirect to login if account is deactivated
          return NextResponse.redirect(new URL('/admin/login?error=account_deactivated', request.url))
        }

        // Check specific permissions for certain routes
        if (pathname.startsWith('/admin/users') && profile.role !== 'super_admin') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        if (pathname.startsWith('/admin/settings') && profile.role !== 'super_admin') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
      }
    } catch (error) {
      console.error('Middleware error:', error)
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
