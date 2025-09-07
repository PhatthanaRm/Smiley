import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  console.log('Auth callback received:', { code: code ? 'present' : 'missing', next, origin })

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the user after successful email confirmation
      const { data: { user } } = await supabase.auth.getUser()
      
      console.log('User after code exchange:', { 
        userId: user?.id, 
        email: user?.email, 
        emailConfirmed: user?.email_confirmed_at 
      })
      
      if (user) {
        // Only create profile if email is confirmed
        if (user.email_confirmed_at) {
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single()

          if (!existingProfile) {
            // Create profile for confirmed user
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata?.full_name
              })

            if (profileError) {
              console.error('Error creating profile:', profileError)
            } else {
              console.log('Profile created successfully for confirmed user:', user.id)
            }
          } else {
            console.log('Profile already exists for user:', user.id)
          }

          console.log('Email confirmed, redirecting to:', next)
          return NextResponse.redirect(`${origin}${next}`)
        } else {
          // If email is not confirmed yet, redirect to confirm-email page
          console.log('Email not confirmed, redirecting to confirm-email page')
          return NextResponse.redirect(`${origin}/auth/confirm-email`)
        }
      }
      
      console.log('No user found after code exchange, redirecting to:', next)
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('Error exchanging code for session:', error)
    }
  } else {
    console.log('No code provided in callback URL')
  }

  // Return the user to an error page with instructions
  console.log('Redirecting to auth-code-error page')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
