'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createSupabaseClientComponent } from '@/lib/supabase-client'
import { User, Profile } from '@/lib/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: string; message?: string }>
  signOut: () => Promise<void>
  loadUserProfile: (userId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createSupabaseClientComponent()

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(transformSupabaseUser(session.user))
        await loadUserProfile(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(transformSupabaseUser(session.user))
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const transformSupabaseUser = (supabaseUser: any): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      created_at: supabaseUser.created_at,
      updated_at: supabaseUser.updated_at || supabaseUser.created_at,
      email_confirmed_at: supabaseUser.email_confirmed_at
    }
  }

  const loadUserProfile = async (userId: string) => {
    try {
      const supabase = createSupabaseClientComponent()
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error loading profile:', error)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = createSupabaseClientComponent()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // Handle specific error types
        if (error.message.includes('Failed to fetch') || error.message.includes('ENOTFOUND')) {
          return { 
            error: 'Unable to connect to authentication service. Please check your internet connection and try again.' 
          }
        }
        
        return { error: error.message }
      }

      // Check if email is verified
      if (data.user && !data.user.email_confirmed_at) {
        // Sign out the user immediately
        await supabase.auth.signOut()
        return { error: 'Please verify your email before signing in. Check your inbox for a confirmation link.' }
      }

      if (data.user) {
        setUser(transformSupabaseUser(data.user))
        await loadUserProfile(data.user.id)
      }

      return { error: undefined }
    } catch (error) {
      console.error('Sign in error:', error)
      
      // Handle network/connection errors
      if (error instanceof Error && (error.message.includes('Failed to fetch') || error.message.includes('ENOTFOUND'))) {
        return { 
          error: 'Unable to connect to authentication service. Please check your internet connection and try again.' 
        }
      }
      
      return { error: 'An error occurred during sign in' }
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const supabase = createSupabaseClientComponent()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
          // Remove emailRedirectTo since we're using OTP now
        }
      })

      if (error) {
        console.error('Supabase signup error:', error)
        
        // Handle specific error types
        if (error.message.includes('Failed to fetch') || error.message.includes('ENOTFOUND')) {
          return { 
            error: 'Unable to connect to authentication service. Please check your internet connection and try again.' 
          }
        }
        
        return { error: error.message }
      }

      if (data.user) {
        // Send OTP after successful signup
        try {
          const otpResponse = await fetch('/api/send-otp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, userId: data.user.id }),
          })

          const otpData = await otpResponse.json()

          if (!otpResponse.ok) {
            console.error('Failed to send OTP:', otpData.error)
            return { 
              error: 'Account created but failed to send verification code. Please try again.' 
            }
          }

          // Store email, userId, and password in localStorage for auto sign in after verification
          if (typeof window !== 'undefined') {
            localStorage.setItem('pendingEmail', email)
            localStorage.setItem('pendingUserId', data.user.id)
            localStorage.setItem('pendingPassword', password)
          }
          
          return { 
            error: undefined, 
            message: 'Account created! Please check your email for the verification code.' 
          }
        } catch (otpError) {
          console.error('Error sending OTP:', otpError)
          return { 
            error: 'Account created but failed to send verification code. Please try again.' 
          }
        }
      }

      return { error: undefined }
    } catch (error) {
      console.error('Sign up error:', error)
      
      // Handle network/connection errors
      if (error instanceof Error && (error.message.includes('Failed to fetch') || error.message.includes('ENOTFOUND'))) {
        return { 
          error: 'Unable to connect to authentication service. Please check your internet connection and try again.' 
        }
      }
      
      return { error: 'An error occurred during sign up' }
    }
  }

  const signOut = async () => {
    try {
      // Clear local state immediately for instant UI response
      setUser(null)

      const supabase = createSupabaseClientComponent()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    loadUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}