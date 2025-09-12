import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Use Supabase Auth to send OTP
    const supabase = createSupabaseAdminClient()
    
    // Send OTP using Supabase Auth
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email: email,
      password: 'temp_password_123', // Temporary password for OTP generation
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      }
    })

    if (error) {
      console.error('Error sending OTP:', error)
      return NextResponse.json(
        { error: 'Failed to send OTP' },
        { status: 500 }
      )
    }

    console.log(`OTP sent to ${email} via Supabase Auth`)

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}