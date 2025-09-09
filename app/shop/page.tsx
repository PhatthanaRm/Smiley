"use client"

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product-card'
import { PRODUCTS } from '@/lib/data'
import type { Product } from '@/lib/types'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Search, Filter, Star, Sparkles, Heart, ShoppingBag } from 'lucide-react'

const flavors = Array.from(new Set(PRODUCTS.map(p => p.flavor)))
const types = Array.from(new Set(PRODUCTS.map(p => p.type)))

// Category data with fruit-inspired icons
const categories = [
  { name: 'All', icon: '🌟', color: 'from-yellow-400 to-orange-500' },
  { name: 'Toothpaste', icon: '🦷', color: 'from-blue-400 to-cyan-500' },
  { name: 'Toothbrush', icon: '🪥', color: 'from-pink-400 to-rose-500' },
  { name: 'Mouthwash', icon: '💧', color: 'from-green-400 to-emerald-500' },
  { name: 'Bundle', icon: '🎁', color: 'from-purple-400 to-violet-500' }
]

// Featured products (best sellers and new items)
const featuredProducts = PRODUCTS.filter(p => p.badges?.includes('Best Seller') || p.badges?.includes('New'))

// Testimonials data
const testimonials = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'My kids actually ask to brush their teeth now! The mango flavor is amazing.',
    avatar: '👩‍👧'
  },
  {
    name: 'Mike R.',
    rating: 5,
    text: 'Finally found a toothpaste that doesn\'t taste like medicine. Love the yuzu!',
    avatar: '👨‍💼'
  },
  {
    name: 'Emma L.',
    rating: 5,
    text: 'The family bundle saved us so much money. Great quality products!',
    avatar: '👩‍👦‍👦'
  }
]

export default function ShopPage() {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [query, setQuery] = useState('')

  const filtered: Product[] = useMemo(() => {
    return PRODUCTS.filter(p => {
      const inFlavor = selectedFlavor === 'All' || p.flavor === selectedFlavor
      const inType = selectedType === 'All' || p.type === selectedType
      const inCategory = selectedCategory === 'All' || p.type === selectedCategory
      const inQuery = !query || p.name.toLowerCase().includes(query.toLowerCase())
      return inFlavor && inType && inCategory && inQuery
    })
  }, [selectedFlavor, selectedType, selectedCategory, query])

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 text-6xl opacity-20"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🥭
          </motion.div>
          <motion.div
            className="absolute top-20 right-10 text-5xl opacity-20"
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🍓
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10 text-4xl opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🍋
          </motion.div>
          <motion.div
            className="absolute top-1/3 left-1/4 text-5xl opacity-15"
            animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🍇
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 text-4xl opacity-15"
            animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            🍊
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-1/4 text-3xl opacity-15"
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          >
            🍑
          </motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <h1 className="text-6xl md:text-7xl font-bold text-rainbow mb-6">
               Shop SMILEY
             </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover our playful collection of dentist-approved oral care products that make brushing fun for the whole family! 🌟
            </p>
            <motion.div
              className="flex items-center justify-center space-x-4 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-pink-500 mr-1" />
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 text-purple-500 mr-1" />
                <span>Natural Ingredients</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
         {/* Floating Fruits Throughout Page */}
         <div className="absolute inset-0 pointer-events-none">
           <motion.div
             className="absolute top-10 right-10 text-3xl opacity-10"
             animate={{ rotate: [0, 25, -25, 0], y: [0, -15, 0] }}
             transition={{ duration: 7, repeat: Infinity }}
           >
             🍎
           </motion.div>
           <motion.div
             className="absolute top-1/4 left-20 text-4xl opacity-10"
             animate={{ x: [0, 15, 0], scale: [1, 1.2, 1] }}
             transition={{ duration: 6.5, repeat: Infinity }}
           >
             🍌
           </motion.div>
           <motion.div
             className="absolute top-1/3 right-1/3 text-2xl opacity-10"
             animate={{ rotate: [0, -30, 30, 0], y: [0, 20, 0] }}
             transition={{ duration: 8, repeat: Infinity }}
           >
             🥝
           </motion.div>
           <motion.div
             className="absolute top-1/2 left-1/4 text-3xl opacity-10"
             animate={{ x: [0, -20, 0], rotate: [0, 20, -20, 0] }}
             transition={{ duration: 5.5, repeat: Infinity }}
           >
             🍒
           </motion.div>
           <motion.div
             className="absolute top-2/3 right-20 text-2xl opacity-10"
             animate={{ y: [0, -25, 0], scale: [1, 0.8, 1] }}
             transition={{ duration: 7.5, repeat: Infinity }}
           >
             🍍
           </motion.div>
           <motion.div
             className="absolute top-3/4 left-1/2 text-3xl opacity-10"
             animate={{ rotate: [0, 35, -35, 0], x: [0, 25, 0] }}
             transition={{ duration: 9, repeat: Infinity }}
           >
             🥥
           </motion.div>
           <motion.div
             className="absolute bottom-1/4 right-1/4 text-2xl opacity-10"
             animate={{ y: [0, -20, 0], rotate: [0, -25, 25, 0] }}
             transition={{ duration: 6, repeat: Infinity }}
           >
             🍑
           </motion.div>
           <motion.div
             className="absolute bottom-10 left-10 text-3xl opacity-10"
             animate={{ x: [0, 20, 0], scale: [1, 1.1, 1] }}
             transition={{ duration: 8.5, repeat: Infinity }}
           >
             🍊
           </motion.div>
         </div>
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
           <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>


        {/* Featured Products Section */}
        {selectedCategory === 'All' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
           <div className="text-center mb-8">
             <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
             <p className="text-gray-700">Our most loved and newest additions</p>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Products Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold text-gray-800">
               {selectedCategory === 'All' ? 'All Products' : `${selectedCategory}s`}
             </h2>
             <div className="flex items-center text-sm text-gray-700">
               <ShoppingBag className="w-4 h-4 mr-2" />
               <span>{filtered.length} products found</span>
             </div>
           </div>
          
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setQuery('')
                  setSelectedFlavor('All')
                  setSelectedType('All')
                  setSelectedCategory('All')
                }}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-orange-100 via-pink-100 to-yellow-100 rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
            <p className="text-gray-600">Join thousands of happy families</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </main>
  )
}


