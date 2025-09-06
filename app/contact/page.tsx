"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Heart, Star, Sparkles, Zap, Users, Globe, Instagram, Twitter, Facebook, Linkedin, User } from 'lucide-react'
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
    <main className="min-h-screen relative overflow-hidden">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating fruit elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-smiley-mango/20 rounded-full floating-animation"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 bg-smiley-strawberry/20 rounded-full floating-animation"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-8 h-8 bg-smiley-yuzu/20 rounded-full floating-animation"
          animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-80 right-1/3 w-14 h-14 bg-smiley-mint/20 rounded-full floating-animation"
          animate={{ y: [0, 18, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-10 h-10 bg-smiley-blueberry/20 rounded-full floating-animation"
          animate={{ y: [0, -22, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-smiley-mango/10 to-smiley-strawberry/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-smiley-mint/10 to-smiley-blueberry/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-smiley-yuzu/5 to-smiley-lavender/5 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-smiley-mango/20 to-smiley-strawberry/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-2xl">
                  <MessageCircle className="w-12 h-12 text-smiley-mango mx-auto" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Get in <span className="text-rainbow">Touch</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Have questions about our products? Need help with your order? 
              <br />
              <span className="text-rainbow font-semibold">We&apos;d love to hear from you!</span>
            </motion.p>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center space-x-4 mt-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-smiley-mango/20 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-smiley-mango" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-smiley-strawberry/20 rounded-full flex items-center justify-center"
              >
                <Zap className="w-4 h-4 text-smiley-strawberry" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-smiley-mint/20 rounded-full flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 text-smiley-mint" />
              </motion.div>
            </motion.div>
          </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-smiley-mango/5 to-smiley-strawberry/5 rounded-3xl blur-xl" />
            
            <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-smiley-mango to-smiley-strawberry rounded-full mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Send us a <span className="text-rainbow">Message</span>
                  </h2>
                  <p className="text-gray-600">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2 text-smiley-mango" />
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-smiley-mango/20 focus:border-smiley-mango transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-smiley-mango/50"
                          placeholder="Your full name"
                        />
                        <motion.div
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          animate={{ scale: formData.name ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart className="w-5 h-5 text-smiley-mango" />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-smiley-strawberry" />
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-smiley-strawberry/20 focus:border-smiley-strawberry transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-smiley-strawberry/50"
                          placeholder="your@email.com"
                        />
                        <motion.div
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          animate={{ scale: formData.email ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Star className="w-5 h-5 text-smiley-strawberry" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-smiley-yuzu" />
                      Subject *
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-smiley-yuzu/20 focus:border-smiley-yuzu transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-smiley-yuzu/50 appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-question">Product Question</option>
                        <option value="order-support">Order Support</option>
                        <option value="subscription">Subscription Help</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      <motion.div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        animate={{ rotate: formData.subject ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className="w-5 h-5 text-smiley-yuzu" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-smiley-mint" />
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-smiley-mint/20 focus:border-smiley-mint transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm hover:border-smiley-mint/50"
                        placeholder="Tell us how we can help you..."
                      />
                      <motion.div
                        className="absolute bottom-4 right-4"
                        animate={{ scale: formData.message ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-smiley-mint rounded-full" />
                          <div className="w-2 h-2 bg-smiley-blueberry rounded-full" />
                          <div className="w-2 h-2 bg-smiley-lavender rounded-full" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      variant="smiley"
                      size="lg"
                      className="w-full group relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-smiley-mango to-smiley-strawberry opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="relative flex items-center justify-center">
                        <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="font-semibold">Send Message</span>
                        <motion.div
                          className="ml-3"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-smiley-mango/5 border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-smiley-mango to-smiley-strawberry rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Mail className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-smiley-mango transition-colors">
                          Email Us
                        </h3>
                        <p className="text-gray-600 mb-3">We&apos;ll respond within 24 hours</p>
                        <a
                          href="mailto:hello@smiley.com"
                          className="text-smiley-mango hover:text-smiley-strawberry transition-colors font-semibold text-lg group-hover:underline"
                        >
                          hello@smiley.com
                        </a>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <MessageCircle className="w-5 h-5 text-smiley-mango" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-smiley-strawberry/5 border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-smiley-strawberry to-smiley-lavender rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Phone className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-smiley-strawberry transition-colors">
                          Call Us
                        </h3>
                        <p className="text-gray-600 mb-3">Mon-Fri 9AM-6PM EST</p>
                        <a
                          href="tel:+15551234567"
                          className="text-smiley-strawberry hover:text-smiley-mango transition-colors font-semibold text-lg group-hover:underline"
                        >
                          +1 (555) 123-4567
                        </a>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Phone className="w-5 h-5 text-smiley-strawberry" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-smiley-yuzu/5 border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-smiley-yuzu to-smiley-peach rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-smiley-yuzu transition-colors">
                          Visit Us
                        </h3>
                        <p className="text-gray-600 mb-3">Our headquarters</p>
                        <address className="text-smiley-yuzu not-italic font-semibold text-lg group-hover:underline">
                          123 Smile Street<br />
                          Happy City, HC 12345
                        </address>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Globe className="w-5 h-5 text-smiley-yuzu" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-smiley-mint/5 border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-smiley-mint to-smiley-blueberry rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <MessageCircle className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-smiley-mint transition-colors">
                          Live Chat
                        </h3>
                        <p className="text-gray-600 mb-3">Get instant help</p>
                        <button className="text-smiley-mint hover:text-smiley-blueberry transition-colors font-semibold text-lg group-hover:underline">
                          Start Chat
                        </button>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Zap className="w-5 h-5 text-smiley-mint" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="bg-gradient-to-br from-smiley-lavender/5 to-smiley-blueberry/5 border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-smiley-lavender to-smiley-blueberry rounded-full mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Follow Us
                    </h3>
                    <p className="text-gray-600">
                      Stay connected and get the latest updates
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.a
                      href="#"
                      className="group flex items-center justify-center space-x-3 p-4 bg-white/80 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors" />
                      <span className="font-semibold text-gray-700 group-hover:text-white transition-colors">Instagram</span>
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      className="group flex items-center justify-center space-x-3 p-4 bg-white/80 rounded-2xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                      <span className="font-semibold text-gray-700 group-hover:text-white transition-colors">Twitter</span>
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      className="group flex items-center justify-center space-x-3 p-4 bg-white/80 rounded-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Facebook className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      <span className="font-semibold text-gray-700 group-hover:text-white transition-colors">Facebook</span>
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      className="group flex items-center justify-center space-x-3 p-4 bg-white/80 rounded-2xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors" />
                      <span className="font-semibold text-gray-700 group-hover:text-white transition-colors">LinkedIn</span>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-smiley-mint/5 to-smiley-blueberry/5 border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <motion.div
                      className="p-3 bg-gradient-to-r from-smiley-mint to-smiley-blueberry rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                      <span className="font-semibold text-gray-700">Monday - Friday</span>
                      <span className="text-smiley-mint font-bold">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                      <span className="font-semibold text-gray-700">Saturday</span>
                      <span className="text-smiley-strawberry font-bold">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                      <span className="font-semibold text-gray-700">Sunday</span>
                      <span className="text-gray-500 font-bold">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="bg-gradient-to-br from-smiley-mango/5 to-smiley-strawberry/5 border-0 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-smiley-mango to-smiley-strawberry rounded-full mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Quick Questions?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Check out our FAQ section for instant answers to common questions.
                  </p>
                  <Button 
                    variant="smileyOutline" 
                    size="lg"
                    className="group relative overflow-hidden"
                    asChild
                  >
                    <a href="/faq">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-smiley-mango to-smiley-strawberry opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative font-semibold">View FAQ</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  )
}