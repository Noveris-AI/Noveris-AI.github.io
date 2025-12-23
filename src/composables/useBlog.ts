// Composable for fetching and managing blog data from Strapi
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  getPosts,
  getPostBySlug,
  getCategories,
  getPostsCountByCategory,
  transformPost,
  transformCategory,
  startPolling,
  stopPolling,
  onPostsUpdate
} from '../services/strapi'
import type { Post, Category } from '../data/posts'
import { categories as staticCategories } from '../data/posts'

// Reactive state (shared across components)
const posts = ref<Post[]>([])
const categories = ref<Category[]>(staticCategories) // Use static as default
const postsCountByCategory = ref<Record<string, number>>({})
const isLoading = ref(false)
const error = ref<string | null>(null)
const isInitialized = ref(false)

// Fetch all data
const fetchAllData = async () => {
  isLoading.value = true
  error.value = null

  try {
    const [postsResponse, categoriesResponse, countsResponse] = await Promise.all([
      getPosts({ pageSize: 100 }),
      getCategories(),
      getPostsCountByCategory()
    ])

    posts.value = postsResponse.data.map(transformPost)
    // Only update categories if we got data from Strapi
    if (categoriesResponse.data.length > 0) {
      categories.value = categoriesResponse.data.map(transformCategory)
    }
    postsCountByCategory.value = countsResponse
    isInitialized.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch data'
    console.error('Failed to fetch blog data:', err)
  } finally {
    isLoading.value = false
  }
}

// Main composable
export function useBlog() {
  let unsubscribe: (() => void) | null = null

  // Initialize data on first use
  onMounted(() => {
    if (!isInitialized.value) {
      fetchAllData()
    }

    // Start polling for real-time updates
    startPolling(30000) // Check every 30 seconds

    // Subscribe to updates
    unsubscribe = onPostsUpdate(() => {
      fetchAllData()
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  // Computed: Latest posts
  const latestPosts = computed(() => {
    return posts.value.slice(0, 5)
  })

  // Computed: Featured post
  const featuredPost = computed(() => {
    return posts.value[0] || null
  })

  // Get posts by category
  const getPostsByCategory = (categorySlug: string) => {
    if (categorySlug === 'all') return posts.value
    return posts.value.filter(post => post.category === categorySlug)
  }

  // Search posts
  const searchPosts = (query: string) => {
    const q = query.toLowerCase()
    return posts.value.filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.titleZh.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.excerptZh.toLowerCase().includes(q)
    )
  }

  // Get single post by slug
  const getPost = (slug: string) => {
    return posts.value.find(post => post.slug === slug) || null
  }

  // Get category by ID/slug
  const getCategory = (slug: string) => {
    return categories.value.find(cat => cat.id === slug) || null
  }

  // Get posts count for category
  const getCategoryPostsCount = (categorySlug: string) => {
    return postsCountByCategory.value[categorySlug] || 0
  }

  // Refresh data
  const refresh = () => {
    return fetchAllData()
  }

  return {
    // State
    posts,
    categories,
    isLoading,
    error,
    isInitialized,

    // Computed
    latestPosts,
    featuredPost,

    // Methods
    getPostsByCategory,
    searchPosts,
    getPost,
    getCategory,
    getCategoryPostsCount,
    refresh
  }
}

// Composable for single post page
export function usePost(slug: string) {
  const post = ref<Post | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  let unsubscribe: (() => void) | null = null

  const fetchPost = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await getPostBySlug(slug)
      const postData = response.data[0]
      if (postData) {
        post.value = transformPost(postData)
      } else {
        error.value = 'Post not found'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch post'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchPost()

    // Subscribe to updates for this post
    unsubscribe = onPostsUpdate(() => {
      fetchPost()
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    post,
    isLoading,
    error,
    refresh: fetchPost
  }
}

// Stop polling when app unmounts (call in App.vue)
export function cleanupBlog() {
  stopPolling()
}
