export type Profile = {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
  role?: 'user' | 'admin' | 'super_admin'
  is_active?: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  slug: string
  name: string
  flavor: string
  type: 'Toothpaste' | 'Toothbrush' | 'Mouthwash' | 'Accessory' | 'Bundle'
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  description: string
  longDescription?: string
  imageEmoji?: string
  gradientFrom?: string
  gradientTo?: string
  badges?: string[]
  features?: string[]
  ingredients?: string[]
  size?: string
  ageGroup?: 'Kids' | 'Adults' | 'All'
  subscription?: {
    price: number
    interval: 'monthly' | 'quarterly'
  }
  inStock: boolean
  images?: string[]
  category?: string
  tags?: string[]
  featured?: boolean
}

export type WishlistItem = {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  coverEmoji?: string
  tags?: string[]
  featured?: boolean
  readTime?: string
}

export type User = {
  id: string
  email: string
  created_at: string
  updated_at: string
  email_confirmed_at?: string
}