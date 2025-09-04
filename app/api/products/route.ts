import { NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/data'

export async function GET() {
  try {
    // Return all products
    return NextResponse.json({
      success: true,
      products: PRODUCTS
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
