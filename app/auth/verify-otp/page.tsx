'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClientComponent } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function VerifyOTPPage() {
  const [email, setEmail] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [status, setStatus] = useState<string>('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // Get email and userId from localStorage or URL params
    const storedEmail = localStorage.getItem('pendingEmail')
    const storedUserId = localStorage.getItem('pendingUserId')
    const urlParams = new URLSearchParams(window.location.search)
    const emailFromUrl = urlParams.get('email')
    const userIdFromUrl = urlParams.get('userId')
    
    if (emailFromUrl) {
      setEmail(emailFromUrl)
    } else if (storedEmail) {
      setEmail(storedEmail)
    }
    
    if (userIdFromUrl) {
      setUserId(userIdFromUrl)
    } else if (storedUserId) {
      setUserId(storedUserId)
    }

    // Start countdown for resend button
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleVerifyOTP = async () => {
    if (!email || !otp) {
      setStatus('Please enter both email and OTP')
      return
    }

    if (otp.length !== 6) {
      setStatus('OTP must be 6 digits')
      return
    }

    setLoading(true)
    setStatus('Verifying OTP...')

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus(`Error: ${data.error}`)
        return
      }

      // OTP verified successfully
      setStatus('✅ Email verified successfully! Signing you in...')
      
      // Get password from localStorage (stored during signup)
      const storedPassword = localStorage.getItem('pendingPassword')
      
      if (storedPassword) {
        // Auto sign in the user with email and password
        const supabase = createSupabaseClientComponent()
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: email,
          password: storedPassword
        })
        
        if (signInError) {
          console.error('Error signing in:', signInError)
          setStatus('✅ Email verified! Please sign in manually.')
        } else {
          setStatus('✅ Welcome to SMILEY! Redirecting...')
        }
        
        // Clear pending data from localStorage
        localStorage.removeItem('pendingEmail')
        localStorage.removeItem('pendingUserId')
        localStorage.removeItem('pendingPassword')
      } else {
        setStatus('✅ Email verified! Please sign in manually.')
      }
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)

    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`)
    }

    setLoading(false)
  }

  const handleResendOTP = async () => {
    if (!email) {
      setStatus('Please enter your email address')
      return
    }

    setResending(true)
    setStatus('Sending OTP...')

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userId }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus(`Error: ${data.error}`)
        return
      }

      setStatus('✅ OTP sent successfully!')
      
      // Start countdown again
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`)
    }

    setResending(false)
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setOtp(value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <Card className="w-full max-w-lg p-6 sm:p-8 text-center">
        <div className="text-5xl sm:text-6xl mb-4">📱</div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          Verify Your Email
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          We've sent a 6-digit code to <strong className="break-all">{email}</strong>. 
          Please enter the code below to verify your account.
        </p>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 text-center text-xl sm:text-2xl font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent tracking-widest transition-all duration-200"
              maxLength={6}
            />
          </div>
          
          <Button 
            onClick={handleVerifyOTP}
            disabled={loading || !email || !otp || otp.length !== 6}
            className="w-full bg-pink-500 hover:bg-pink-600 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-200"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
          
          <Button 
            onClick={handleResendOTP}
            disabled={resending || countdown > 0}
            variant="outline"
            className="w-full py-2 sm:py-3 text-sm sm:text-base transition-all duration-200"
          >
            {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
          </Button>
          
          {status && (
            <div className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm leading-relaxed ${
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
            className="w-full py-2 sm:py-3 text-sm sm:text-base transition-all duration-200"
          >
            Back to Home
          </Button>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 leading-relaxed">
          Didn't receive the code? Check your spam folder or try resending.
        </p>
      </Card>
    </div>
  )
}
