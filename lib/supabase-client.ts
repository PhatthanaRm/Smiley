import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if environment variables are available and valid
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return !url.includes('your_') && !url.includes('placeholder')
  } catch {
    return false
  }
}

export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null
}


