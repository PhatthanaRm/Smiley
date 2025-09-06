import { createSupabaseClient, createSupabaseServerClient, createSupabaseAdminClient } from './supabase'
import { User, Profile } from './types'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export interface AuthError {
  message: string
  status?: number
}

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
  try {
    const supabase = createSupabaseClient()
    
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
      return { 
        user: null, 
        error: { message: error.message, status: error.status || 400 } 
      }
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

      return { 
        user: {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at
        }, 
        error: null 
      }
    }

    return { user: null, error: null }
  } catch (error) {
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred', status: 500 } 
    }
  }
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const supabase = createSupabaseClient()
    
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

    if (data.user) {
      return { 
        user: {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at
        }, 
        error: null 
      }
    }

    return { user: null, error: null }
  } catch (error) {
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred', status: 500 } 
    }
  }
}

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: { message: error.message, status: error.status || 500 } }
    }

    return { error: null }
  } catch (error) {
    return { 
      error: { message: 'An unexpected error occurred', status: 500 } 
    }
  }
}

export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    })

    if (error) {
      return { 
        error: { message: error.message, status: error.status || 400 } 
      }
    }

    return { error: null }
  } catch (error) {
    return { 
      error: { message: 'An unexpected error occurred', status: 500 } 
    }
  }
}

export const updatePassword = async (password: string): Promise<{ error: AuthError | null }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      return { 
        error: { message: error.message, status: error.status || 400 } 
      }
    }

    return { error: null }
  } catch (error) {
    return { 
      error: { message: 'An unexpected error occurred', status: 500 } 
    }
  }
}

// Profile management functions
export const createProfile = async (userId: string, email: string, fullName?: string): Promise<ProfileResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email,
        full_name: fullName
      })
      .select()
      .single()

    if (error) {
      return { 
        profile: null, 
        error: { message: error.message } 
      }
    }

    return { 
      profile: {
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
      }, 
      error: null 
    }
  } catch (error) {
    return { 
      profile: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return { 
        profile: null, 
        error: { message: error.message } 
      }
    }

    if (!data) {
      return { 
        profile: null, 
        error: { message: 'Profile not found' } 
      }
    }

    return { 
      profile: {
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
      }, 
      error: null 
    }
  } catch (error) {
    return { 
      profile: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<ProfileResponse> => {
  try {
    const supabase = createSupabaseClient()
    
    const updateData: any = {}
    if (updates.full_name !== undefined) updateData.full_name = updates.full_name
    if (updates.avatar_url !== undefined) updateData.avatar_url = updates.avatar_url
    if (updates.phone !== undefined) updateData.phone = updates.phone
    if (updates.address !== undefined) updateData.address = updates.address
    if (updates.city !== undefined) updateData.city = updates.city
    if (updates.state !== undefined) updateData.state = updates.state
    if (updates.zip_code !== undefined) updateData.zip_code = updates.zip_code
    if (updates.country !== undefined) updateData.country = updates.country

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      return { 
        profile: null, 
        error: { message: error.message } 
      }
    }

    return { 
      profile: {
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
      }, 
      error: null 
    }
  } catch (error) {
    return { 
      profile: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}

export const deleteProfile = async (userId: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)

    if (error) {
      return { error: { message: error.message } }
    }

    return { error: null }
  } catch (error) {
    return { error: { message: 'An unexpected error occurred' } }
  }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const supabase = createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      created_at: user.created_at,
      updated_at: user.updated_at || user.created_at
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const supabase = createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

// Get current user's profile
export const getCurrentUserProfile = async (): Promise<ProfileResponse> => {
  try {
    const supabase = createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { profile: null, error: { message: 'User not authenticated' } }
    }

    return await getProfile(user.id)
  } catch (error) {
    return { 
      profile: null, 
      error: { message: 'An unexpected error occurred' } 
    }
  }
}