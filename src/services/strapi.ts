// Strapi API Service
// Handles all communication with Strapi CMS

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
const API_URL = `${STRAPI_URL}/api`

// Types
export interface StrapiPost {
  id: number
  attributes: {
    title: string
    titleZh: string
    slug: string
    excerpt: string
    excerptZh: string
    content: string
    contentZh: string
    readTime: number
    likes: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    category?: {
      data: {
        id: number
        attributes: StrapiCategory['attributes']
      }
    }
    cover?: {
      data: {
        attributes: {
          url: string
          formats?: {
            thumbnail?: { url: string }
            small?: { url: string }
            medium?: { url: string }
            large?: { url: string }
          }
        }
      }
    }
  }
}

export interface StrapiCategory {
  id: number
  attributes: {
    name: string
    nameZh: string
    slug: string
    icon: string
    color: string
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Event emitter for real-time updates
type Listener = () => void
const listeners: Set<Listener> = new Set()

export const onPostsUpdate = (callback: Listener) => {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

const notifyListeners = () => {
  listeners.forEach(listener => listener())
}

// Polling for real-time updates (check every 30 seconds)
let lastCheck = new Date().toISOString()
let pollingInterval: ReturnType<typeof setInterval> | null = null

export const startPolling = (intervalMs: number = 30000) => {
  if (pollingInterval) return

  pollingInterval = setInterval(async () => {
    try {
      const response = await fetch(
        `${API_URL}/posts?filters[updatedAt][$gt]=${lastCheck}&pagination[limit]=1`
      )
      const data = await response.json()

      if (data.data && data.data.length > 0) {
        lastCheck = new Date().toISOString()
        notifyListeners()
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }, intervalMs)
}

export const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
    pollingInterval = null
  }
}

// API Functions

// Get all posts
export const getPosts = async (params?: {
  category?: string
  search?: string
  page?: number
  pageSize?: number
}): Promise<StrapiResponse<StrapiPost[]>> => {
  const searchParams = new URLSearchParams()

  // Include category relation
  searchParams.append('populate', 'category,cover')

  // Sort by publish date descending
  searchParams.append('sort', 'publishedAt:desc')

  // Filters
  if (params?.category && params.category !== 'all') {
    searchParams.append('filters[category][slug][$eq]', params.category)
  }

  if (params?.search) {
    searchParams.append('filters[$or][0][title][$containsi]', params.search)
    searchParams.append('filters[$or][1][titleZh][$containsi]', params.search)
    searchParams.append('filters[$or][2][content][$containsi]', params.search)
    searchParams.append('filters[$or][3][contentZh][$containsi]', params.search)
  }

  // Pagination
  if (params?.page) {
    searchParams.append('pagination[page]', params.page.toString())
  }
  if (params?.pageSize) {
    searchParams.append('pagination[pageSize]', params.pageSize.toString())
  }

  const response = await fetch(`${API_URL}/posts?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }

  return response.json()
}

// Get single post by slug
export const getPostBySlug = async (slug: string): Promise<StrapiResponse<StrapiPost[]>> => {
  const searchParams = new URLSearchParams()
  searchParams.append('filters[slug][$eq]', slug)
  searchParams.append('populate', 'category,cover')

  const response = await fetch(`${API_URL}/posts?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`)
  }

  return response.json()
}

// Get all categories
export const getCategories = async (): Promise<StrapiResponse<StrapiCategory[]>> => {
  const response = await fetch(`${API_URL}/categories?sort=name:asc`)

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  return response.json()
}

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<StrapiResponse<StrapiCategory[]>> => {
  const searchParams = new URLSearchParams()
  searchParams.append('filters[slug][$eq]', slug)

  const response = await fetch(`${API_URL}/categories?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.statusText}`)
  }

  return response.json()
}

// Get posts count by category
export const getPostsCountByCategory = async (): Promise<Record<string, number>> => {
  const response = await fetch(`${API_URL}/posts?pagination[limit]=1000&fields[0]=id&populate[category][fields][0]=slug`)

  if (!response.ok) {
    throw new Error(`Failed to fetch posts count: ${response.statusText}`)
  }

  const data: StrapiResponse<StrapiPost[]> = await response.json()

  const counts: Record<string, number> = {}
  data.data.forEach(post => {
    const categorySlug = post.attributes.category?.data?.attributes?.slug
    if (categorySlug) {
      counts[categorySlug] = (counts[categorySlug] || 0) + 1
    }
  })

  return counts
}

// Helper: Get full image URL
export const getImageUrl = (path?: string): string => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${STRAPI_URL}${path}`
}

// Helper: Transform Strapi post to app format
export const transformPost = (strapiPost: StrapiPost) => {
  const { attributes } = strapiPost
  return {
    id: strapiPost.id,
    slug: attributes.slug,
    title: attributes.title,
    titleZh: attributes.titleZh,
    excerpt: attributes.excerpt,
    excerptZh: attributes.excerptZh,
    content: attributes.content,
    contentZh: attributes.contentZh,
    category: attributes.category?.data?.attributes?.slug || '',
    createdAt: attributes.publishedAt || attributes.createdAt,
    updatedAt: attributes.updatedAt,
    readTime: attributes.readTime,
    likes: attributes.likes || 0,
    cover: getImageUrl(attributes.cover?.data?.attributes?.url),
    comments: [] // Comments would need separate API
  }
}

// Helper: Transform Strapi category to app format
export const transformCategory = (strapiCategory: StrapiCategory) => {
  const { attributes } = strapiCategory
  return {
    id: attributes.slug,
    name: attributes.name,
    nameZh: attributes.nameZh,
    icon: attributes.icon,
    color: attributes.color
  }
}
