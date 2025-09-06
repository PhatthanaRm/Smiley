// Mock database system (Supabase removed)
// This will be replaced with a real database system later

import { Product, CartItem, Order, OrderItem, WishlistItem, Review, NewsletterSubscriber } from './types'

// Mock data storage (in production, this would be in a database)
let mockProducts: Product[] = [
  {
    id: '1',
    name: 'Strawberry Fresh Toothpaste',
    flavor: 'Strawberry',
    type: 'Toothpaste',
    description: 'Delicious strawberry-flavored toothpaste that makes brushing fun for kids and adults alike!',
    price: 8.99,
    originalPrice: 12.99,
    images: ['/images/strawberry-toothpaste.jpg'],
    category: 'Toothpaste',
    tags: ['strawberry', 'kids', 'fruity'],
    inStock: true,
    reviews: 23,
    featured: true,
    rating: 4.5,
    slug: 'strawberry-fresh-toothpaste',
  },
  {
    id: '2',
    name: 'Minty Fresh Toothbrush',
    flavor: 'Mint',
    type: 'Toothbrush',
    description: 'Soft-bristled toothbrush with ergonomic handle for comfortable brushing',
    price: 6.99,
    originalPrice: 9.99,
    images: ['/images/minty-toothbrush.jpg'],
    category: 'Toothbrush',
    tags: ['mint', 'soft', 'ergonomic'],
    inStock: true,
    reviews: 45,
    featured: true,
    rating: 4.8,
    slug: 'minty-fresh-toothbrush',
  },
  {
    id: '3',
    name: 'Berry Blast Mouthwash',
    flavor: 'Berry',
    type: 'Mouthwash',
    description: 'Refreshing berry-flavored mouthwash that leaves your mouth feeling clean and fresh',
    price: 7.99,
    originalPrice: 11.99,
    images: ['/images/berry-mouthwash.jpg'],
    category: 'Mouthwash',
    tags: ['berry', 'fresh', 'refreshing'],
    inStock: true,
    reviews: 18,
    featured: true,
    rating: 4.3,
    slug: 'berry-blast-mouthwash',
  },
  {
    id: '4',
    name: 'Complete Oral Care Bundle',
    flavor: 'Mixed',
    type: 'Bundle',
    description: 'Everything you need for a complete oral care routine',
    price: 24.99,
    originalPrice: 34.99,
    images: ['/images/oral-care-bundle.jpg'],
    category: 'Bundle',
    tags: ['bundle', 'complete', 'savings'],
    inStock: true,
    reviews: 67,
    featured: true,
    rating: 4.7,
    slug: 'complete-oral-care-bundle',
  },
]

let mockCartItems: CartItem[] = []
let mockOrders: Order[] = []
let mockWishlistItems: WishlistItem[] = []
let mockReviews: Review[] = []
let mockNewsletterSubscribers: NewsletterSubscriber[] = []

// Product functions
export const getProducts = async (filters?: {
  category?: string
  featured?: boolean
  inStock?: boolean
  limit?: number
  offset?: number
}): Promise<{ products: Product[]; error: any }> => {
  let products = [...mockProducts]

  if (filters?.category) {
    products = products.filter(p => p.category === filters.category)
  }

  if (filters?.featured !== undefined) {
    products = products.filter(p => p.featured === filters.featured)
  }

  if (filters?.inStock !== undefined) {
    products = products.filter(p => p.inStock === filters.inStock)
  }

  if (filters?.offset) {
    products = products.slice(filters.offset)
  }

  if (filters?.limit) {
    products = products.slice(0, filters.limit)
  }

  return { products, error: null }
}

export const getProduct = async (id: string): Promise<{ product: Product | null; error: any }> => {
  const product = mockProducts.find(p => p.id === id)
  return { product: product || null, error: null }
}

export const getProductBySlug = async (slug: string): Promise<{ product: Product | null; error: any }> => {
  const product = mockProducts.find(p => p.slug === slug)
  return { product: product || null, error: null }
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<{ product: Product | null; error: any }> => {
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
  }

  mockProducts.push(newProduct)
  return { product: newProduct, error: null }
}

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<{ product: Product | null; error: any }> => {
  const productIndex = mockProducts.findIndex(p => p.id === id)
  if (productIndex === -1) {
    return { product: null, error: { message: 'Product not found' } }
  }

  mockProducts[productIndex] = {
    ...mockProducts[productIndex],
    ...updates,
  }

  return { product: mockProducts[productIndex], error: null }
}

export const deleteProduct = async (id: string): Promise<{ error: any }> => {
  const productIndex = mockProducts.findIndex(p => p.id === id)
  if (productIndex === -1) {
    return { error: { message: 'Product not found' } }
  }

  mockProducts.splice(productIndex, 1)
  return { error: null }
}

// Cart functions
export const getCartItems = async (userId: string): Promise<{ items: CartItem[]; error: any }> => {
  const items = mockCartItems.filter(item => item.user_id === userId)
  return { items, error: null }
}

export const addToCart = async (userId: string, productId: string, quantity: number = 1): Promise<{ item: CartItem | null; error: any }> => {
  const existingItem = mockCartItems.find(item => item.user_id === userId && item.product_id === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
    existingItem.updated_at = new Date().toISOString()
    return { item: existingItem, error: null }
  } else {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: userId,
      product_id: productId,
      quantity,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockCartItems.push(newItem)
    return { item: newItem, error: null }
  }
}

