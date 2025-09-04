"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/components/auth-provider'
import { Mail, Lock, User, ShoppingBag, Heart, Settings, LogOut, ArrowRight, CheckCircle, Star, Package, CreditCard, Phone, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+66')
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error)
    } else {
      setSuccess('Welcome back! 🎉')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    
    // Simple sign up without OTP
    const { error } = await signUp(email, password)
    if (error) {
      setError(error)
    } else {
      setSuccess('Account created successfully! Welcome to SMILEY! 🎉')
    }
  }

  return (
    <main className="pt-24 pb-20 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-rainbow">Account</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {!user ? 'Sign in to your account or create a new one to start your SMILEY journey!' : 'Welcome back! Manage your account, orders, and preferences.'}
          </p>
        </motion.div>

        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                {/* Toggle between Sign In and Sign Up */}
                <div className="flex bg-gray-100 rounded-full p-1 mb-8">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      !isSignUp 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      isSignUp 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          required={isSignUp}
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          required={isSignUp}
                        />
                      </div>
                    </motion.div>
                  )}

                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Phone Number */}
                      <div className="flex gap-2">
                        <div className="relative w-24">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full pl-10 pr-2 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                          >
                            <option value="+66">🇹🇭 +66</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+65">🇸🇬 +65</option>
                            <option value="+60">🇲🇾 +60</option>
                            <option value="+63">🇵🇭 +63</option>
                            <option value="+84">🇻🇳 +84</option>
                            <option value="+86">🇨🇳 +86</option>
                            <option value="+81">🇯🇵 +81</option>
                            <option value="+82">🇰🇷 +82</option>
                          </select>
                        </div>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            required={isSignUp}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-full text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-full text-sm flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {success}
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    variant="smiley" 
                    className="w-full py-3 text-lg font-semibold" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {isSignUp ? 'Creating Account...' : 'Signing In...'}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">Why create an account?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Save your favorite products
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Track your orders
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Get exclusive offers
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                      😊
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      variant="smileyOutline"
                      className="w-full justify-start"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                        <p className="text-sm text-gray-600">Track your purchases</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">No orders yet. Start shopping to see your order history here!</p>
                    <Link href="/shop">
                      <Button variant="smileyOutline" size="sm" className="group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
                        Start Shopping
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Wishlist</h3>
                        <p className="text-sm text-gray-600">Your favorite products</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Save products you love for later purchase!</p>
                    <Link href="/shop">
                      <Button variant="smileyOutline" size="sm" className="group-hover:bg-pink-500 group-hover:text-white transition-all duration-200">
                        Browse Products
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Subscriptions */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Subscriptions</h3>
                      <p className="text-sm text-gray-600">Manage your recurring orders</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">No active subscriptions</p>
                        <p className="text-sm text-gray-600">Start a subscription from any product page</p>
                      </div>
                      <div className="text-2xl">📦</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="smiley"
                      size="sm"
                      onClick={async () => {
                        const res = await fetch('/api/portal', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: user.email }),
                        })
                        const data = await res.json()
                        if (data.url) window.location.href = data.url
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Billing
                    </Button>
                    <Link href="/shop">
                      <Button variant="smileyOutline" size="sm">
                        Browse Products
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  )
}


