import { NextRequest, NextResponse } from 'next/server'
import { updateCartItem, removeFromCart } from '@/lib/database'
import { getCurrentUser } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { quantity } = await request.json()

    if (quantity === undefined) {
      return NextResponse.json(
        { error: 'Quantity is required' },
        { status: 400 }
      )
    }

    const { item, error } = await updateCartItem(params.itemId, quantity)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Update cart item error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { error } = await removeFromCart(params.itemId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Remove from cart error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
