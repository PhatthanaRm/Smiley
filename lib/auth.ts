// Mock authentication system (Supabase removed)
// This will be replaced with a real authentication system later

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
  created_at: string
  updated_at: string
}

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

// Mock user storage (in production, this would be in a database)
let mockUsers: User[] = []
let mockProfiles: Profile[] = []
let currentUser: User | null = null

// Authentication functions
export const signUp = async (email: string, password: string, fullName?: string): Promise<AuthResponse> => {
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email)
  if (existingUser) {
    return { 
      user: null, 
      error: { message: 'User already exists', status: 400 } 
    }
  }

  // Create new user
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  currentUser = newUser

  // Create profile
  await createProfile(newUser.id, email, fullName)

  return { user: newUser, error: null }
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const user = mockUsers.find(u => u.email === email)
  if (!user) {
    return { 
      user: null, 
      error: { message: 'Invalid credentials', status: 401 } 
    }
  }

  currentUser = user
  return { user, error: null }
}

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  currentUser = null
  return { error: null }
}

export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  const user = mockUsers.find(u => u.email === email)
  if (!user) {
    return { 
      error: { message: 'User not found', status: 404 } 
    }
  }

  // In a real app, you would send an email here
  console.log(`Password reset email would be sent to ${email}`)
  return { error: null }
}

export const updatePassword = async (password: string): Promise<{ error: AuthError | null }> => {
  if (!currentUser) {
    return { 
      error: { message: 'User not authenticated', status: 401 } 
    }
  }

  // In a real app, you would update the password in the database
  console.log(`Password updated for user ${currentUser.email}`)
  return { error: null }
}

// Profile management functions
export const createProfile = async (userId: string, email: string, fullName?: string): Promise<ProfileResponse> => {
  const newProfile: Profile = {
    id: userId,
    email,
    full_name: fullName || undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockProfiles.push(newProfile)
  return { profile: newProfile, error: null }
}

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
  const profile = mockProfiles.find(p => p.id === userId)
  if (!profile) {
    return { 
      profile: null, 
      error: { message: 'Profile not found' } 
    }
  }

  return { profile, error: null }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<ProfileResponse> => {
  const profileIndex = mockProfiles.findIndex(p => p.id === userId)
  if (profileIndex === -1) {
    return { 
      profile: null, 
      error: { message: 'Profile not found' } 
    }
  }

  mockProfiles[profileIndex] = {
    ...mockProfiles[profileIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  return { profile: mockProfiles[profileIndex], error: null }
}

export const deleteProfile = async (userId: string): Promise<{ error: any }> => {
  const profileIndex = mockProfiles.findIndex(p => p.id === userId)
  if (profileIndex === -1) {
    return { error: { message: 'Profile not found' } }
  }

  mockProfiles.splice(profileIndex, 1)
  return { error: null }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  return currentUser
}

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  return currentUser !== null
}

// Get current user's profile
export const getCurrentUserProfile = async (): Promise<ProfileResponse> => {
  if (!currentUser) {
    return { profile: null, error: { message: 'User not authenticated' } }
  }

  return await getProfile(currentUser.id)
}