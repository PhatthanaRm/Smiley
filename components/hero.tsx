"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, Zap } from 'lucide-react'

const Hero = () => {
  const floatingFruits = [
    { emoji: '🥭', color: 'from-smiely-mango to-orange-400', delay: 0 },
    { emoji: '🍓', color: 'from-smiely-strawberry to-pink-400', delay: 1 },
    { emoji: '🍋', color: 'from-smiely-yuzu to-yellow-400', delay: 2 },
    { emoji: '🫐', color: 'from-smiely-blueberry to-blue-400', delay: 3 },
  ]

  const features = [
    { icon: Star, text: 'Dentist Approved', color: 'text-smiely-yuzu' },
    { icon: Shield, text: '100% Natural', color: 'text-smiely-mint' },
    { icon: Zap, text: 'Long Lasting', color: 'text-smiely-strawberry' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fruit-burst pt-16">
      {/* Floating Fruit Background */}
      {floatingFruits.map((fruit, index) => (
        <motion.div
          key={fruit.emoji}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fruit.delay, duration: 1 }}
          className={`absolute w-20 h-20 bg-gradient-to-br ${fruit.color} rounded-full flex items-center justify-center text-4xl shadow-lg colorful-glow floating-fruit`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + (index % 2) * 20}%`,
          }}
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, delay: fruit.delay }}
          >
            {fruit.emoji}
          </motion.div>
        </motion.div>
      ))}

      {/* Additional Colorful Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`floating-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 2 + i * 0.2, duration: 1 }}
          className="absolute w-4 h-4 bg-white/30 rounded-full colorful-pulse"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      {/* Colorful Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            delay: 3 + i * 0.1, 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: Math.random() * 3 
          }}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          ✨
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Make Brushing{' '}
                <span className="text-fruit-burst">
                  Fun Again!
                </span>
              </h1>
              <p className="mt-6 text-xl text-white/90 leading-relaxed drop-shadow-md">
                Discover our playful yet premium oral care products with fruit-inspired flavors. 
                Dentist-approved, fun, and effective for the whole family.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-rainbow colorful-hover"
                >
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

                         {/* CTA Buttons */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="flex flex-col sm:flex-row gap-4 justify-center"
             >
               <Link href="/shop">
                 <Button size="xl" variant="rainbow" className="group colorful-pulse">
                   Shop Now
                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
               <Link href="/about">
                 <Button size="xl" variant="sunsetOutline">
                   Learn More
                 </Button>
               </Link>
             </motion.div>
          </motion.div>

          {/* Right Content - Animated Toothpaste */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", bounce: 0.4 }}
              className="relative"
            >
              {/* Main Toothpaste Tube */}
              <div className="w-80 h-96 mx-auto relative">
                {/* Tube Body */}
                <div className="absolute inset-0 bg-gradient-to-b from-smiely-mint to-smiely-blueberry rounded-full transform rotate-12 shadow-2xl colorful-glow">
                  {/* Cap */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-smiely-yuzu rounded-t-full"></div>
                  
                  {/* Product Label */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -rotate-12 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                    <span className="text-2xl font-bold text-rainbow">SMILEY</span>
                  </div>
                  
                  {/* Flavor Badge */}
                  <div className="absolute bottom-8 right-4 bg-smiely-strawberry text-white px-3 py-1 rounded-full text-sm font-semibold transform rotate-12">
                    🍓 Strawberry
                  </div>
                </div>

                {/* Floating Bubbles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                    className="absolute w-4 h-4 bg-white/60 rounded-full"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${30 + (i * 10)}%`,
                    }}
                  />
                ))}
              </div>

              {/* Success Checkmark */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                  className="w-8 h-8 text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center colorful-glow"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero








