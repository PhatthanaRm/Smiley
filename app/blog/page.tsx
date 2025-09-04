"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, User, Tag } from 'lucide-react'
import { POSTS } from '@/lib/data'
import type { BlogPost } from '@/lib/types'

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>('All')
  
  const allTags = ['All', ...Array.from(new Set(POSTS.flatMap(post => post.tags || [])))]
  
  const filteredPosts = selectedTag === 'All' 
    ? POSTS 
    : POSTS.filter(post => post.tags?.includes(selectedTag))

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SMILEY <span className="text-rainbow">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover oral care tips, flavor launches, and fun facts about keeping your smile healthy and bright!
          </p>
        </motion.div>

        {/* Featured Post */}
        {POSTS.find(post => post.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-smiely-mango/20 to-smiely-strawberry/20 p-8 flex items-center justify-center">
                    <div className="text-8xl">
                      {POSTS.find(post => post.featured)?.coverEmoji}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-smiely-yuzu text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="bg-smiely-mint/20 text-smiely-mint px-3 py-1 rounded-full text-sm font-medium">
                        {POSTS.find(post => post.featured)?.tags?.[0]}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {POSTS.find(post => post.featured)?.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {POSTS.find(post => post.featured)?.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{POSTS.find(post => post.featured)?.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{POSTS.find(post => post.featured)?.readTime}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${POSTS.find(post => post.featured)?.slug}`}>
                      <Button variant="smiley" size="lg">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-smiely-mango to-smiely-strawberry text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                <div className="bg-gradient-to-br from-smiely-mint/20 to-smiely-blueberry/20 p-8 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {post.coverEmoji}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-smiely-mint/20 text-smiely-mint px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-smiely-mango transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="smileyOutline" size="sm" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-smiely-mango/10 to-smiely-strawberry/10 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated with SMILEY! 📧
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get the latest flavor drops, oral care tips, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-smiely-mango"
                />
                <Button variant="smiley" size="lg">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}