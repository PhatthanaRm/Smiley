import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

// Singleton instances to prevent multiple client creation
let supabaseClient: any = null
let supabaseComponentClient: any = null

// Client-side Supabase client
export const createSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}

// Client-side Supabase client for components
export const createSupabaseClientComponent = () => {
  if (!supabaseComponentClient) {
    supabaseComponentClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
          flowType: 'pkce'
        },
        cookies: {
          get: (name: string) => {
            if (typeof window === 'undefined') return undefined
            const value = document.cookie
              .split('; ')
              .find(row => row.startsWith(`${name}=`))
              ?.split('=')[1]
            return value
          },
          set: (name: string, value: string) => {
            if (typeof window === 'undefined') return
            document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`
          },
          remove: (name: string) => {
            if (typeof window === 'undefined') return
            document.cookie = `${name}=; path=/; max-age=0`
          }
        }
      }
    )
  }
  return supabaseComponentClient
}

