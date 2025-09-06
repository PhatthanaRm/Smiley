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

export type AdminUser = {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'admin' | 'super_admin'
  permissions: AdminPermission[]
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export type AdminSession = {
  user: AdminUser
  permissions: AdminPermission[]
  expires_at: string
}

export type AdminPermission = 'users:read' | 'users:write' | 'users:delete' | 'products:read' | 'products:write' | 'products:delete' | 'orders:read' | 'orders:write' | 'orders:delete' | 'content:read' | 'content:write' | 'content:delete' | 'analytics:read' | 'settings:read' | 'settings:write'

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

export type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  user_id: string
  stripe_payment_intent_id?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address: Address
  billing_address: Address
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export type WishlistItem = {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export type Review = {
  id: string
  user_id: string
  product_id: string
  rating: number
  comment?: string
  created_at: string
  updated_at: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  subscribed: boolean
  created_at: string
  updated_at: string
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

export type Address = {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export type User = {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  product: Product
  interval: 'monthly' | 'quarterly'
  nextDelivery: string
  status: 'active' | 'paused' | 'cancelled'
}

export type NewsletterSignup = {
  email: string
  firstName?: string
  source?: string
  preferences?: string[]
}