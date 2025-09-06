import { NextRequest, NextResponse } from 'next/server'
import { adminSignOut } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const { error } = await adminSignOut(sessionId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin signout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
