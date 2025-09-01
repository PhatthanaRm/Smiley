"use client"

import { useMemo, useState } from 'react'

const FAQS = [
  { q: 'What makes SMILEY dentist-approved?', a: 'Our formulas are developed with dental experts and use safe, effective ingredients.' },
  { q: 'Do you offer subscriptions?', a: 'Yes! Subscribe to your favorite products and save with flexible delivery schedules.' },
  { q: 'Are your products suitable for kids?', a: 'Absolutely. Our flavors and formulas are made for the whole family.' },
  { q: 'Do you ship internationally?', a: 'We ship to most countries. Shipping rates calculated at checkout.' },
]

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const filtered = useMemo(() => FAQS.filter(i => i.q.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">FAQ & Support</h1>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full px-4 py-3 mb-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  className="w-full text-left px-5 py-4 font-medium flex justify-between items-center"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span>{item.q}</span>
                  <span className="text-gray-400">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-600">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}


