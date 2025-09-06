"use client"

import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react'
import { POSTS } from '@/lib/data'
import type { BlogPost } from '@/lib/types'
import Header from '@/components/header'
import Footer from '@/components/footer'

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

  // Determine if this post is fruit or dessert related
  const isFruitRelated = () => {
    const fruitKeywords = ['strawberry', 'mango', 'yuzu', 'blueberry', 'mint', 'lavender', 'peach', 'lime', 'coral', 'cyan', 'flavor', 'fruit']
    const content = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase()
    return fruitKeywords.some(keyword => content.includes(keyword))
  }

  // Get appropriate emojis based on this post's content
  const getPostEmojis = () => {
    const fruitEmojis = ['🍓', '🍊', '🍋', '🍇', '🍑', '🥝', '🍎', '🍌']
    const dessertEmojis = ['🍰', '🧁', '🍪', '🍩', '🍭', '🍦', '🍫', '🍬']
    
    return isFruitRelated() ? fruitEmojis : dessertEmojis
  }

  const postEmojis = getPostEmojis()

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Header />
      
      {/* Colorful background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-smiley-mango/15 to-smiley-strawberry/15 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-smiley-mint/15 to-smiley-blueberry/15 rounded-full blur-lg animate-bounce-gentle"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-smiley-yuzu/10 to-smiley-lavender/10 rounded-full blur-2xl animate-wiggle"></div>
        <div className="absolute top-60 left-1/3 w-20 h-20 bg-gradient-to-br from-smiley-peach/20 to-smiley-coral/20 rounded-full blur-md animate-float"></div>
        <div className="absolute bottom-60 right-1/3 w-28 h-28 bg-gradient-to-br from-smiley-lime/15 to-smiley-cyan/15 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>

      <div className="pt-24 pb-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 relative z-20"
        >
          <Link href="/blog">
            <Button variant="smileyOutline" size="sm" className="group relative z-20">
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
          className="text-center mb-12 relative"
        >
          <div className="flex justify-center mb-6 relative">
            <div className="text-8xl animate-bounce-gentle relative z-10">
              {post.coverEmoji}
            </div>
            <div className="absolute top-2 right-2 text-2xl animate-spin opacity-60" style={{animationDuration: '3s'}}>{postEmojis[0]}</div>
            <div className="absolute bottom-2 left-2 text-xl animate-bounce opacity-60" style={{animationDelay: '0.5s'}}>{postEmojis[1]}</div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.tags?.map((tag, index) => {
              const tagColors = [
                'bg-gradient-to-r from-smiley-mint/30 to-smiley-cyan/30 text-smiley-mint border-smiley-mint/50',
                'bg-gradient-to-r from-smiley-mango/30 to-smiley-peach/30 text-smiley-mango border-smiley-mango/50',
                'bg-gradient-to-r from-smiley-strawberry/30 to-smiley-lavender/30 text-smiley-strawberry border-smiley-strawberry/50',
                'bg-gradient-to-r from-smiley-yuzu/30 to-smiley-lime/30 text-smiley-yuzu border-smiley-yuzu/50'
              ]
              const tagColor = tagColors[index % tagColors.length]
              return (
                <span
                  key={tag}
                  className={`${tagColor} px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105`}
                >
                  {tag}
                </span>
              )
            })}
          </div>

          <h1 className="text-4xl font-bold text-smiley-strawberry mb-4 relative z-10">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-6 text-gray-500 mb-6 relative z-10">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-smiley-mango" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-smiley-strawberry" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto relative z-10">
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
          <div className="absolute -inset-1 bg-gradient-to-r from-smiley-mango/10 via-smiley-strawberry/10 to-smiley-mint/10 rounded-2xl blur opacity-50"></div>
          <Card className="relative bg-white/90 backdrop-blur-sm shadow-xl border-0">
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
          className="text-center mb-12 relative z-20"
        >
          <Card className="bg-gradient-to-br from-smiley-mango/10 to-smiley-strawberry/10 border-0 shadow-lg relative z-20">
            <CardContent className="p-6 relative z-20">
              <h3 className="text-lg font-semibold text-smiley-mango mb-4">
                Enjoyed this article? Share it! 📢
              </h3>
              <div className="flex justify-center space-x-4 relative z-20">
                <Button variant="smileyOutline" size="sm" className="hover:bg-gradient-to-r hover:from-smiley-mango hover:to-smiley-strawberry hover:text-white hover:border-transparent transition-all duration-300 relative z-20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="smileyOutline" size="sm" className="hover:bg-gradient-to-r hover:from-smiley-mint hover:to-smiley-blueberry hover:text-white hover:border-transparent transition-all duration-300 relative z-20">
                  Twitter
                </Button>
                <Button variant="smileyOutline" size="sm" className="hover:bg-gradient-to-r hover:from-smiley-yuzu hover:to-smiley-peach hover:text-white hover:border-transparent transition-all duration-300 relative z-20">
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
            <h3 className="text-2xl font-bold text-rainbow mb-8 text-center">
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
                    <h4 className="text-lg font-semibold text-rainbow mb-2 group-hover:text-rainbow transition-colors">
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
          className="relative z-20"
        >
          <Card className="bg-gradient-to-br from-smiley-mango/10 to-smiley-strawberry/10 border-0 shadow-lg relative z-20">
            <CardContent className="p-8 text-center relative z-20">
              <h3 className="text-2xl font-bold text-smiley-mint mb-4">
                Stay in the Loop! 📧
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get more articles like this, plus exclusive flavor drops and oral care tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-20">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-smiley-mango relative z-20"
                />
                <Button variant="smiley" size="lg" className="relative z-20">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
      <Footer />
    </main>
  )
}