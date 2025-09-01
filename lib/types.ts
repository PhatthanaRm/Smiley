export type Product = {
  id: string
  slug: string
  name: string
  flavor: string
  type: 'Toothpaste' | 'Toothbrush' | 'Mouthwash' | 'Accessory'
  price: number
  rating: number
  reviews: number
  description: string
  imageEmoji?: string
  gradientFrom?: string
  gradientTo?: string
  badges?: string[]
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
}


