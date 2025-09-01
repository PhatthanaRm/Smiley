import Link from 'next/link'
import { POSTS } from '@/lib/data'

export default function BlogPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Flavor Drops & Tips</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {POSTS.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="p-6 rounded-2xl bg-white shadow hover:shadow-md transition">
                <div className="text-5xl mb-4">{post.coverEmoji ?? '✨'}</div>
                <h3 className="text-2xl font-semibold group-hover:underline">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <div className="text-sm text-gray-500 mt-3">{post.date} · {post.author}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}


