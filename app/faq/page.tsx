"use client"

import { useMemo, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  { 
    q: 'What makes SMILEY dentist-approved?', 
    a: 'Our formulas are developed with dental experts and use safe, effective ingredients that are clinically tested for oral health benefits. We work closely with dental professionals to ensure our products meet the highest standards.',
    category: 'Product Safety',
    icon: '🦷'
  },
  { 
    q: 'Do you offer subscriptions?', 
    a: 'Yes! Subscribe to your favorite products and save up to 20% with flexible delivery schedules. You can pause, skip, or modify your subscription anytime through your account dashboard.',
    category: 'Subscriptions',
    icon: '🔄'
  },
  { 
    q: 'Are your products suitable for kids?', 
    a: 'Absolutely! Our flavors and formulas are made for the whole family. All our products are safe for children ages 3+ and we have special kid-friendly packaging and flavors.',
    category: 'Family',
    icon: '👶'
  },
  { 
    q: 'Do you ship internationally?', 
    a: 'We ship to most countries worldwide! Shipping rates are calculated at checkout based on your location. Free shipping is available on orders over $50 in the US and $75 internationally.',
    category: 'Shipping',
    icon: '🌍'
  },
  { 
    q: 'What if I\'m not satisfied with my purchase?', 
    a: 'We offer a 30-day money-back guarantee! If you\'re not completely happy with your SMILEY products, return them for a full refund. No questions asked.',
    category: 'Returns',
    icon: '💯'
  },
  { 
    q: 'How long do your products last?', 
    a: 'Our products have a 2-year shelf life when stored properly. Each product includes a "best by" date on the packaging. We recommend storing them in a cool, dry place.',
    category: 'Product Info',
    icon: '⏰'
  },
  { 
    q: 'Are your products vegan and cruelty-free?', 
    a: 'Yes! All SMILEY products are 100% vegan and cruelty-free. We never test on animals and use only plant-based ingredients in our formulations.',
    category: 'Ethics',
    icon: '🌱'
  },
  { 
    q: 'Can I customize my subscription?', 
    a: 'Absolutely! You can customize your subscription frequency, skip deliveries, change flavors, or add/remove products anytime. Your subscription is completely flexible and under your control.',
    category: 'Subscriptions',
    icon: '⚙️'
  }
]

const categories = ['All', 'Product Safety', 'Subscriptions', 'Family', 'Shipping', 'Returns', 'Product Info', 'Ethics']

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const filtered = useMemo(() => {
    let filteredFAQs = FAQS
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filteredFAQs = filteredFAQs.filter(item => item.category === selectedCategory)
    }
    
    // Filter by search query
    if (query) {
      filteredFAQs = filteredFAQs.filter(item => 
        item.q.toLowerCase().includes(query.toLowerCase()) || 
        item.a.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    return filteredFAQs
  }, [query, selectedCategory])

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-fruit-burst opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-rainbow mb-6">
              FAQ & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers! Find everything you need to know about SMILEY products and services.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-smiley-mango/20 focus:border-smiley-mango transition-all duration-300 text-lg shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-smiley-mango to-smiley-strawberry text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-smiley-mango/10 hover:text-smiley-mango border-2 border-gray-200 hover:border-smiley-mango'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filtered.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <motion.div
                    key={`${item.q}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <motion.div
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-smiley-mango/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.button
                        className="w-full text-left px-6 py-5 font-semibold flex justify-between items-center group-hover:bg-gradient-to-r group-hover:from-orange-50 group-hover:to-pink-50 transition-all duration-300"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <span className="text-lg text-gray-800 group-hover:text-smiley-mango transition-colors duration-300">
                              {item.q}
                            </span>
                            <div className="text-sm text-smiley-mango font-medium mt-1">
                              {item.category}
                            </div>
                          </div>
                        </div>
                        <motion.span
                          className="text-2xl text-gray-400 group-hover:text-smiley-mango transition-all duration-300"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                        >
                          +
                        </motion.span>
                      </motion.button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed bg-gradient-to-r from-orange-50/50 to-pink-50/50">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🤔</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse different categories
                </p>
                <button
                  onClick={() => {
                    setQuery('')
                    setSelectedCategory('All')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-smiley-mango to-smiley-strawberry py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our friendly support team is here to help you smile brighter!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-smiley-mango px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-smiley-mango transition-all duration-300 hover:scale-105">
              Live Chat
            </button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}


