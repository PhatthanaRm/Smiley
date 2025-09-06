import { createClient } from '@supabase/supabase-js'
import { createBrowserClient, createServerClient } from '@supabase/ssr'

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

// Server-side Supabase client for API routes
export const createSupabaseServerClient = () => {
  // Import cookies only when this function is called (server-side)
  const { cookies } = require('next/headers')
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          return cookies().get(name)?.value
        },
        set: (name: string, value: string, options: any) => {
          cookies().set(name, value, options)
        },
        remove: (name: string, options: any) => {
          cookies().set(name, '', { ...options, maxAge: 0 })
        }
      }
    }
  )
}

// Admin client for server-side operations (with service role key)
export const createSupabaseAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}