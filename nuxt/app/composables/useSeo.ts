interface UseSeoOptions {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function useSeo(options: UseSeoOptions = {}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { locale } = useI18n()

  const siteUrl = config.public.siteUrl || 'https://noveris-ai.github.io'
  const canonicalUrl = computed(() => `${siteUrl}${route.path}`)

  // Set SEO meta tags
  const setSeoMeta = (opts: UseSeoOptions) => {
    const title = opts.title || 'Noveris Blog'
    const description = opts.description || 'Noveris AI Tech Blog'
    const image = opts.image ? `${siteUrl}${opts.image}` : `${siteUrl}/og-image.jpg`

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogUrl: canonicalUrl.value,
      ogType: opts.type || 'website',
      ogLocale: locale.value === 'zh' ? 'zh_CN' : 'en_US',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image
    })

    // Article-specific meta
    if (opts.type === 'article') {
      useSeoMeta({
        articlePublishedTime: opts.publishedTime,
        articleModifiedTime: opts.modifiedTime,
        articleAuthor: opts.author,
        articleSection: opts.section,
        articleTag: opts.tags?.join(', ')
      })
    }

    // Canonical URL
    useHead({
      link: [
        { rel: 'canonical', href: canonicalUrl.value }
      ]
    })
  }

  // Generate JSON-LD for articles
  const generateArticleJsonLd = (article: {
    title: string
    description: string
    image?: string
    publishedAt: string
    updatedAt?: string
    author: string
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: article.image ? `${siteUrl}${article.image}` : undefined,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      author: {
        '@type': 'Person',
        name: article.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Noveris AI',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.svg`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl.value
      }
    }
  }

  // Generate breadcrumb JSON-LD
  const generateBreadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.url}`
      }))
    }
  }

  return {
    setSeoMeta,
    generateArticleJsonLd,
    generateBreadcrumbJsonLd,
    canonicalUrl,
    siteUrl
  }
}
