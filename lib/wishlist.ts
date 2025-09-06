// Mock wishlist functions (Supabase removed)
// This will be replaced with a real database system later

import { addToWishlist, removeFromWishlist, isInWishlist } from './database'

export async function toggleWishlist(productId: string, userId: string) {
  try {
    // Check if item is already in wishlist
    const { inWishlist } = await isInWishlist(userId, productId)
    
    if (inWishlist) {
      // Remove from wishlist
      const { error } = await removeFromWishlist(userId, productId)
      if (error) {
        throw new Error(error.message || 'Failed to remove from wishlist')
      }
      return { wished: false }
    } else {
      // Add to wishlist
      const { error } = await addToWishlist(userId, productId)
      if (error) {
        throw new Error(error.message || 'Failed to add to wishlist')
      }
      return { wished: true }
    }
  } catch (error) {
    console.error('Toggle wishlist error:', error)
    throw error
  }
}

export async function fetchWishlist(userId: string): Promise<string[]> {
  try {
    const { items } = await getWishlistItems(userId)
    return items.map(item => item.product_id)
  } catch (error) {
    console.error('Fetch wishlist error:', error)
    return []
  }
}

// Helper function to get wishlist items
async function getWishlistItems(userId: string) {
  const { getWishlistItems } = await import('./database')
  return getWishlistItems(userId)
}