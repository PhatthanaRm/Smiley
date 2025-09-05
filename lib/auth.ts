import { supabase } from './supabase-client'
import { Profile, ProfileInsert, ProfileUpdate } from './types'
import { User, AuthError } from '@supabase/supabase-js'

export interface AuthResponse {
  user: User | null
  error: AuthError | null
}

export interface ProfileResponse {
  profile: Profile | null
  error: any
}

// Authentication functions
export const signUp = async (email: string, password: string, fullName?: string): Promise<AuthResponse> => {
  if (!supabase) {
    return { user: null, error: { message: 'Supabase not configured', status: 500 } as AuthError }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  // Create profile if user was created successfully
  if (data.user && !error) {
    await createProfile(data.user.id, email, fullName)
  }

  return { user: data.user, error }
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  if (!supabase) {
    return { user: null, error: { message: 'Supabase not configured', status: 500 } as AuthError }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { user: data.user, error }
}

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured', status: 500 } as AuthError }
  }

  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured', status: 500 } as AuthError }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/account/reset-password`,
  })

  return { error }
}

export const updatePassword = async (password: string): Promise<{ error: AuthError | null }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured', status: 500 } as AuthError }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  return { error }
}

// Profile management functions
export const createProfile = async (userId: string, email: string, fullName?: string): Promise<ProfileResponse> => {
  if (!supabase) {
    return { profile: null, error: { message: 'Supabase not configured' } }
  }

  const profileData: ProfileInsert = {
    id: userId,
    email,
    full_name: fullName || null,
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single()

  return { profile: data, error }
}

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
  if (!supabase) {
    return { profile: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { profile: data, error }
}

export const updateProfile = async (userId: string, updates: ProfileUpdate): Promise<ProfileResponse> => {
  if (!supabase) {
    return { profile: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  return { profile: data, error }
}

export const deleteProfile = async (userId: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)

  return { error }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  if (!supabase) return null

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return user !== null
}

// Get current user's profile
export const getCurrentUserProfile = async (): Promise<ProfileResponse> => {
  const user = await getCurrentUser()
  if (!user) {
    return { profile: null, error: { message: 'User not authenticated' } }
  }

  return await getProfile(user.id)
}
