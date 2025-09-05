import { NextRequest, NextResponse } from 'next/server'
import { resetPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { error } = await resetPassword(email)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      )
    }

    return NextResponse.json({ message: 'Password reset email sent' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
