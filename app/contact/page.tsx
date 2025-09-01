"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-6">We'd love to hear from you! Questions about orders, flavors, or subscriptions? Send us a message.</p>
          <div className="rounded-2xl overflow-hidden shadow">
            <iframe
              title="SMILEY HQ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0862882669645!2d-122.401376!3d37.792281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f7b09e6b%3A0x8b1b1f7bebfcd3a9!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1615911673818!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full px-4 py-3 rounded-full border border-gray-200" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
              <input className="w-full px-4 py-3 rounded-full border border-gray-200" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <textarea className="w-full px-4 py-3 rounded-2xl border border-gray-200" rows={5} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
              <Button type="submit" variant="smiley" className="w-full">Send</Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="text-5xl mb-2">✅</div>
              <div className="text-lg">Thanks, we got your message and will reply soon.</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


