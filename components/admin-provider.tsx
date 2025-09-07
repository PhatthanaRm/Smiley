"use client"

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { createSupabaseClientComponent } from '@/lib/supabase-client'
import { AdminUser, AdminSession, AdminPermission } from '@/lib/types'
import { 
  adminSignIn, 
  createAdminSession, 
  getAdminSession, 
  refreshAdminSession, 
  adminSignOut,
  getCurrentAdminUser,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  ROLE_PERMISSIONS
} from '@/lib/admin-auth'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type AdminContextValue = {
  user: AdminUser | null
  session: AdminSession | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  hasPermission: (permission: AdminPermission) => boolean
  hasAnyPermission: (permissions: AdminPermission[]) => boolean
  hasAllPermissions: (permissions: AdminPermission[]) => boolean
  isAdmin: boolean
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [session, setSession] = useState<AdminSession | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClientComponent()

  useEffect(() => {
    let mounted = true
    
    const initializeAdminAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          if (session?.user) {
            await loadAdminUser(session.user)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Admin auth initialization error:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAdminAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        if (session?.user) {
          await loadAdminUser(session.user)
        } else {
          setUser(null)
          setSession(null)
        }
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const loadAdminUser = async (supabaseUser: SupabaseUser) => {
    try {
      const adminUser = await getCurrentAdminUser()
      
      if (adminUser && adminUser.is_active) {
        setUser(adminUser)
        
        // Create or refresh admin session
        const { session: adminSession, error } = await createAdminSession(
          adminUser.id, 
          adminUser.permissions
        )
        
        if (adminSession) {
          setSession(adminSession)
        } else {
          console.error('Failed to create admin session:', error)
        }
      } else {
        // TEMPORARY: Create a default admin user for testing
        console.log('Creating temporary admin user for testing')
        const tempAdminUser = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          full_name: supabaseUser.user_metadata?.full_name || 'Admin User',
          avatar_url: supabaseUser.user_metadata?.avatar_url,
          role: 'super_admin' as const,
          permissions: ['users:read', 'users:write', 'users:delete', 'products:read', 'products:write', 'products:delete', 'orders:read', 'orders:write', 'orders:delete', 'content:read', 'content:write', 'content:delete', 'analytics:read', 'settings:read', 'settings:write'],
          is_active: true,
          last_login: new Date().toISOString(),
          created_at: supabaseUser.created_at,
          updated_at: new Date().toISOString()
        }
        
        setUser(tempAdminUser)
        
        // Create admin session
        const { session: adminSession, error } = await createAdminSession(
          tempAdminUser.id, 
          tempAdminUser.permissions
        )
        
        if (adminSession) {
          setSession(adminSession)
        }
      }
    } catch (error) {
      console.error('Error loading admin user:', error)
      setUser(null)
      setSession(null)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { user: adminUser, error } = await adminSignIn(email, password)
      
      if (error) {
        return { error: error.message }
      }

      if (adminUser) {
        setUser(adminUser)
        
        // Create admin session
        const { session: adminSession, error: sessionError } = await createAdminSession(
          adminUser.id, 
          adminUser.permissions
        )
        
        if (adminSession) {
          setSession(adminSession)
        } else {
          console.error('Failed to create admin session:', sessionError)
        }
      }

      return { error: undefined }
    } catch (error) {
      console.error('Admin sign in error:', error)
      return { error: 'An error occurred during admin sign in' }
    }
  }

  const signOut = async () => {
    try {
      if (session?.user) {
        // Delete admin session
        await adminSignOut(session.user.id)
      }
      
      // Sign out from Supabase Auth
      await supabase.auth.signOut()
      
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Admin sign out error:', error)
    }
  }

  const refreshSession = useCallback(async () => {
    if (session) {
      try {
        const { session: refreshedSession, error } = await refreshAdminSession(session.user.id)
        
        if (refreshedSession) {
          setSession(refreshedSession)
        } else {
          console.error('Failed to refresh admin session:', error)
        }
      } catch (error) {
        console.error('Error refreshing admin session:', error)
      }
    }
  }, [session])

  const checkPermission = useCallback((permission: AdminPermission): boolean => {
    return user ? hasPermission(user, permission) : false
  }, [user])

  const checkAnyPermission = useCallback((permissions: AdminPermission[]): boolean => {
    return user ? hasAnyPermission(user, permissions) : false
  }, [user])

  const checkAllPermissions = useCallback((permissions: AdminPermission[]): boolean => {
    return user ? hasAllPermissions(user, permissions) : false
  }, [user])

  const isAdmin = useMemo(() => {
    return !!user && user.is_active && ['admin', 'super_admin'].includes(user.role)
  }, [user])

  const value = useMemo<AdminContextValue>(() => ({ 
    user, 
    session,
    loading, 
    signIn, 
    signOut, 
    refreshSession,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    isAdmin
  }), [user, session, loading, refreshSession, checkPermission, checkAnyPermission, checkAllPermissions, isAdmin])
  
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

// Hook for checking permissions
export function useAdminPermission(permission: AdminPermission) {
  const { hasPermission } = useAdmin()
  return hasPermission(permission)
}

// Hook for checking multiple permissions
export function useAdminPermissions(permissions: AdminPermission[], requireAll = false) {
  const { hasAnyPermission, hasAllPermissions } = useAdmin()
  return requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions)
}

// Hook for checking if user is admin
export function useIsAdmin() {
  const { isAdmin } = useAdmin()
  return isAdmin
}
