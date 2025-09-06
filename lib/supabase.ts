import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Client-side Supabase client
export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Server-side Supabase client for API routes
export const createSupabaseServerClient = () => {
  return createServerComponentClient({ cookies })
}

// Client-side Supabase client for components
export const createSupabaseClientComponent = () => {
  return createClientComponentClient()
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