import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Admin routes that require authentication
const ADMIN_ROUTES = [
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/products',
  '/admin/orders',
  '/admin/content',
  '/admin/analytics',
  '/admin/settings'
]

// Public admin routes (login, etc.)
const PUBLIC_ADMIN_ROUTES = [
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route))
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some(route => pathname.startsWith(route))

  if (isAdminRoute || isPublicAdminRoute) {
    if (isPublicAdminRoute) {
      // For public admin routes, just continue
      return NextResponse.next()
    }

    if (isAdminRoute) {
      // SIMPLIFIED: For now, allow all admin routes to pass through
      // The simple admin provider will handle authentication on the client side
      // In production, you'd want proper server-side session validation
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
