import { notFound } from 'next/navigation'
import { POSTS } from '@/lib/data'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find(p => p.slug === params.slug)
  if (!post) return notFound()
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-6xl mb-4">{post.coverEmoji ?? '✨'}</div>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-8">{post.date} · {post.author}</div>
        <article className="prose prose-lg max-w-none">
          <p>{post.content}</p>
        </article>
      </div>
    </main>
  )
}


