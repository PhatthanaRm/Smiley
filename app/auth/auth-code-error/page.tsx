'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-6">
          There was an error confirming your email. The link may have expired or been used already.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => window.location.href = '/auth/confirm-email'}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          If you continue to have issues, please contact support.
        </p>
      </Card>
    </div>
  )
}
