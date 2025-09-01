import type { Product, BlogPost } from './types'

export const FLAVORS = ['Mango', 'Strawberry', 'Yuzu', 'Blueberry', 'Lavender', 'Mint'] as const
export const PRODUCT_TYPES = ['Toothpaste', 'Toothbrush', 'Mouthwash', 'Accessory'] as const

export const PRODUCTS: Product[] = [
  {
    id: 'p-mango-tango',
    slug: 'mango-tango-toothpaste',
    name: 'Mango Tango Toothpaste',
    flavor: 'Mango',
    type: 'Toothpaste',
    price: 8.99,
    rating: 4.8,
    reviews: 127,
    imageEmoji: '🥭',
    gradientFrom: 'from-orange-300',
    gradientTo: 'to-orange-500',
    description: 'Tropical mango flavor with natural whitening',
    badges: ['Best Seller']
  },
  {
    id: 'p-strawberry-soft',
    slug: 'strawberry-soft-brush',
    name: 'Strawberry Soft Brush',
    flavor: 'Strawberry',
    type: 'Toothbrush',
    price: 12.99,
    rating: 4.9,
    reviews: 89,
    imageEmoji: '🍓',
    gradientFrom: 'from-pink-300',
    gradientTo: 'to-pink-500',
    description: 'Gentle bristles with strawberry scent',
    badges: ['New']
  },
  {
    id: 'p-yuzu-fresh',
    slug: 'yuzu-fresh-toothpaste',
    name: 'Yuzu Fresh Toothpaste',
    flavor: 'Yuzu',
    type: 'Toothpaste',
    price: 8.99,
    rating: 4.7,
    reviews: 64,
    imageEmoji: '🍋',
    gradientFrom: 'from-yellow-300',
    gradientTo: 'to-yellow-500',
    description: 'Citrus yuzu for fresh breath',
    badges: ['Limited']
  },
  {
    id: 'p-blueberry-mouthwash',
    slug: 'blueberry-mouthwash',
    name: 'Blueberry Mouthwash',
    flavor: 'Blueberry',
    type: 'Mouthwash',
    price: 15.99,
    rating: 4.6,
    reviews: 42,
    imageEmoji: '🫐',
    gradientFrom: 'from-blue-300',
    gradientTo: 'to-blue-500',
    description: 'Antibacterial mouthwash with natural blueberry',
    badges: ['Popular']
  },
  {
    id: 'p-lavender-dream',
    slug: 'lavender-dream-toothpaste',
    name: 'Lavender Dream Toothpaste',
    flavor: 'Lavender',
    type: 'Toothpaste',
    price: 9.99,
    rating: 4.5,
    reviews: 38,
    imageEmoji: '💜',
    gradientFrom: 'from-purple-300',
    gradientTo: 'to-purple-500',
    description: 'Calming lavender for bedtime',
    badges: ['Premium']
  },
  {
    id: 'p-mint-fresh',
    slug: 'mint-fresh-toothpaste',
    name: 'Mint Fresh Toothpaste',
    flavor: 'Mint',
    type: 'Toothpaste',
    price: 7.99,
    rating: 4.4,
    reviews: 156,
    imageEmoji: '🌿',
    gradientFrom: 'from-emerald-300',
    gradientTo: 'to-emerald-500',
    description: 'Classic mint for everyday freshness',
    badges: ['Classic']
  }
]

export const POSTS: BlogPost[] = [
  {
    id: 'b-flavor-drops-strawberry',
    slug: 'flavor-drops-strawberry',
    title: 'Flavor Drops: Strawberry Fields',
    excerpt: 'A sweet new twist on your morning routine.',
    content: 'Long-form content about the new strawberry flavor... ',
    date: '2024-08-12',
    author: 'SMILEY Team',
    coverEmoji: '🍓',
    tags: ['flavor', 'update']
  },
  {
    id: 'b-oral-care-tips',
    slug: 'oral-care-tips',
    title: '5 Dentist-Approved Oral Care Tips',
    excerpt: 'Keep your smile bright with these essentials.',
    content: 'Tips and best practices...',
    date: '2024-07-21',
    author: 'Dr. Smile',
    coverEmoji: '🦷',
    tags: ['tips']
  }
]


