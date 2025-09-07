'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      // Clear the pending email from localStorage since user has confirmed
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pendingEmail')
      }

      // Check if there's an error in the URL
      const error = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')

      if (error) {
        console.error('Auth callback error:', error, errorDescription)
        router.push('/auth/auth-code-error')
        return
      }

      // If no error, redirect to home page
      router.push('/')
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Verifying your email...
        </h2>
        <p className="text-gray-600">
          Please wait while we confirm your email address.
        </p>
      </div>
    </div>
  )
}
