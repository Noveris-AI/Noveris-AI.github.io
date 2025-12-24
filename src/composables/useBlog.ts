// Composable for fetching and managing blog data
import { ref, onMounted, computed } from 'vue'
import { categories as staticCategories, posts as staticPosts } from '../data/posts'
import type { Post, Category } from '../data/posts'

// Reactive state (shared across components)
const posts = ref<Post[]>(staticPosts) // Use static posts as default
const categories = ref<Category[]>(staticCategories)
const postsCountByCategory = ref<Record<string, number>>({})
const isLoading = ref(false)
const error = ref<string | null>(null)
const isInitialized = ref(true) // Already initialized with static data

// Calculate posts count by category
const updatePostsCounts = () => {
  const counts: Record<string, number> = {}
  categories.value.forEach(cat => {
    counts[cat.id] = posts.value.filter(p => p.category === cat.id).length
  })
  postsCountByCategory.value = counts
}

// Initialize counts
updatePostsCounts()

// Main composable
export function useBlog() {
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

  // Refresh data (for future CMS integration)
  const refresh = async () => {
    // TODO: Fetch from CMS when needed
    updatePostsCounts()
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

  onMounted(() => {
    // Find post from static data
    const foundPost = staticPosts.find(p => p.slug === slug)
    if (foundPost) {
      post.value = foundPost
    } else {
      error.value = 'Post not found'
    }
    isLoading.value = false
  })

  return {
    post,
    isLoading,
    error,
    refresh: async () => {}
  }
}

// Cleanup function (no-op for static data)
export function cleanupBlog() {
  // No cleanup needed for static data
}
