"use client"

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { getCurrentUser, getCurrentUserProfile, signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from '@/lib/auth'
import { User, Profile } from '@/lib/types'

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

  useEffect(() => {
    let mounted = true
    
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (mounted) {
          setUser(currentUser)
          if (currentUser) {
            const { profile: userProfile } = await getCurrentUserProfile()
            setProfile(userProfile)
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

    return () => {
      mounted = false
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { user: authUser, error } = await authSignIn(email, password)
      if (error) {
        return { error: error.message }
      }
      
      setUser(authUser)
      if (authUser) {
        const { profile: userProfile } = await getCurrentUserProfile()
        setProfile(userProfile)
      }
      
      return { error: undefined }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: 'An error occurred during sign in' }
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { user: authUser, error } = await authSignUp(email, password, fullName)
      if (error) {
        return { error: error.message }
      }
      
      setUser(authUser)
      if (authUser) {
        const { profile: userProfile } = await getCurrentUserProfile()
        setProfile(userProfile)
      }
      
      return { error: undefined }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: 'An error occurred during sign up' }
    }
  }

  const signOut = async () => {
    try {
      await authSignOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const refreshProfile = useCallback(async () => {
    if (user) {
      try {
        const { profile: userProfile } = await getCurrentUserProfile()
        setProfile(userProfile)
      } catch (error) {
        console.error('Profile refresh error:', error)
      }
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