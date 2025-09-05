import { supabase } from './supabase-client'

export async function toggleWishlist(productId: string, userId: string) {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  
  // naive table: wishlist (user_id text, product_id text)
  const { data: existing } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()

  if (existing) {
    await supabase.from('wishlist').delete().eq('user_id', userId).eq('product_id', productId)
    return { wished: false }
  } else {
    await supabase.from('wishlist').insert({ user_id: userId, product_id: productId })
    return { wished: true }
  }
}

export async function fetchWishlist(userId: string): Promise<string[]> {
  if (!supabase) {
    return []
  }
  
  const { data } = await supabase.from('wishlist').select('product_id').eq('user_id', userId)
  return (data ?? []).map(r => r.product_id)
}


