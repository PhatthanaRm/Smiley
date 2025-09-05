import { NextRequest, NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const { user, error } = await signIn(email, password)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
