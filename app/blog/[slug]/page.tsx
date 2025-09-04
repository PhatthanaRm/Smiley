"use client"

import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react'
import { POSTS } from '@/lib/data'
import type { BlogPost } from '@/lib/types'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = POSTS.find(p => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = POSTS
    .filter(p => p.id !== post.id && p.tags?.some(tag => post.tags?.includes(tag)))
    .slice(0, 3)

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="smileyOutline" size="sm" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="text-8xl">
              {post.coverEmoji}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-smiely-mint/20 text-smiely-mint px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-6 text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {post.excerpt}
          </p>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <Card>
            <CardContent className="p-8">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <Card className="bg-gradient-to-br from-smiely-mango/5 to-smiely-strawberry/5 border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Enjoyed this article? Share it! 📢
              </h3>
              <div className="flex justify-center space-x-4">
                <Button variant="smileyOutline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="smileyOutline" size="sm">
                  Twitter
                </Button>
                <Button variant="smileyOutline" size="sm">
                  Facebook
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Card key={relatedPost.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-smiely-mint/20 to-smiely-blueberry/20 p-6 flex items-center justify-center">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {relatedPost.coverEmoji}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {relatedPost.tags?.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="bg-smiely-mint/20 text-smiely-mint px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-smiely-mango transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="smileyOutline" size="sm" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-smiely-mango/10 to-smiely-strawberry/10 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay in the Loop! 📧
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get more articles like this, plus exclusive flavor drops and oral care tips delivered to your inbox.
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