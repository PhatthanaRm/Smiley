"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Mail, Gift } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // Show popup after 3 seconds if not shown before
    const hasSeenPopup = localStorage.getItem('smiley-newsletter-popup')
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast({
        title: "Welcome to SMILEY! 🎉",
        description: "Thanks for subscribing! Check your email for a 10% discount code.",
      })
      localStorage.setItem('smiley-newsletter-popup', 'true')
      setIsOpen(false)
      setEmail('')
    }
  }

  const handleClose = () => {
    localStorage.setItem('smiley-newsletter-popup', 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Stay <span className="text-rainbow">Smiley</span> with Us!
              </h2>
              <p className="text-gray-600 mb-6">
                Get 10% off your first order plus exclusive flavor drops and oral care tips!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-smiely-mango focus:border-transparent transition-all duration-200"
                  />
                </div>
                <Button
                  type="submit"
                  variant="smiley"
                  size="lg"
                  className="w-full group"
                >
                  <Gift className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get 10% Off!
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

