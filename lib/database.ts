import { createSupabaseClient } from './supabase-client'
import { createSupabaseServerClient, createSupabaseAdminClient } from './supabase-server'
import { Product, CartItem, Order, OrderItem, WishlistItem, Review, NewsletterSubscriber, BlogPost } from './types'

// Product functions
export const getProducts = async (filters?: {
  category?: string
  featured?: boolean
  inStock?: boolean
  limit?: number
  offset?: number
}): Promise<{ products: Product[]; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    
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

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    } else if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      return { products: [], error }
    }

    // Transform data to match our Product type
    const products: Product[] = (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      flavor: item.flavor,
      type: item.type,
      price: parseFloat(item.price),
      originalPrice: item.original_price ? parseFloat(item.original_price) : undefined,
      rating: parseFloat(item.rating),
      reviews: item.reviews_count,
      description: item.description,
      longDescription: item.long_description,
      imageEmoji: item.image_emoji,
      gradientFrom: item.gradient_from,
      gradientTo: item.gradient_to,
      badges: item.badges,
      features: item.features,
      ingredients: item.ingredients,
      size: item.size,
      ageGroup: item.age_group,
      subscription: item.subscription_price ? {
        price: parseFloat(item.subscription_price),
        interval: item.subscription_interval
      } : undefined,
      inStock: item.in_stock,
      images: item.images,
      category: item.category,
      tags: item.tags,
      featured: item.featured
    }))

    return { products, error: null }
  } catch (error) {
    return { products: [], error }
  }
}

export const getProduct = async (id: string): Promise<{ product: Product | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { product: null, error }
    }

    if (!data) {
      return { product: null, error: null }
    }

    const product: Product = {
      id: data.id,
      slug: data.slug,
      name: data.name,
      flavor: data.flavor,
      type: data.type,
      price: parseFloat(data.price),
      originalPrice: data.original_price ? parseFloat(data.original_price) : undefined,
      rating: parseFloat(data.rating),
      reviews: data.reviews_count,
      description: data.description,
      longDescription: data.long_description,
      imageEmoji: data.image_emoji,
      gradientFrom: data.gradient_from,
      gradientTo: data.gradient_to,
      badges: data.badges,
      features: data.features,
      ingredients: data.ingredients,
      size: data.size,
      ageGroup: data.age_group,
      subscription: data.subscription_price ? {
        price: parseFloat(data.subscription_price),
        interval: data.subscription_interval
      } : undefined,
      inStock: data.in_stock,
      images: data.images,
      category: data.category,
      tags: data.tags,
      featured: data.featured
    }

    return { product, error: null }
  } catch (error) {
    return { product: null, error }
  }
}

