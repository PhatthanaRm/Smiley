import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/components/cart-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import NewsletterPopup from '@/components/newsletter-popup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'SMILEY - Premium Oral Care Products',
  description: 'Discover our playful yet premium oral care products with fruit-inspired flavors. Dentist-approved, fun, and effective for the whole family.',
  keywords: 'oral care, toothpaste, dental hygiene, fruit flavors, premium dental products',
  authors: [{ name: 'SMILEY Team' }],
  openGraph: {
    title: 'SMILEY - Premium Oral Care Products',
    description: 'Discover our playful yet premium oral care products with fruit-inspired flavors.',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'SMILEY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMILEY - Premium Oral Care Products',
    description: 'Discover our playful yet premium oral care products with fruit-inspired flavors.',
  },
}









