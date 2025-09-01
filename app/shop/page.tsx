"use client"

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product-card'
import { PRODUCTS } from '@/lib/data'
import type { Product } from '@/lib/types'

const flavors = Array.from(new Set(PRODUCTS.map(p => p.flavor)))
const types = Array.from(new Set(PRODUCTS.map(p => p.type)))

export default function ShopPage() {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [query, setQuery] = useState('')

  const filtered: Product[] = useMemo(() => {
    return PRODUCTS.filter(p => {
      const inFlavor = selectedFlavor === 'All' || p.flavor === selectedFlavor
      const inType = selectedType === 'All' || p.type === selectedType
      const inQuery = !query || p.name.toLowerCase().includes(query.toLowerCase())
      return inFlavor && inType && inQuery
    })
  }, [selectedFlavor, selectedType, query])

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Shop SMILEY</h1>
          <p className="text-gray-600">Playful, dentist-approved products for the whole family</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10"
        >
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <select
            value={selectedFlavor}
            onChange={e => setSelectedFlavor(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option>All</option>
            {flavors.map(f => (
              <option key={f}>{f}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option>All</option>
            {types.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}


