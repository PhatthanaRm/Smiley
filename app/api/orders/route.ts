import { NextRequest, NextResponse } from 'next/server'
import { getOrders, createOrder } from '@/lib/database'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { orders, error } = await getOrders(user.id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      stripePaymentIntentId, 
      totalAmount, 
      shippingAddress, 
      billingAddress,
      items 
    } = await request.json()

    if (!totalAmount || !shippingAddress || !billingAddress || !items) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      )
    }

    const orderData = {
      user_id: user.id,
      stripe_payment_intent_id: stripePaymentIntentId,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      status: 'pending' as const,
    }

    const { order, error } = await createOrder(orderData)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
