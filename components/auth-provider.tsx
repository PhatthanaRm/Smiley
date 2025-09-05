"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-client'

type AuthContextValue = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (mounted) {
        setUser(data.session?.user ?? null)
        setLoading(false)
      }
    })()
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // For development: mock authentication when Supabase is not configured
    if (!supabase) {
      // Simple mock authentication for development
      if (email === 'demo@smiley.com' && password === 'demo123') {
        // Create a mock user object
        const mockUser = {
          id: 'demo-1',
          email: email,
        } as any
        
        setUser(mockUser)
        return { error: undefined }
      } else {
        return { error: 'Invalid credentials' }
      }
    }
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message }
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' }
    const { error } = await supabase.auth.signUp({ email, password })
    return { error: error?.message }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const value = useMemo<AuthContextValue>(() => ({ user, loading, signIn, signUp, signOut }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


