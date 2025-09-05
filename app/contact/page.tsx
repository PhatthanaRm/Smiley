"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message sent! 📧",
      description: "We'll get back to you within 24 hours. Thanks for reaching out!",
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="text-rainbow">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products? Need help with your order? We&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-smiely-mango focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-smiely-mango focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-smiely-mango focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-question">Product Question</option>
                      <option value="order-support">Order Support</option>
                      <option value="subscription">Subscription Help</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-smiely-mango focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="smiley"
                    size="lg"
                    className="w-full group"
                  >
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-smiely-mango/20 rounded-full">
                      <Mail className="w-6 h-6 text-smiely-mango" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-600 mb-2">We&apos;ll respond within 24 hours</p>
                      <a
                        href="mailto:hello@smiley.com"
                        className="text-smiely-mango hover:text-smiely-strawberry transition-colors font-medium"
                      >
                        hello@smiley.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-smiely-strawberry/20 rounded-full">
                      <Phone className="w-6 h-6 text-smiely-strawberry" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                      <p className="text-gray-600 mb-2">Mon-Fri 9AM-6PM EST</p>
                      <a
                        href="tel:+15551234567"
                        className="text-smiely-strawberry hover:text-smiely-mango transition-colors font-medium"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-smiely-yuzu/20 rounded-full">
                      <MapPin className="w-6 h-6 text-smiely-yuzu" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                      <p className="text-gray-600 mb-2">Our headquarters</p>
                      <address className="text-smiely-yuzu not-italic font-medium">
                        123 Smile Street<br />
                        Happy City, HC 12345
                      </address>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-smiely-mint/20 rounded-full">
                      <MessageCircle className="w-6 h-6 text-smiely-mint" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                      <p className="text-gray-600 mb-2">Get instant help</p>
                      <button className="text-smiely-mint hover:text-smiely-blueberry transition-colors font-medium">
                        Start Chat
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Hours */}
            <Card className="bg-gradient-to-br from-smiely-mint/5 to-smiely-blueberry/5 border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-smiely-mint" />
                  <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="bg-gradient-to-br from-smiely-mango/5 to-smiely-strawberry/5 border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quick Questions?
                </h3>
                <p className="text-gray-600 mb-4">
                  Check out our FAQ section for instant answers to common questions.
                </p>
                <Button variant="smileyOutline" size="lg">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  )
}