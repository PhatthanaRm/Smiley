export type AdminUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'super_admin' | 'admin' | 'editor' | 'viewer'
  permissions: string[]
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

export type AdminPermission = 
  | 'products:read' | 'products:write' | 'products:delete'
  | 'orders:read' | 'orders:write' | 'orders:delete'
  | 'customers:read' | 'customers:write' | 'customers:delete'
  | 'content:read' | 'content:write' | 'content:delete'
  | 'analytics:read'
  | 'settings:read' | 'settings:write'
  | 'users:read' | 'users:write' | 'users:delete'

export type AdminStats = {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  recentOrders: number
  pendingOrders: number
  monthlyRevenue: number
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
}

export type AdminOrder = {
  id: string
  orderNumber: string
  customer: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  items: Array<{
    id: string
    product: {
      id: string
      name: string
      imageEmoji?: string
    }
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: {
    firstName: string
    lastName: string
    address1: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  notes?: string
}

export type AdminProduct = {
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
  stockQuantity?: number
  images?: string[]
  category?: string
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
  published: boolean
}

export type AdminCustomer = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: Array<{
    id: string
    type: 'shipping' | 'billing'
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
  }>
  orders: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    createdAt: string
  }>
  subscriptions: Array<{
    id: string
    product: {
      id: string
      name: string
    }
    status: string
    nextDelivery: string
  }>
  totalSpent: number
  createdAt: string
  lastOrderAt?: string
  isActive: boolean
}

export type AdminContent = {
  id: string
  type: 'page' | 'blog' | 'banner' | 'popup'
  title: string
  slug?: string
  content: string
  excerpt?: string
  status: 'draft' | 'published' | 'archived'
  author: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  featuredImage?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export type AdminSettings = {
  id: string
  siteName: string
  siteDescription: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  currency: string
  currencySymbol: string
  timezone: string
  language: string
  email: string
  phone?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  maintenance: boolean
  maintenanceMessage?: string
  createdAt: string
  updatedAt: string
}
