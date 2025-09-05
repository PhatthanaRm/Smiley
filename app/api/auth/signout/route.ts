import { NextRequest, NextResponse } from 'next/server'
import { signOut } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { error } = await signOut()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      )
    }

    return NextResponse.json({ message: 'Signed out successfully' })
  } catch (error) {
    console.error('Signout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