export const getProductBySlug = async (slug: string): Promise<{ product: Product | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return { product: null, error }
    }

    if (!data) {
      return { product: null, error: null }
    }

    const product: Product = {
      id: data.id,
      slug: data.slug,
      name: data.name,
      flavor: data.flavor,
      type: data.type,
      price: parseFloat(data.price),
      originalPrice: data.original_price ? parseFloat(data.original_price) : undefined,
      rating: parseFloat(data.rating),
      reviews: data.reviews_count,
      description: data.description,
      longDescription: data.long_description,
      imageEmoji: data.image_emoji,
      gradientFrom: data.gradient_from,
      gradientTo: data.gradient_to,
      badges: data.badges,
      features: data.features,
      ingredients: data.ingredients,
      size: data.size,
      ageGroup: data.age_group,
      subscription: data.subscription_price ? {
        price: parseFloat(data.subscription_price),
        interval: data.subscription_interval
      } : undefined,
      inStock: data.in_stock,
      images: data.images,
      category: data.category,
      tags: data.tags,
      featured: data.featured
    }

    return { product, error: null }
  } catch (error) {
    return { product: null, error }
  }
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<{ product: Product | null; error: any }> => {
  try {
    const supabase = createSupabaseAdminClient()
    
    const { data, error } = await supabase
      .from('products')
      .insert({
        slug: product.slug,
        name: product.name,
        flavor: product.flavor,
        type: product.type,
        price: product.price,
        original_price: product.originalPrice,
        description: product.description,
        long_description: product.longDescription,
        image_emoji: product.imageEmoji,
        gradient_from: product.gradientFrom,
        gradient_to: product.gradientTo,
        badges: product.badges,
        features: product.features,
        ingredients: product.ingredients,
        size: product.size,
        age_group: product.ageGroup,
        subscription_price: product.subscription?.price,
        subscription_interval: product.subscription?.interval,
        in_stock: product.inStock,
        images: product.images,
        category: product.category,
        tags: product.tags,
        featured: product.featured
      })
      .select()
      .single()

    if (error) {
      return { product: null, error }
    }

    const newProduct: Product = {
      id: data.id,
      slug: data.slug,
      name: data.name,
      flavor: data.flavor,
      type: data.type,
      price: parseFloat(data.price),
      originalPrice: data.original_price ? parseFloat(data.original_price) : undefined,
      rating: parseFloat(data.rating),
      reviews: data.reviews_count,
      description: data.description,
      longDescription: data.long_description,
      imageEmoji: data.image_emoji,
      gradientFrom: data.gradient_from,
      gradientTo: data.gradient_to,
      badges: data.badges,
      features: data.features,
      ingredients: data.ingredients,
      size: data.size,
      ageGroup: data.age_group,
      subscription: data.subscription_price ? {
        price: parseFloat(data.subscription_price),
        interval: data.subscription_interval
      } : undefined,
      inStock: data.in_stock,
      images: data.images,
      category: data.category,
      tags: data.tags,
      featured: data.featured
    }

    return { product: newProduct, error: null }
  } catch (error) {
    return { product: null, error }
  }
}

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<{ product: Product | null; error: any }> => {
  try {
    const supabase = createSupabaseAdminClient()
    
    const updateData: any = {}
    if (updates.name) updateData.name = updates.name
    if (updates.slug) updateData.slug = updates.slug
    if (updates.flavor) updateData.flavor = updates.flavor
    if (updates.type) updateData.type = updates.type
    if (updates.price !== undefined) updateData.price = updates.price
    if (updates.originalPrice !== undefined) updateData.original_price = updates.originalPrice
    if (updates.description) updateData.description = updates.description
    if (updates.longDescription) updateData.long_description = updates.longDescription
    if (updates.imageEmoji) updateData.image_emoji = updates.imageEmoji
    if (updates.gradientFrom) updateData.gradient_from = updates.gradientFrom
    if (updates.gradientTo) updateData.gradient_to = updates.gradientTo
    if (updates.badges) updateData.badges = updates.badges
    if (updates.features) updateData.features = updates.features
    if (updates.ingredients) updateData.ingredients = updates.ingredients
    if (updates.size) updateData.size = updates.size
    if (updates.ageGroup) updateData.age_group = updates.ageGroup
    if (updates.subscription) {
      updateData.subscription_price = updates.subscription.price
      updateData.subscription_interval = updates.subscription.interval
    }
    if (updates.inStock !== undefined) updateData.in_stock = updates.inStock
    if (updates.images) updateData.images = updates.images
    if (updates.category) updateData.category = updates.category
    if (updates.tags) updateData.tags = updates.tags
    if (updates.featured !== undefined) updateData.featured = updates.featured

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { product: null, error }
    }

    const product: Product = {
      id: data.id,
      slug: data.slug,
      name: data.name,
      flavor: data.flavor,
      type: data.type,
      price: parseFloat(data.price),
      originalPrice: data.original_price ? parseFloat(data.original_price) : undefined,
      rating: parseFloat(data.rating),
      reviews: data.reviews_count,
      description: data.description,
      longDescription: data.long_description,
      imageEmoji: data.image_emoji,
      gradientFrom: data.gradient_from,
      gradientTo: data.gradient_to,
      badges: data.badges,
      features: data.features,
      ingredients: data.ingredients,
      size: data.size,
      ageGroup: data.age_group,
      subscription: data.subscription_price ? {
        price: parseFloat(data.subscription_price),
        interval: data.subscription_interval
      } : undefined,
      inStock: data.in_stock,
      images: data.images,
      category: data.category,
      tags: data.tags,
      featured: data.featured
    }

    return { product, error: null }
  } catch (error) {
    return { product: null, error }
  }
}

export const deleteProduct = async (id: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseAdminClient()
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    return { error }
  } catch (error) {
    return { error }
  }
}

// Cart functions
export const getCartItems = async (userId: string): Promise<{ items: CartItem[]; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { items: [], error }
    }

    const items: CartItem[] = (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id,
      product_id: item.product_id,
      quantity: item.quantity,
      created_at: item.created_at,
      updated_at: item.updated_at
    }))

    return { items, error: null }
  } catch (error) {
    return { items: [], error }
  }
}

export const addToCart = async (userId: string, productId: string, quantity: number = 1): Promise<{ item: CartItem | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    
    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      return { item: null, error: checkError }
    }

    if (existingItem) {
      // Update existing item
      const { data, error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: existingItem.quantity + quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) {
        return { item: null, error }
      }

      return { 
        item: {
          id: data.id,
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity,
          created_at: data.created_at,
          updated_at: data.updated_at
        }, 
        error: null 
      }
    } else {
      // Create new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity
        })
        .select()
        .single()

      if (error) {
        return { item: null, error }
      }

      return { 
        item: {
          id: data.id,
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity,
          created_at: data.created_at,
          updated_at: data.updated_at
        }, 
        error: null 
      }
    }
  } catch (error) {
    return { item: null, error }
  }
}

