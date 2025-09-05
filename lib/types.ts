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

// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          original_price: number | null
          images: string[]
          category: string
          tags: string[]
          in_stock: boolean
          stock_quantity: number
          featured: boolean
          rating: number
          review_count: number
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          original_price?: number | null
          images: string[]
          category: string
          tags: string[]
          in_stock?: boolean
          stock_quantity?: number
          featured?: boolean
          rating?: number
          review_count?: number
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          original_price?: number | null
          images?: string[]
          category?: string
          tags?: string[]
          in_stock?: boolean
          stock_quantity?: number
          featured?: boolean
          rating?: number
          review_count?: number
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          stripe_payment_intent_id: string | null
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: any
          billing_address: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_payment_intent_id?: string | null
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: any
          billing_address: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_payment_intent_id?: string | null
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          shipping_address?: any
          billing_address?: any
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          product_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Type aliases for easier use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type SupabaseProduct = Database['public']['Tables']['products']['Row']
export type SupabaseCartItem = Database['public']['Tables']['cart_items']['Row']
export type SupabaseOrder = Database['public']['Tables']['orders']['Row']
export type SupabaseOrderItem = Database['public']['Tables']['order_items']['Row']
export type SupabaseWishlistItem = Database['public']['Tables']['wishlist_items']['Row']
export type SupabaseReview = Database['public']['Tables']['reviews']['Row']
export type SupabaseNewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type CartItemInsert = Database['public']['Tables']['cart_items']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']
export type WishlistItemInsert = Database['public']['Tables']['wishlist_items']['Insert']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type NewsletterSubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type ProductUpdate = Database['public']['Tables']['products']['Update']
export type CartItemUpdate = Database['public']['Tables']['cart_items']['Update']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']
export type OrderItemUpdate = Database['public']['Tables']['order_items']['Update']
export type WishlistItemUpdate = Database['public']['Tables']['wishlist_items']['Update']
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update']
export type NewsletterSubscriberUpdate = Database['public']['Tables']['newsletter_subscribers']['Update']


