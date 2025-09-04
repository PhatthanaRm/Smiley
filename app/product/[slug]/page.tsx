"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Heart, Shield, Truck, RotateCcw, CheckCircle, Minus, Plus } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
import type { Product } from '@/lib/types'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const product = PRODUCTS.find(p => p.slug === params.slug)
  
  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart! 🛒",
      description: `${quantity}x ${product.name} added to your cart`,
    })
  }

  const handleSubscribe = () => {
    setIsSubscribing(!isSubscribing)
    toast({
      title: isSubscribing ? "Subscription cancelled" : "Subscription started! 📦",
      description: isSubscribing 
        ? "You'll receive one-time orders" 
        : `You'll receive ${product.name} every month for $${product.subscription?.price}`,
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative">
              <div className={`w-full h-96 bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} rounded-2xl flex items-center justify-center text-8xl shadow-2xl`}>
                {product.imageEmoji}
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.badges?.map((badge, index) => (
                  <span
                    key={badge}
                    className="bg-smiely-yuzu text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} rounded-lg flex items-center justify-center text-2xl transition-all duration-200 ${
                    selectedImage === index ? 'ring-2 ring-smiely-mango scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {product.imageEmoji}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-smiely-yuzu text-smiely-yuzu'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ${isSubscribing && product.subscription ? product.subscription.price : product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {isSubscribing && product.subscription && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  Save ${(product.price - product.subscription.price).toFixed(2)}/month
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  variant="smiley"
                  size="lg"
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                {product.subscription && (
                  <Button
                    onClick={handleSubscribe}
                    variant={isSubscribing ? "smileyOutline" : "smileyAccent"}
                    size="lg"
                  >
                    {isSubscribing ? 'Cancel Subscription' : 'Subscribe & Save'}
                  </Button>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-smiely-mint mx-auto mb-2" />
                <p className="text-sm text-gray-600">Dentist Approved</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-smiely-blueberry mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-smiely-strawberry mx-auto mb-2" />
                <p className="text-sm text-gray-600">30-Day Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            {product.ingredients && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600">
                        • {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Product Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age Group:</span>
                    <span className="font-medium">{product.ageGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flavor:</span>
                    <span className="font-medium">{product.flavor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{product.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
      </div>
      <Footer />
    </main>
  )
}