export const updateCartItem = async (itemId: string, quantity: number): Promise<{ item: CartItem | null; error: any }> => {
  try {
    if (quantity <= 0) {
      const { error } = await removeFromCart(itemId)
      return { item: null, error }
    }

    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('cart_items')
      .update({ 
        quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', itemId)
      .select()
      .single()

    if (error) {
      return { item: null, error }
    }

    return { 
      item: {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        created_at: data.created_at,
        updated_at: data.updated_at
      }, 
      error: null 
    }
  } catch (error) {
    return { item: null, error }
  }
}

export const removeFromCart = async (itemId: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    return { error }
  } catch (error) {
    return { error }
  }
}

export const clearCart = async (userId: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    return { error }
  } catch (error) {
    return { error }
  }
}

// Order functions
export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<{ order: Order | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: order.user_id,
        stripe_payment_intent_id: order.stripe_payment_intent_id,
        status: order.status,
        total_amount: order.total_amount,
        shipping_address: order.shipping_address,
        billing_address: order.billing_address
      })
      .select()
      .single()

    if (error) {
      return { order: null, error }
    }

    return { 
      order: {
        id: data.id,
        user_id: data.user_id,
        stripe_payment_intent_id: data.stripe_payment_intent_id,
        status: data.status,
        total_amount: parseFloat(data.total_amount),
        shipping_address: data.shipping_address,
        billing_address: data.billing_address,
        created_at: data.created_at,
        updated_at: data.updated_at
      }, 
      error: null 
    }
  } catch (error) {
    return { order: null, error }
  }
}

export const getOrders = async (userId: string): Promise<{ orders: Order[]; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { orders: [], error }
    }

    const orders: Order[] = (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id,
      stripe_payment_intent_id: item.stripe_payment_intent_id,
      status: item.status,
      total_amount: parseFloat(item.total_amount),
      shipping_address: item.shipping_address,
      billing_address: item.billing_address,
      created_at: item.created_at,
      updated_at: item.updated_at
    }))

    return { orders, error: null }
  } catch (error) {
    return { orders: [], error }
  }
}

export const getOrder = async (orderId: string): Promise<{ order: Order | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error) {
      return { order: null, error }
    }

    if (!data) {
      return { order: null, error: null }
    }

    return { 
      order: {
        id: data.id,
        user_id: data.user_id,
        stripe_payment_intent_id: data.stripe_payment_intent_id,
        status: data.status,
        total_amount: parseFloat(data.total_amount),
        shipping_address: data.shipping_address,
        billing_address: data.billing_address,
        created_at: data.created_at,
        updated_at: data.updated_at
      }, 
      error: null 
    }
  } catch (error) {
    return { order: null, error }
  }
}

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<{ order: Order | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      return { order: null, error }
    }

    return { 
      order: {
        id: data.id,
        user_id: data.user_id,
        stripe_payment_intent_id: data.stripe_payment_intent_id,
        status: data.status,
        total_amount: parseFloat(data.total_amount),
        shipping_address: data.shipping_address,
        billing_address: data.billing_address,
        created_at: data.created_at,
        updated_at: data.updated_at
      }, 
      error: null 
    }
  } catch (error) {
    return { order: null, error }
  }
}

// Wishlist functions
export const getWishlistItems = async (userId: string): Promise<{ items: WishlistItem[]; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { items: [], error }
    }

    const items: WishlistItem[] = (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id,
      product_id: item.product_id,
      created_at: item.created_at
    }))

    return { items, error: null }
  } catch (error) {
    return { items: [], error }
  }
}

export const addToWishlist = async (userId: string, productId: string): Promise<{ item: WishlistItem | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    
    // Check if item already exists
    const { data: existingItem, error: checkError } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      return { item: null, error: checkError }
    }

    if (existingItem) {
      return { item: existingItem, error: null }
    }

    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId
      })
      .select()
      .single()

    if (error) {
      return { item: null, error }
    }

    return { 
      item: {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        created_at: data.created_at
      }, 
      error: null 
    }
  } catch (error) {
    return { item: null, error }
  }
}

export const removeFromWishlist = async (userId: string, productId: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    return { error }
  } catch (error) {
    return { error }
  }
}

