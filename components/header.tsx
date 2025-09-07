"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/components/cart-provider'
import { useAuth } from '@/components/auth-provider'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount, lastAddedItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleCartClick = () => {
    window.location.href = '/cart'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-smiley-mango/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-smiley-mango to-smiley-strawberry rounded-full flex items-center justify-center"
            >
              <span className="text-white text-xl font-bold">😊</span>
            </motion.div>
            <span className="text-2xl font-bold text-rainbow">
              SMILEY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-smiley-mango transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>


            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative"
            >
              <motion.div
                animate={lastAddedItem ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.div>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-smiley-strawberry text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
              {lastAddedItem && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center"
                >
                  ✓
                </motion.div>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-smiley-mango hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header








