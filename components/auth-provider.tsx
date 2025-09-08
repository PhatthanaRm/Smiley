'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { createSupabaseClientComponent } from '@/lib/supabase-client'
import { User, Profile } from '@/lib/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  signingOut: boolean
  signingIn: boolean
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
  const [signingOut, setSigningOut] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const signingOutRef = useRef(false)
  const signingInRef = useRef(false)
  
  // Set a maximum loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // Maximum 1 second loading
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const supabase = createSupabaseClientComponent()

    // Get initial session with timeout
    const getInitialSession = async () => {
      try {
        // Set a timeout to prevent long loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 2000)
        )
        
        const sessionPromise = supabase.auth.getSession()
        
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any
        
        if (session?.user) {
          setUser(transformSupabaseUser(session.user))
          // Load profile in background, don't wait for it
          loadUserProfile(session.user.id).catch(console.error)
        }
      } catch (error) {
        console.log('Session check timeout or error, continuing...')
      } finally {
        // Always set loading to false quickly
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        // Don't interfere if we're manually signing out
        if (signingOutRef.current) {
          console.log('Auth state change: Ignoring during manual sign out')
          return
        }
        
        if (session?.user) {
          setUser(transformSupabaseUser(session.user))
          // Load profile in background, don't wait for it
          loadUserProfile(session.user.id).catch(console.error)
        } else {
          console.log('Auth state change: No session, setting user to null')
          setUser(null)
        }
        
        // Always set loading to false quickly
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
      setSigningIn(true)
      signingInRef.current = true
      const supabase = createSupabaseClientComponent()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setSigningIn(false)
        signingInRef.current = false
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
        setSigningIn(false)
        signingInRef.current = false
        return { error: 'Please verify your email before signing in. Check your inbox for a confirmation link.' }
      }

      if (data.user) {
        setUser(transformSupabaseUser(data.user))
        // Load profile in background, don't wait for it
        loadUserProfile(data.user.id).catch(console.error)
      }

      setSigningIn(false)
      signingInRef.current = false
      return { error: undefined }
    } catch (error) {
      console.error('Sign in error:', error)
      setSigningIn(false)
      signingInRef.current = false
      
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
      console.log('Auth provider: Starting sign out...')
      setSigningOut(true)
      signingOutRef.current = true
      
      const supabase = createSupabaseClientComponent()
      
      // Clear local state immediately for instant UI response
      setUser(null)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        setSigningOut(false)
        signingOutRef.current = false
        throw error
      }
      
      console.log('Auth provider: Sign out successful')
      setSigningOut(false)
      signingOutRef.current = false
    } catch (error) {
      console.error('Sign out error:', error)
      setSigningOut(false)
      signingOutRef.current = false
      throw error
    }
  }

  const value = {
    user,
    loading,
    signingOut,
    signingIn,
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