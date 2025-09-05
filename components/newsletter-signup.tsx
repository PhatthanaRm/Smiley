"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, Gift, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      toast({
        title: "Welcome to SMILEY! 🎉",
        description: "You'll be the first to know about new flavors and exclusive offers!",
      })
      setEmail('')
    }
  }

  const benefits = [
    { icon: Gift, text: 'Exclusive flavor drops', color: 'text-smiley-mango' },
    { icon: Sparkles, text: 'Early access to new products', color: 'text-smiley-strawberry' },
    { icon: Mail, text: 'Oral care tips & tricks', color: 'text-smiley-yuzu' },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-smiley-mango/15 via-smiley-strawberry/15 to-smiley-yuzu/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-6xl">📧</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stay <span className="text-sunset">Smiley</span> with Us!
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join our community and be the first to discover new flavors, exclusive offers, 
              and oral care tips that will make you smile!
            </p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-smiley-mango focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  variant="smiley" 
                  size="lg" 
                  className="w-full group"
                >
                  Subscribe & Smile! 😊
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    className="ml-2"
                  >
                    ✨
                  </motion.div>
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-4xl">✅</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">Welcome to the Family! 🎉</h3>
                <p className="text-gray-600">
                  You&apos;re now part of our SMILEY community! Check your email for a special welcome gift.
                </p>
                <Button
                  variant="smileyOutline"
                  onClick={() => setIsSubscribed(false)}
                  className="mt-4"
                >
                  Subscribe Another Email
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <p className="text-sm text-gray-500 mb-2">Join thousands of happy customers</p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="w-8 h-8 bg-smiley-yuzu rounded-full flex items-center justify-center text-white text-sm font-bold"
                >
                  😊
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSignup








