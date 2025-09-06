"use client"

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { createSupabaseClientComponent } from '@/lib/supabase'
import { User, Profile } from '@/lib/types'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type AuthContextValue = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClientComponent()

  useEffect(() => {
    let mounted = true
    
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          if (session?.user) {
            setUser(transformSupabaseUser(session.user))
            await loadUserProfile(session.user.id)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        if (session?.user) {
          setUser(transformSupabaseUser(session.user))
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const transformSupabaseUser = (supabaseUser: SupabaseUser): User => ({
    id: supabaseUser.id,
    email: supabaseUser.email!,
    created_at: supabaseUser.created_at,
    updated_at: supabaseUser.updated_at || supabaseUser.created_at
  })

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error loading profile:', error)
        return
      }

      if (data) {
        setProfile({
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          country: data.country,
          created_at: data.created_at,
          updated_at: data.updated_at
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        setUser(transformSupabaseUser(data.user))
        await loadUserProfile(data.user.id)
      }

      return { error: undefined }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: 'An error occurred during sign in' }
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName
          })

        if (profileError) {
          console.error('Error creating profile:', profileError)
        }

        setUser(transformSupabaseUser(data.user))
        await loadUserProfile(data.user.id)
      }

      return { error: undefined }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: 'An error occurred during sign up' }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const refreshProfile = useCallback(async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }, [user])

  const value = useMemo<AuthContextValue>(() => ({ 
    user, 
    profile, 
    loading, 
    signIn, 
    signUp, 
    signOut, 
    refreshProfile 
  }), [user, profile, loading, refreshProfile])
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}