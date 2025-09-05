import { supabase } from './supabase-client'
import { 
  Product, 
  ProductInsert, 
  ProductUpdate,
  SupabaseCartItem,
  CartItemInsert,
  CartItemUpdate,
  SupabaseOrder,
  OrderInsert,
  OrderUpdate,
  SupabaseOrderItem,
  OrderItemInsert,
  SupabaseWishlistItem,
  WishlistItemInsert,
  SupabaseReview,
  ReviewInsert,
  ReviewUpdate,
  SupabaseNewsletterSubscriber,
  NewsletterSubscriberInsert,
  NewsletterSubscriberUpdate
} from './types'

// Product functions
export const getProducts = async (filters?: {
  category?: string
  featured?: boolean
  inStock?: boolean
  limit?: number
  offset?: number
}): Promise<{ products: Product[]; error: any }> => {
  if (!supabase) {
    return { products: [], error: { message: 'Supabase not configured' } }
  }

  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured)
  }

  if (filters?.inStock !== undefined) {
    query = query.eq('in_stock', filters.inStock)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  return { products: data || [], error }
}

export const getProduct = async (id: string): Promise<{ product: Product | null; error: any }> => {
  if (!supabase) {
    return { product: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  return { product: data, error }
}

export const getProductBySlug = async (slug: string): Promise<{ product: Product | null; error: any }> => {
  if (!supabase) {
    return { product: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  return { product: data, error }
}

export const createProduct = async (product: ProductInsert): Promise<{ product: Product | null; error: any }> => {
  if (!supabase) {
    return { product: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  return { product: data, error }
}

export const updateProduct = async (id: string, updates: ProductUpdate): Promise<{ product: Product | null; error: any }> => {
  if (!supabase) {
    return { product: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { product: data, error }
}

export const deleteProduct = async (id: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  return { error }
}

// Cart functions
export const getCartItems = async (userId: string): Promise<{ items: SupabaseCartItem[]; error: any }> => {
  if (!supabase) {
    return { items: [], error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { items: data || [], error }
}

export const addToCart = async (userId: string, productId: string, quantity: number = 1): Promise<{ item: SupabaseCartItem | null; error: any }> => {
  if (!supabase) {
    return { item: null, error: { message: 'Supabase not configured' } }
  }

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  if (existingItem) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ 
        quantity: existingItem.quantity + quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingItem.id)
      .select()
      .single()

    return { item: data, error }
  } else {
    // Create new cart item
    const cartItem: CartItemInsert = {
      user_id: userId,
      product_id: productId,
      quantity,
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert(cartItem)
      .select()
      .single()

    return { item: data, error }
  }
}

export const updateCartItem = async (itemId: string, quantity: number): Promise<{ item: SupabaseCartItem | null; error: any }> => {
  if (!supabase) {
    return { item: null, error: { message: 'Supabase not configured' } }
  }

  if (quantity <= 0) {
    return await removeFromCart(itemId)
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ 
      quantity,
      updated_at: new Date().toISOString()
    })
    .eq('id', itemId)
    .select()
    .single()

  return { item: data, error }
}

export const removeFromCart = async (itemId: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)

  return { error }
}

export const clearCart = async (userId: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)

  return { error }
}

// Order functions
export const createOrder = async (order: OrderInsert): Promise<{ order: SupabaseOrder | null; error: any }> => {
  if (!supabase) {
    return { order: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  return { order: data, error }
}

export const getOrders = async (userId: string): Promise<{ orders: SupabaseOrder[]; error: any }> => {
  if (!supabase) {
    return { orders: [], error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { orders: data || [], error }
}

export const getOrder = async (orderId: string): Promise<{ order: SupabaseOrder | null; error: any }> => {
  if (!supabase) {
    return { order: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('id', orderId)
    .single()

  return { order: data, error }
}

export const updateOrderStatus = async (orderId: string, status: SupabaseOrder['status']): Promise<{ order: SupabaseOrder | null; error: any }> => {
  if (!supabase) {
    return { order: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()
    .single()

  return { order: data, error }
}

// Wishlist functions
export const getWishlistItems = async (userId: string): Promise<{ items: SupabaseWishlistItem[]; error: any }> => {
  if (!supabase) {
    return { items: [], error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('wishlist_items')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { items: data || [], error }
}

export const addToWishlist = async (userId: string, productId: string): Promise<{ item: SupabaseWishlistItem | null; error: any }> => {
  if (!supabase) {
    return { item: null, error: { message: 'Supabase not configured' } }
  }

  const wishlistItem: WishlistItemInsert = {
    user_id: userId,
    product_id: productId,
  }

  const { data, error } = await supabase
    .from('wishlist_items')
    .insert(wishlistItem)
    .select()
    .single()

  return { item: data, error }
}

export const removeFromWishlist = async (userId: string, productId: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  return { error }
}

export const isInWishlist = async (userId: string, productId: string): Promise<{ inWishlist: boolean; error: any }> => {
  if (!supabase) {
    return { inWishlist: false, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  return { inWishlist: !!data, error }
}

// Review functions
export const getProductReviews = async (productId: string): Promise<{ reviews: SupabaseReview[]; error: any }> => {
  if (!supabase) {
    return { reviews: [], error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles (full_name, avatar_url)
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  return { reviews: data || [], error }
}

export const createReview = async (review: ReviewInsert): Promise<{ review: SupabaseReview | null; error: any }> => {
  if (!supabase) {
    return { review: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single()

  return { review: data, error }
}

export const updateReview = async (reviewId: string, updates: ReviewUpdate): Promise<{ review: SupabaseReview | null; error: any }> => {
  if (!supabase) {
    return { review: null, error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('reviews')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', reviewId)
    .select()
    .single()

  return { review: data, error }
}

export const deleteReview = async (reviewId: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  return { error }
}

// Newsletter functions
export const subscribeToNewsletter = async (email: string): Promise<{ subscriber: SupabaseNewsletterSubscriber | null; error: any }> => {
  if (!supabase) {
    return { subscriber: null, error: { message: 'Supabase not configured' } }
  }

  const subscriberData: NewsletterSubscriberInsert = {
    email,
    subscribed: true,
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .upsert(subscriberData, { onConflict: 'email' })
    .select()
    .single()

  return { subscriber: data, error }
}

export const unsubscribeFromNewsletter = async (email: string): Promise<{ error: any }> => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ subscribed: false, updated_at: new Date().toISOString() })
    .eq('email', email)

  return { error }
}

export const getNewsletterSubscribers = async (): Promise<{ subscribers: SupabaseNewsletterSubscriber[]; error: any }> => {
  if (!supabase) {
    return { subscribers: [], error: { message: 'Supabase not configured' } }
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('subscribed', true)
    .order('created_at', { ascending: false })

  return { subscribers: data || [], error }
}
