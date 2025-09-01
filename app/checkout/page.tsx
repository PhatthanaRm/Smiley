"use client"

import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { items, subtotal } = useCart()

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Checkout</h1>
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <Button onClick={handleCheckout} variant="smiley" className="w-full">Pay with Stripe</Button>
        </div>
      </div>
    </main>
  )
}


