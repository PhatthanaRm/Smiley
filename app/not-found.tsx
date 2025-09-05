import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-smiley-mango/5 via-smiley-strawberry/5 to-smiley-yuzu/5">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-8">
          <div className="text-8xl mb-6">😕</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button
              variant="smiley"
              size="lg"
              className="w-full group"
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/shop">
            <Button
              variant="smileyOutline"
              size="lg"
              className="w-full group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Browse Products
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-smiley-mango hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  )
}
