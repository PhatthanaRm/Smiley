'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-smiley-mango/5 via-smiley-strawberry/5 to-smiley-yuzu/5">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-smiley-mango to-smiley-strawberry rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;re sorry, but something unexpected happened. Don&apos;t worry, our team has been notified and we&apos;re working to fix it.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={reset}
            variant="smiley"
            size="lg"
            className="w-full group"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform" />
            Try Again
          </Button>
          
          <Link href="/">
            <Button
              variant="smileyOutline"
              size="lg"
              className="w-full group"
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
