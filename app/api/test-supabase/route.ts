import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase-client'

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Supabase not configured. Please check your environment variables.',
        details: {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          urlValid: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co'),
        }
      })
    }

    // Test basic connectivity
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Supabase connection failed',
        error: error.message,
        details: {
          code: error.code,
          hint: error.hint,
        }
      })
    }

    // Test authentication
    const { data: { user } } = await supabase.auth.getUser()

    return NextResponse.json({
      success: true,
      message: 'Supabase is properly configured and connected!',
      details: {
        connected: true,
        authenticated: !!user,
        userId: user?.id || null,
        userEmail: user?.email || null,
        timestamp: new Date().toISOString(),
      }
    })
  } catch (error) {
    console.error('Supabase test error:', error)
    return NextResponse.json({
      success: false,
      message: 'Unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
