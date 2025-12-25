import type { BlogPost, Category, Tag, Author } from '~/types/content'

interface UseBlogOptions {
  locale?: string
}

export function useBlog(options: UseBlogOptions = {}) {
  const { locale: currentLocale } = useI18n()
  const locale = computed(() => options.locale || currentLocale.value)

  // Get content path based on locale
  const contentPath = computed(() =>
    locale.value === 'zh' ? '/blog/zh' : '/blog/en'
  )

  // Fetch all published posts
  const fetchPosts = async (limit?: number) => {
    let query = queryContent(contentPath.value)
      .where({ status: 'published' })
      .sort({ publishedAt: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    return await query.find()
  }

  // Fetch featured posts
  const fetchFeaturedPosts = async (limit = 3) => {
    return await queryContent(contentPath.value)
      .where({ status: 'published', featured: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .find()
  }

  // Fetch posts by category
  const fetchPostsByCategory = async (category: string, limit?: number) => {
    let query = queryContent(contentPath.value)
      .where({ status: 'published', category })
      .sort({ publishedAt: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    return await query.find()
  }

  // Fetch posts by tag
  const fetchPostsByTag = async (tag: string, limit?: number) => {
    let query = queryContent(contentPath.value)
      .where({ status: 'published', tags: { $contains: tag } })
      .sort({ publishedAt: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    return await query.find()
  }

  // Fetch single post by slug
  const fetchPost = async (slug: string) => {
    return await queryContent(`${contentPath.value}/${slug}`).findOne()
  }

  // Fetch all categories
  const fetchCategories = async () => {
    return await queryContent('categories').find()
  }

  // Fetch all tags
  const fetchTags = async () => {
    return await queryContent('tags').find()
  }

  // Fetch all authors
  const fetchAuthors = async () => {
    return await queryContent('authors').find()
  }

  // Fetch author by ID
  const fetchAuthor = async (id: string) => {
    return await queryContent(`authors/${id}`).findOne()
  }

  // Get unique categories from posts
  const getUniqueCategories = async () => {
    const posts = await fetchPosts()
    const categories = new Set(posts.map((p) => p.category).filter(Boolean))
    return Array.from(categories)
  }

  // Get unique tags from posts
  const getUniqueTags = async () => {
    const posts = await fetchPosts()
    const tags = new Set(posts.flatMap((p) => p.tags || []))
    return Array.from(tags)
  }

  // Get related posts
  const fetchRelatedPosts = async (
    currentSlug: string,
    category: string,
    limit = 3
  ) => {
    return await queryContent(contentPath.value)
      .where({
        slug: { $ne: currentSlug },
        category,
        status: 'published'
      })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .find()
  }

  // Get series posts
  const fetchSeriesPosts = async (seriesSlug: string) => {
    return await queryContent(contentPath.value)
      .where({
        'series.slug': seriesSlug,
        status: 'published'
      })
      .sort({ 'series.order': 1 })
      .find()
  }

  return {
    locale,
    contentPath,
    fetchPosts,
    fetchFeaturedPosts,
    fetchPostsByCategory,
    fetchPostsByTag,
    fetchPost,
    fetchCategories,
    fetchTags,
    fetchAuthors,
    fetchAuthor,
    getUniqueCategories,
    getUniqueTags,
    fetchRelatedPosts,
    fetchSeriesPosts
  }
}
