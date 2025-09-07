'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClientComponent } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ConfirmEmailPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [resending, setResending] = useState(false)
  const [status, setStatus] = useState<string>('')
  const [emailInput, setEmailInput] = useState<string>('')

  useEffect(() => {
    const getUser = async () => {
      const supabase = createSupabaseClientComponent()
      
      // First, try to get the current session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        setLoading(false)
        return
      }
      
      // If no session, try to get user from auth state
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
      } else {
        // If still no user, check URL params (for direct links)
        const urlParams = new URLSearchParams(window.location.search)
        const emailFromUrl = urlParams.get('email')
        
        if (emailFromUrl) {
          setUser({ email: emailFromUrl })
        } else {
          // Last resort: check localStorage for pending email
          const storedEmail = localStorage.getItem('pendingEmail')
          if (storedEmail) {
            setUser({ email: storedEmail })
          }
        }
      }
      
      setLoading(false)
    }

    getUser()
  }, [])

  const resendConfirmation = async () => {
    const emailToUse = user?.email || emailInput
    
    if (!emailToUse) {
      setStatus('Please enter your email address')
      return
    }

    setStatus('Sending OTP...')
    setResending(true)
    
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToUse }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus(`Error: ${data.error}`)
        throw new Error(data.error || 'Failed to send OTP')
      }

      setStatus('✅ OTP sent! Please check your inbox.')
      
      // Redirect to OTP verification page
      setTimeout(() => {
        window.location.href = `/auth/verify-otp?email=${encodeURIComponent(emailToUse)}`
      }, 2000)
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    }
    
    setResending(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Verify Your Email
        </h1>
        {user?.email ? (
          <p className="text-gray-600 mb-6">
            We need to verify your email address <strong>{user.email}</strong>. 
            Click the button below to receive a verification code.
          </p>
        ) : (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Enter your email address to receive a verification code.
            </p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <Button 
            onClick={resendConfirmation}
            disabled={resending}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            {resending ? 'Sending...' : 'Send Verification Code'}
          </Button>
          
          {status && (
            <div className={`p-3 rounded-md text-sm ${
              status.includes('✅') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : status.includes('❌') 
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
              {status}
            </div>
          )}
          
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Didn't receive the code? Check your spam folder or try resending.
        </p>
      </Card>
    </div>
  )
}
