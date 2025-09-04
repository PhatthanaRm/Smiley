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

export type CartItem = {
  id: string
  product: Product
  quantity: number
  subscription?: boolean
}

export type Cart = {
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount?: {
    code: string
    amount: number
    type: 'percentage' | 'fixed'
  }
}

export type Order = {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
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
  firstName: string
  lastName: string
  addresses: Address[]
  orders: Order[]
  subscriptions: Subscription[]
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


