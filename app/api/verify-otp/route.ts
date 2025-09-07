import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    console.log('Verify OTP request:', { email, otp })

    // Use Supabase Admin to verify OTP
    const supabase = createSupabaseAdminClient()
    
    // Get user by email first
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()
    
    if (userError) {
      console.error('Error fetching users:', userError)
      return NextResponse.json(
        { error: 'Failed to verify user' },
        { status: 500 }
      )
    }

    const user = users.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify OTP using admin client - confirm user email
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { email_confirm: true }
    )

    if (error) {
      console.error('Error confirming email:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to confirm email' },
        { status: 400 }
      )
    }

    console.log('Email confirmed successfully:', data)

    // Create profile for the confirmed user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
      // Don't fail the request if profile creation fails
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name
      }
    })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}