import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Test Stripe configuration
    const stripeConfig = {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ? 'Set' : 'Not set',
      secretKey: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Set' : 'Not set',
      subscriptionPriceId: process.env.STRIPE_SUB_PRICE_ID ? 'Set' : 'Not set',
    }

    return NextResponse.json({
      success: true,
      message: 'Stripe configuration test',
      config: stripeConfig,
      environment: process.env.NODE_ENV,
    })
  } catch (error) {
    console.error('Error testing Stripe:', error)
    return NextResponse.json(
      { error: 'Failed to test Stripe configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testType } = await request.json()

    if (testType === 'webhook') {
      // Test webhook endpoint
      return NextResponse.json({
        success: true,
        message: 'Webhook test endpoint is working',
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Stripe test endpoint is working',
      testType: testType || 'general',
    })
  } catch (error) {
    console.error('Error in Stripe test:', error)
    return NextResponse.json(
      { error: 'Failed to process Stripe test' },
      { status: 500 }
    )
  }
}