export const isInWishlist = async (userId: string, productId: string): Promise<{ inWishlist: boolean; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (error && error.code !== 'PGRST116') {
      return { inWishlist: false, error }
    }

    return { inWishlist: !!data, error: null }
  } catch (error) {
    return { inWishlist: false, error }
  }
}

// Review functions
export const getProductReviews = async (productId: string): Promise<{ reviews: Review[]; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (error) {
      return { reviews: [], error }
    }

    const reviews: Review[] = (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id,
      product_id: item.product_id,
      rating: item.rating,
      comment: item.comment,
      created_at: item.created_at,
      updated_at: item.updated_at
    }))

    return { reviews, error: null }
  } catch (error) {
    return { reviews: [], error }
  }
}

export const createReview = async (review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<{ review: Review | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: review.user_id,
        product_id: review.product_id,
        rating: review.rating,
        comment: review.comment
      })
      .select()
      .single()

    if (error) {
      return { review: null, error }
    }

    return { 
      review: {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        rating: data.rating,
        comment: data.comment,
        created_at: data.created_at,
        updated_at: data.updated_at
      }, 
      error: null 
    }
  } catch (error) {
    return { review: null, error }
  }
}

export const updateReview = async (reviewId: string, updates: Partial<Review>): Promise<{ review: Review | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    
    const updateData: any = {}
    if (updates.rating !== undefined) updateData.rating = updates.rating
    if (updates.comment !== undefined) updateData.comment = updates.comment

    const { data, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', reviewId)
      .select()
      .single()

    if (error) {
      return { review: null, error }
    }

    return { 
      review: {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        rating: data.rating,
        comment: data.comment,
        created_at: data.created_at,
        updated_at: data.updated_at
      }, 
      error: null 
    }
  } catch (error) {
    return { review: null, error }
  }
}

export const deleteReview = async (reviewId: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)

    return { error }
  } catch (error) {
    return { error }
  }
}

// Newsletter functions
export const subscribeToNewsletter = async (email: string): Promise<{ subscriber: NewsletterSubscriber | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    
    // Check if subscriber already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      return { subscriber: null, error: checkError }
    }

    if (existingSubscriber) {
      // Update existing subscriber
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({ 
          subscribed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSubscriber.id)
        .select()
        .single()

      if (error) {
        return { subscriber: null, error }
      }

      return { 
        subscriber: {
          id: data.id,
          email: data.email,
          subscribed: data.subscribed,
          created_at: data.created_at,
          updated_at: data.updated_at
        }, 
        error: null 
      }
    } else {
      // Create new subscriber
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          subscribed: true
        })
        .select()
        .single()

      if (error) {
        return { subscriber: null, error }
      }

      return { 
        subscriber: {
          id: data.id,
          email: data.email,
          subscribed: data.subscribed,
          created_at: data.created_at,
          updated_at: data.updated_at
        }, 
        error: null 
      }
    }
  } catch (error) {
    return { subscriber: null, error }
  }
}

export const unsubscribeFromNewsletter = async (email: string): Promise<{ error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        subscribed: false,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)

    return { error }
  } catch (error) {
    return { error }
  }
}

export const getNewsletterSubscribers = async (): Promise<{ subscribers: NewsletterSubscriber[]; error: any }> => {
  try {
    const supabase = createSupabaseAdminClient()
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('subscribed', true)
      .order('created_at', { ascending: false })

    if (error) {
      return { subscribers: [], error }
    }

    const subscribers: NewsletterSubscriber[] = (data || []).map(item => ({
      id: item.id,
      email: item.email,
      subscribed: item.subscribed,
      created_at: item.created_at,
      updated_at: item.updated_at
    }))

    return { subscribers, error: null }
  } catch (error) {
    return { subscribers: [], error }
  }
}

// Blog functions
export const getBlogPosts = async (filters?: {
  featured?: boolean
  limit?: number
  offset?: number
}): Promise<{ posts: BlogPost[]; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    } else if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      return { posts: [], error }
    }

    const posts: BlogPost[] = (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: item.date,
      author: item.author,
      coverEmoji: item.cover_emoji,
      tags: item.tags,
      featured: item.featured,
      readTime: item.read_time
    }))

    return { posts, error: null }
  } catch (error) {
    return { posts: [], error }
  }
}

export const getBlogPost = async (slug: string): Promise<{ post: BlogPost | null; error: any }> => {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return { post: null, error }
    }

    if (!data) {
      return { post: null, error: null }
    }

    const post: BlogPost = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date,
      author: data.author,
      coverEmoji: data.cover_emoji,
      tags: data.tags,
      featured: data.featured,
      readTime: data.read_time
    }

    return { post, error: null }
  } catch (error) {
    return { post: null, error }
  }
}