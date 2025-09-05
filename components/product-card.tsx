"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'
import ReviewStars from './review-stars'
import type { Product } from '@/lib/types'
import { useCart } from '@/components/cart-provider'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { fetchWishlist, toggleWishlist } from '@/lib/wishlist'
import { useToast } from '@/hooks/use-toast'

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [wish, setWish] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (user) {
        const ids = await fetchWishlist(user.id)
        setWish(ids.includes(product.id))
      } else {
        setWish(false)
      }
    })()
  }, [user, product.id])

  const handleAddToCart = async () => {
    setIsAdding(true)
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      quantity: 1, 
      image: product.imageEmoji, 
      flavor: product.flavor 
    })
    
    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    })
    
    // Reset button state after animation
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      viewport={{ once: true }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden relative">
        {product.badges?.[0] && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.badges[0]}
            </span>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`w-full h-48 bg-gradient-to-br ${product.gradientFrom ?? 'from-gray-200'} ${product.gradientTo ?? 'to-gray-300'} rounded-lg flex items-center justify-center text-6xl shadow-lg`}
            >
              {product.imageEmoji ?? '🦷'}
            </motion.div>

            <button
              onClick={async () => {
                if (!user) return alert('Please sign in to manage wishlist')
                const res = await toggleWishlist(product.id, user.id)
                setWish(res.wished)
              }}
              aria-label="Toggle wishlist"
              className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
            >
              <Heart className={`w-5 h-5 ${wish ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} />
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Link href={`/product/${product.slug}`}>
              <CardTitle className="text-lg font-semibold text-gray-900 mb-1 hover:underline">
                {product.name}
              </CardTitle>
            </Link>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            <ReviewStars rating={product.rating} />
            <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            <Button
              onClick={handleAddToCart}
              variant="smiley"
              size="sm"
              className="group relative overflow-hidden"
              disabled={isAdding}
            >
              <motion.div
                className="flex items-center"
                animate={isAdding ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className={`w-4 h-4 mr-2 group-hover:scale-110 transition-transform ${isAdding ? 'animate-pulse' : ''}`} />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </motion.div>
              
              {isAdding && (
                <motion.div
                  className="absolute inset-0 bg-green-400/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


