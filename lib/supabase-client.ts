import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

// Client-side Supabase client
export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Client-side Supabase client for components
export const createSupabaseClientComponent = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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

