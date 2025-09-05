"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear, subtotal } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax - discount

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'smiley10') {
      setDiscount(subtotal * 0.1)
      toast({
        title: "Promo code applied! 🎉",
        description: "You saved 10% on your order!",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again.",
        variant: "destructive"
      })
    }
  }

  const handleClearCart = () => {
    clear()
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/shop">
            <Button variant="smileyOutline" size="sm" className="mb-4 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Your <span className="text-rainbow">Cart</span>
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any products to your cart yet. Let&apos;s find something you&apos;ll love!
            </p>
            <Link href="/shop">
              <Button variant="smiley" size="lg" className="group">
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-smiley-mango/20 to-smiley-strawberry/20 rounded-xl flex items-center justify-center text-3xl">
                          {item.image ?? '🦷'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.flavor} • {item.size || 'Standard'}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-smiley-mango"
                      />
                      <Button
                        onClick={handlePromoCode}
                        variant="smileyOutline"
                        size="sm"
                        className="px-4"
                      >
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button variant="smiley" size="lg" className="w-full mb-4">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Clear Cart */}
                  <button
                    onClick={handleClearCart}
                    className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl mb-1">🚚</div>
                        <p className="text-xs text-gray-600">Free shipping over $50</p>
                      </div>
                      <div>
                        <div className="text-2xl mb-1">🔒</div>
                        <p className="text-xs text-gray-600">Secure checkout</p>
                      </div>
                      <div>
                        <div className="text-2xl mb-1">↩️</div>
                        <p className="text-xs text-gray-600">30-day returns</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </main>
  )
}


