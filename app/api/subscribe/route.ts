import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { email, priceId } = await req.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    // Find or create customer
    const customers = await stripe.customers.list({ email, limit: 1 })
    const customer = customers.data[0] || (await stripe.customers.create({ email }))

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer.id,
      line_items: [
        {
          price: priceId || process.env.STRIPE_SUB_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?sub=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/product`,
    })

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}