export const updateCartItem = async (itemId: string, quantity: number): Promise<{ item: CartItem | null; error: any }> => {
  if (quantity <= 0) {
    const { error } = await removeFromCart(itemId)
    return { item: null, error }
  }

  const item = mockCartItems.find(item => item.id === itemId)
  if (!item) {
    return { item: null, error: { message: 'Cart item not found' } }
  }

  item.quantity = quantity
  item.updated_at = new Date().toISOString()
  return { item, error: null }
}

export const removeFromCart = async (itemId: string): Promise<{ error: any }> => {
  const itemIndex = mockCartItems.findIndex(item => item.id === itemId)
  if (itemIndex === -1) {
    return { error: { message: 'Cart item not found' } }
  }

  mockCartItems.splice(itemIndex, 1)
  return { error: null }
}

export const clearCart = async (userId: string): Promise<{ error: any }> => {
  mockCartItems = mockCartItems.filter(item => item.user_id !== userId)
  return { error: null }
}

// Order functions
export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<{ order: Order | null; error: any }> => {
  const newOrder: Order = {
    ...order,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockOrders.push(newOrder)
  return { order: newOrder, error: null }
}

export const getOrders = async (userId: string): Promise<{ orders: Order[]; error: any }> => {
  const orders = mockOrders.filter(order => order.user_id === userId)
  return { orders, error: null }
}

export const getOrder = async (orderId: string): Promise<{ order: Order | null; error: any }> => {
  const order = mockOrders.find(order => order.id === orderId)
  return { order: order || null, error: null }
}

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<{ order: Order | null; error: any }> => {
  const order = mockOrders.find(order => order.id === orderId)
  if (!order) {
    return { order: null, error: { message: 'Order not found' } }
  }

  order.status = status
  order.updated_at = new Date().toISOString()
  return { order, error: null }
}

// Wishlist functions
export const getWishlistItems = async (userId: string): Promise<{ items: WishlistItem[]; error: any }> => {
  const items = mockWishlistItems.filter(item => item.user_id === userId)
  return { items, error: null }
}

export const addToWishlist = async (userId: string, productId: string): Promise<{ item: WishlistItem | null; error: any }> => {
  const existingItem = mockWishlistItems.find(item => item.user_id === userId && item.product_id === productId)
  if (existingItem) {
    return { item: existingItem, error: null }
  }

  const newItem: WishlistItem = {
    id: Math.random().toString(36).substr(2, 9),
    user_id: userId,
    product_id: productId,
    created_at: new Date().toISOString(),
  }

  mockWishlistItems.push(newItem)
  return { item: newItem, error: null }
}

export const removeFromWishlist = async (userId: string, productId: string): Promise<{ error: any }> => {
  const itemIndex = mockWishlistItems.findIndex(item => item.user_id === userId && item.product_id === productId)
  if (itemIndex === -1) {
    return { error: { message: 'Wishlist item not found' } }
  }

  mockWishlistItems.splice(itemIndex, 1)
  return { error: null }
}

export const isInWishlist = async (userId: string, productId: string): Promise<{ inWishlist: boolean; error: any }> => {
  const item = mockWishlistItems.find(item => item.user_id === userId && item.product_id === productId)
  return { inWishlist: !!item, error: null }
}

// Review functions
export const getProductReviews = async (productId: string): Promise<{ reviews: Review[]; error: any }> => {
  const reviews = mockReviews.filter(review => review.product_id === productId)
  return { reviews, error: null }
}

export const createReview = async (review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<{ review: Review | null; error: any }> => {
  const newReview: Review = {
    ...review,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockReviews.push(newReview)
  return { review: newReview, error: null }
}

export const updateReview = async (reviewId: string, updates: Partial<Review>): Promise<{ review: Review | null; error: any }> => {
  const review = mockReviews.find(review => review.id === reviewId)
  if (!review) {
    return { review: null, error: { message: 'Review not found' } }
  }

  Object.assign(review, updates)
  review.updated_at = new Date().toISOString()
  return { review, error: null }
}

export const deleteReview = async (reviewId: string): Promise<{ error: any }> => {
  const reviewIndex = mockReviews.findIndex(review => review.id === reviewId)
  if (reviewIndex === -1) {
    return { error: { message: 'Review not found' } }
  }

  mockReviews.splice(reviewIndex, 1)
  return { error: null }
}

// Newsletter functions
export const subscribeToNewsletter = async (email: string): Promise<{ subscriber: NewsletterSubscriber | null; error: any }> => {
  const existingSubscriber = mockNewsletterSubscribers.find(sub => sub.email === email)
  if (existingSubscriber) {
    existingSubscriber.subscribed = true
    existingSubscriber.updated_at = new Date().toISOString()
    return { subscriber: existingSubscriber, error: null }
  }

  const newSubscriber: NewsletterSubscriber = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    subscribed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockNewsletterSubscribers.push(newSubscriber)
  return { subscriber: newSubscriber, error: null }
}

export const unsubscribeFromNewsletter = async (email: string): Promise<{ error: any }> => {
  const subscriber = mockNewsletterSubscribers.find(sub => sub.email === email)
  if (!subscriber) {
    return { error: { message: 'Subscriber not found' } }
  }

  subscriber.subscribed = false
  subscriber.updated_at = new Date().toISOString()
  return { error: null }
}

export const getNewsletterSubscribers = async (): Promise<{ subscribers: NewsletterSubscriber[]; error: any }> => {
  const subscribers = mockNewsletterSubscribers.filter(sub => sub.subscribed)
  return { subscribers, error: null }
}