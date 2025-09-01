"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Mock product data
const products = [
  {
    id: 1,
    name: 'Mango Tango Toothpaste',
    flavor: 'Mango',
    type: 'Toothpaste',
    price: 8.99,
    rating: 4.8,
    reviews: 127,
    image: '🥭',
    color: 'from-smiely-mango to-orange-400',
    description: 'Tropical mango flavor with natural whitening',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Strawberry Fields',
    flavor: 'Strawberry',
    type: 'Toothpaste',
    price: 8.99,
    rating: 4.9,
    reviews: 89,
    image: '🍓',
    color: 'from-smiely-strawberry to-pink-400',
    description: 'Sweet strawberry with cavity protection',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Yuzu Fresh',
    flavor: 'Yuzu',
    type: 'Toothpaste',
    price: 8.99,
    rating: 4.7,
    reviews: 64,
    image: '🍋',
    color: 'from-smiely-yuzu to-yellow-400',
    description: 'Citrus yuzu for fresh breath',
    badge: 'Limited'
  },
  {
    id: 4,
    name: 'Blueberry Mint',
    flavor: 'Blueberry',
    type: 'Toothpaste',
    price: 8.99,
    rating: 4.6,
    reviews: 42,
    image: '🫐',
    color: 'from-smiely-blueberry to-blue-400',
    description: 'Cool mint with blueberry essence',
    badge: 'Popular'
  },
  {
    id: 5,
    name: 'Lavender Dream',
    flavor: 'Lavender',
    type: 'Toothpaste',
    price: 9.99,
    rating: 4.5,
    reviews: 38,
    image: '💜',
    color: 'from-smiely-lavender to-purple-400',
    description: 'Calming lavender for bedtime',
    badge: 'Premium'
  },
  {
    id: 6,
    name: 'Mint Fresh',
    flavor: 'Mint',
    type: 'Toothpaste',
    price: 7.99,
    rating: 4.4,
    reviews: 156,
    image: '🌿',
    color: 'from-smiely-mint to-green-400',
    description: 'Classic mint for everyday freshness',
    badge: 'Classic'
  }
]

const filters = [
  { name: 'All', value: 'all' },
  { name: 'Mango', value: 'mango' },
  { name: 'Strawberry', value: 'strawberry' },
  { name: 'Yuzu', value: 'yuzu' },
  { name: 'Blueberry', value: 'blueberry' },
  { name: 'Lavender', value: 'lavender' },
  { name: 'Mint', value: 'mint' },
]

const FeaturedProducts = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [wishlist, setWishlist] = useState<number[]>([])
  const { toast } = useToast()

  const filteredProducts = selectedFilter === 'all' 
    ? products 
    : products.filter(product => product.flavor.toLowerCase() === selectedFilter)

  const handleAddToCart = (product: typeof products[0]) => {
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-smiely-mango to-smiely-strawberry bg-clip-text text-transparent">Flavorful</span> Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of dentist-approved oral care products with delightful fruit-inspired flavors
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedFilter === filter.value
                  ? 'bg-gradient-to-r from-smiely-mango to-smiely-strawberry text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                {/* Product Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-smiely-yuzu text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.badge}
                    </span>
                  </div>
                )}

                <CardHeader className="pb-4">
                  {/* Product Image */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-full h-48 bg-gradient-to-br ${product.color} rounded-lg flex items-center justify-center text-6xl shadow-lg`}
                    >
                      {product.image}
                    </motion.div>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          wishlist.includes(product.id) 
                            ? 'fill-smiely-strawberry text-smiely-strawberry' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Product Info */}
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
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

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="smiley"
                      size="sm"
                      className="group"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="smileyOutline" size="xl">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts








