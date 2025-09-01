import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 })
  }
  // Mock integration. Here you could call Mailchimp/Sendgrid
  await new Promise(r => setTimeout(r, 500))
  return NextResponse.json({ ok: true })
}


