import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Mock OTP generation and sending
    // In production, you would integrate with an email service
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    console.log(`OTP for ${email}: ${otp}`)
    
    // In production, send the OTP via email
    // await sendOTPEmail(email, otp)

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // Don't send the actual OTP in production
      ...(process.env.NODE_ENV === 'development' && { otp })
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
