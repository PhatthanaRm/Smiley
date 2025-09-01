"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth-provider'

export default function AccountPage() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await signIn(email, password)
    if (error) setError(error)
  }

  const handleSignUp = async () => {
    setError(null)
    const { error } = await signUp(email, password)
    if (error) setError(error)
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">My Account</h1>
        {!user ? (
          <form onSubmit={handleSignIn} className="bg-white rounded-2xl p-6 shadow space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-200"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-200"
              required
            />
            {error && <div className="text-sm text-red-500">{error}</div>}
            <Button type="submit" variant="smiley" className="w-full" disabled={loading}>Sign In</Button>
            <Button type="button" onClick={handleSignUp} variant="smileyOutline" className="w-full" disabled={loading}>Create Account</Button>
          </form>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            <h2 className="text-xl font-semibold">Welcome, {user.email}</h2>
            <div className="text-gray-600">Manage subscriptions, orders, and wishlist.</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <div className="font-semibold mb-1">Subscriptions</div>
                <div className="text-sm text-gray-600 mb-3">None active. Start one from a product page.</div>
                <div className="flex gap-2">
                  <Button
                    variant="smileyOutline"
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
                    Manage Subscription
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-xl">
                <div className="font-semibold mb-1">Orders</div>
                <div className="text-sm text-gray-600">No orders yet.</div>
              </div>
            </div>
            <Button variant="smiley" onClick={() => signOut()}>Sign Out</Button>
          </div>
        )}
      </div>
    </main>
  )
}


