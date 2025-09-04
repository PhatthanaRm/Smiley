import { NextResponse } from 'next/server'
import { POSTS } from '@/lib/data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const tag = searchParams.get('tag')
    
    let filteredPosts = POSTS
    
    // Filter featured posts
    if (featured === 'true') {
      filteredPosts = filteredPosts.filter(p => p.featured)
    }
    
    // Filter by tag
    if (tag) {
      filteredPosts = filteredPosts.filter(p => p.tags.includes(tag))
    }
    
    // Get all unique tags
    const allTags = Array.from(new Set(POSTS.flatMap(p => p.tags || [])))
    
    return NextResponse.json({
      success: true,
      posts: filteredPosts,
      total: filteredPosts.length,
      tags: allTags,
      filters: {
        featured,
        tag
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
