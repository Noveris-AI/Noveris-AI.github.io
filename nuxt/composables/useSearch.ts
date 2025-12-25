import { MeiliSearch } from 'meilisearch'
import type { SearchResponse } from 'meilisearch'

interface SearchResult {
  slug: string
  title: string
  description: string
  category?: string
  tags?: string[]
  publishedAt?: string
  readTime?: number
  cover?: {
    src: string
    alt: string
  }
}

interface UseSearchOptions {
  limit?: number
  filters?: string
}

export function useSearch() {
  const config = useRuntimeConfig()
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const results = ref<SearchResult[]>([])
  const totalHits = ref(0)

  // Initialize Meilisearch client (only if configured)
  const client = computed(() => {
    if (!config.public.meilisearchHost || !config.public.meilisearchSearchKey) {
      return null
    }
    return new MeiliSearch({
      host: config.public.meilisearchHost,
      apiKey: config.public.meilisearchSearchKey
    })
  })

  // Check if search is available
  const isSearchAvailable = computed(() => client.value !== null)

  // Debounced search function
  const search = useDebounceFn(async (query: string, options: UseSearchOptions = {}) => {
    if (!client.value) {
      error.value = new Error('Search is not configured')
      return
    }

    if (!query.trim()) {
      results.value = []
      totalHits.value = 0
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: SearchResponse<SearchResult> = await client.value
        .index('posts')
        .search(query, {
          limit: options.limit || 10,
          filter: options.filters,
          attributesToHighlight: ['title', 'description'],
          highlightPreTag: '<mark>',
          highlightPostTag: '</mark>'
        })

      results.value = response.hits
      totalHits.value = response.estimatedTotalHits || response.hits.length
    } catch (e) {
      error.value = e as Error
      console.error('Search error:', e)
    } finally {
      isLoading.value = false
    }
  }, 300)

  // Clear search results
  const clearSearch = () => {
    results.value = []
    totalHits.value = 0
    error.value = null
  }

  return {
    search,
    clearSearch,
    results,
    totalHits,
    isLoading,
    error,
    isSearchAvailable
  }
}
