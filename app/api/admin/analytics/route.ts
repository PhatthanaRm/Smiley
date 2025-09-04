import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { ADMIN_PERMISSIONS } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin || !admin.permissions.includes(ADMIN_PERMISSIONS.ANALYTICS_READ)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get basic stats
    const [
      { data: orders, error: ordersError },
      { data: customers, error: customersError },
      { data: products, error: productsError },
      { data: revenue, error: revenueError }
    ] = await Promise.all([
      supabase
        .from('orders')
        .select('id, total, created_at')
        .gte('created_at', startDate.toISOString()),
      
      supabase
        .from('customers')
        .select('id, total_spent, created_at')
        .gte('created_at', startDate.toISOString()),
      
      supabase
        .from('products')
        .select('id, created_at'),
      
      supabase
        .from('orders')
        .select('total')
        .eq('payment_status', 'paid')
        .gte('created_at', startDate.toISOString())
    ])

    if (ordersError || customersError || productsError || revenueError) {
      console.error('Error fetching analytics data:', { ordersError, customersError, productsError, revenueError })
      return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }

    // Calculate metrics
    const totalOrders = orders?.length || 0
    const totalCustomers = customers?.length || 0
    const totalProducts = products?.length || 0
    const totalRevenue = revenue?.reduce((sum, order) => sum + (order.total || 0), 0) || 0

    // Get recent orders
    const { data: recentOrders, error: recentOrdersError } = await supabase
      .from('orders')
      .select(`
        id,
        order_number,
        total,
        status,
        created_at,
        customer:customers!orders_customer_id_fkey(email, first_name, last_name)
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    if (recentOrdersError) {
      console.error('Error fetching recent orders:', recentOrdersError)
    }

    // Get top products (mock data for now)
    const topProducts = []

    const analytics = {
      revenue: {
        total: totalRevenue,
        change: 0, // Would calculate from previous period
        trend: 'up'
      },
      orders: {
        total: totalOrders,
        change: 0,
        trend: 'up'
      },
      customers: {
        total: totalCustomers,
        change: 0,
        trend: 'up'
      },
      products: {
        total: totalProducts,
        change: 0,
        trend: 'up'
      },
      conversionRate: 0, // Would calculate from analytics data
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      topProducts,
      recentOrders: recentOrders || [],
      salesChart: [], // Would generate chart data
      revenueChart: [] // Would generate chart data
    }

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
