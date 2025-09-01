"use client"

import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear, subtotal } = useCart()

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <p className="text-gray-600">Your cart is empty.</p>
            <Link href="/shop" className="inline-block mt-4">
              <Button variant="smiley">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-white rounded-2xl p-4 shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                      {item.image ?? '🦷'}
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border rounded-full" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span className="min-w-[2rem] text-center">{item.quantity}</span>
                    <button className="px-3 py-1 border rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="ml-3 text-sm text-red-500" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow h-fit">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
              <Link href="/checkout">
                <Button className="w-full" variant="smiley">Checkout</Button>
              </Link>
              <button className="w-full text-sm text-gray-500 mt-3" onClick={clear}>Clear Cart</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


