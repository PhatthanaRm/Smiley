import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()
    const line_items = (items ?? []).map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'An error occurred' }, { status: 500 })
  }
}


