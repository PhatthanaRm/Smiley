"use client"

import { notFound } from 'next/navigation'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/data'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import ReviewStars from '@/components/review-stars'
import { useCart } from '@/components/cart-provider'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = useMemo<Product | undefined>(() => PRODUCTS.find(p => p.slug === params.slug), [params.slug])
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) return notFound()

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className={`w-full h-96 rounded-2xl bg-gradient-to-br ${product.gradientFrom ?? 'from-gray-200'} ${product.gradientTo ?? 'to-gray-300'} flex items-center justify-center text-[7rem] shadow-lg`}>
            {product.imageEmoji ?? '🦷'}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map(i => (
              <div key={i} className={`h-20 rounded-xl bg-gradient-to-br ${product.gradientFrom ?? 'from-gray-200'} ${product.gradientTo ?? 'to-gray-300'} flex items-center justify-center text-3xl`}>
                {product.imageEmoji ?? '🦷'}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center space-x-3">
              <ReviewStars rating={product.rating} />
              <span className="text-gray-600 text-sm">{product.rating} ({product.reviews} reviews)</span>
              {product.badges?.map(b => (
                <span key={b} className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-full">{b}</span>
              ))}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {product.description}. Dentist approved. Fruit-inspired fun with a premium formula you can trust.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold">Flavor profile</h3>
            <p className="text-gray-600">{product.flavor} • Smooth • Fresh</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Ingredients</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Fluoride-free natural base</li>
              <li>Fruit extracts ({product.flavor})</li>
              <li>Aloe and xylitol</li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <div className="flex items-center border rounded-full overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2">-</button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-4 py-2">+</button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="smiley"
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: qty, image: product.imageEmoji, flavor: product.flavor })}
              className="px-8"
            >
              Add to Cart
            </Button>
            <Button
              variant="smileyOutline"
              className="px-8"
              onClick={async () => {
                const email = prompt('Enter your email to subscribe:')
                if (!email) return
                const res = await fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                })
                const data = await res.json()
                if (data.url) window.location.href = data.url
              }}
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}


