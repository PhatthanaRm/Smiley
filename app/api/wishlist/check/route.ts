import { NextRequest, NextResponse } from 'next/server'
import { isInWishlist } from '@/lib/database'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const { inWishlist, error } = await isInWishlist(user.id, productId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ inWishlist })
  } catch (error) {
    console.error('Check wishlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
