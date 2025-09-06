import { createSupabaseClient, createSupabaseAdminClient } from './supabase'
import { AdminUser, AdminSession, Profile } from './types'

export interface AdminAuthError {
  message: string
  status?: number
}

export interface AdminAuthResponse {
  user: AdminUser | null
  error: AdminAuthError | null
}

export interface AdminSessionResponse {
  session: AdminSession | null
  error: AdminAuthError | null
}

// Admin permissions
export const ADMIN_PERMISSIONS = {
  // User Management
  'users:read': 'View users',
  'users:write': 'Create/Update users',
  'users:delete': 'Delete users',
  
  // Product Management
  'products:read': 'View products',
  'products:write': 'Create/Update products',
  'products:delete': 'Delete products',
  
  // Order Management
  'orders:read': 'View orders',
  'orders:write': 'Update orders',
  'orders:delete': 'Delete orders',
  
  // Content Management
  'content:read': 'View content',
  'content:write': 'Create/Update content',
  'content:delete': 'Delete content',
  
  // Analytics
  'analytics:read': 'View analytics',
  
  // System Settings
  'settings:read': 'View settings',
  'settings:write': 'Update settings',
} as const

export type AdminPermission = keyof typeof ADMIN_PERMISSIONS

// Role-based permissions
export const ROLE_PERMISSIONS = {
  admin: [
    'users:read',
    'products:read',
    'products:write',
    'orders:read',
    'orders:write',
    'content:read',
    'content:write',
    'analytics:read',
  ] as AdminPermission[],
  
  super_admin: [
    'users:read',
    'users:write',
    'users:delete',
    'products:read',
    'products:write',
    'products:delete',
    'orders:read',
    'orders:write',
    'orders:delete',
    'content:read',
    'content:write',
    'content:delete',
    'analytics:read',
    'settings:read',
    'settings:write',
  ] as AdminPermission[],
}

// Admin authentication functions
export const adminSignIn = async (email: string, password: string): Promise<AdminAuthResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { 
        user: null, 
        error: { message: error.message, status: error.status || 401 } 
      }
    }

    if (!data.user) {
      return { user: null, error: { message: 'Authentication failed' } }
    }

    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError || !profile) {
      return { 
        user: null, 
        error: { message: 'Profile not found' } 
      }
    }

    if (!profile.role || !['admin', 'super_admin'].includes(profile.role)) {
      return { 
        user: null, 
        error: { message: 'Access denied. Admin privileges required.' } 
      }
    }

    if (!profile.is_active) {
      return { 
        user: null, 
        error: { message: 'Account is deactivated' } 
      }
    }

    // Update last login
    await supabase
      .from('profiles')
      .update({ 
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', data.user.id)

    const adminUser: AdminUser = {
      id: data.user.id,
      email: data.user.email!,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role as 'admin' | 'super_admin',
      permissions: ROLE_PERMISSIONS[profile.role as 'admin' | 'super_admin'],
      is_active: profile.is_active,
      last_login: new Date().toISOString(),
      created_at: profile.created_at,
      updated_at: profile.updated_at
    }

    return { user: adminUser, error: null }
  } catch (error) {
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred', status: 500 } 
    }
  }
}

export const createAdminSession = async (userId: string, permissions: AdminPermission[]): Promise<AdminSessionResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    // Create session that expires in 24 hours
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const { data, error } = await supabase
      .from('admin_sessions')
      .insert({
        user_id: userId,
        permissions,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single()

    if (error) {
      return { 
        session: null, 
        error: { message: error.message } 
      }
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return { 
        session: null, 
        error: { message: 'Profile not found' } 
      }
    }

    const adminUser: AdminUser = {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role as 'admin' | 'super_admin',
      permissions,
      is_active: profile.is_active,
      last_login: profile.last_login,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    }

    const session: AdminSession = {
      user: adminUser,
      permissions,
      expires_at: data.expires_at
    }

    return { session, error: null }
  } catch (error) {
    return { 
      session: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const getAdminSession = async (sessionId: string): Promise<AdminSessionResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    const { data, error } = await supabase
      .from('admin_sessions')
      .select(`
        *,
        profiles!inner(*)
      `)
      .eq('id', sessionId)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error) {
      return { 
        session: null, 
        error: { message: 'Session not found or expired' } 
      }
    }

    const profile = data.profiles
    const adminUser: AdminUser = {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role as 'admin' | 'super_admin',
      permissions: data.permissions,
      is_active: profile.is_active,
      last_login: profile.last_login,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    }

    const session: AdminSession = {
      user: adminUser,
      permissions: data.permissions,
      expires_at: data.expires_at
    }

    return { session, error: null }
  } catch (error) {
    return { 
      session: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const refreshAdminSession = async (sessionId: string): Promise<AdminSessionResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    // Extend session by 24 hours
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const { data, error } = await supabase
      .from('admin_sessions')
      .update({ 
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select(`
        *,
        profiles!inner(*)
      `)
      .single()

    if (error) {
      return { 
        session: null, 
        error: { message: 'Failed to refresh session' } 
      }
    }

    const profile = data.profiles
    const adminUser: AdminUser = {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role as 'admin' | 'super_admin',
      permissions: data.permissions,
      is_active: profile.is_active,
      last_login: profile.last_login,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    }

    const session: AdminSession = {
      user: adminUser,
      permissions: data.permissions,
      expires_at: data.expires_at
    }

    return { session, error: null }
  } catch (error) {
    return { 
      session: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const adminSignOut = async (sessionId: string): Promise<{ error: AdminAuthError | null }> => {
  try {
    const supabase = createSupabaseClient()
    
    // Delete admin session
    const { error } = await supabase
      .from('admin_sessions')
      .delete()
      .eq('id', sessionId)

    if (error) {
      return { error: { message: error.message } }
    }

    // Also sign out from Supabase Auth
    await supabase.auth.signOut()

    return { error: null }
  } catch (error) {
    return { 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const getCurrentAdminUser = async (): Promise<AdminUser | null> => {
  try {
    const supabase = createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !profile || !profile.role || !['admin', 'super_admin'].includes(profile.role)) {
      return null
    }

    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role as 'admin' | 'super_admin',
      permissions: ROLE_PERMISSIONS[profile.role as 'admin' | 'super_admin'],
      is_active: profile.is_active,
      last_login: profile.last_login,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    }
  } catch (error) {
    console.error('Error getting current admin user:', error)
    return null
  }
}

export const isAdmin = async (): Promise<boolean> => {
  try {
    const adminUser = await getCurrentAdminUser()
    return !!adminUser && adminUser.is_active
  } catch (error) {
    return false
  }
}

export const hasPermission = (user: AdminUser, permission: AdminPermission): boolean => {
  return user.permissions.includes(permission)
}

export const hasAnyPermission = (user: AdminUser, permissions: AdminPermission[]): boolean => {
  return permissions.some(permission => user.permissions.includes(permission))
}

export const hasAllPermissions = (user: AdminUser, permissions: AdminPermission[]): boolean => {
  return permissions.every(permission => user.permissions.includes(permission))
}

// Clean up expired sessions (run this periodically)
export const cleanupExpiredSessions = async (): Promise<{ error: AdminAuthError | null }> => {
  try {
    const supabase = createSupabaseAdminClient()
    
    const { error } = await supabase
      .from('admin_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString())

    if (error) {
      return { error: { message: error.message } }
    }

    return { error: null }
  } catch (error) {
    return { 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}
