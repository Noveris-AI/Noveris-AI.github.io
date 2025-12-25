import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://noveris-ai.github.io'

  // Fetch all published posts
  const zhPosts = await serverQueryContent(event, 'blog/zh')
    .where({ status: 'published' })
    .find()

  const enPosts = await serverQueryContent(event, 'blog/en')
    .where({ status: 'published' })
    .find()

  // Generate sitemap XML
  const urls: string[] = []

  // Static pages
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/blog', priority: '0.9', changefreq: 'daily' },
    { loc: '/en', priority: '0.8', changefreq: 'weekly' },
    { loc: '/en/blog', priority: '0.8', changefreq: 'daily' },
    { loc: '/portfolio', priority: '0.7', changefreq: 'monthly' },
    { loc: '/knowledge', priority: '0.7', changefreq: 'monthly' },
    { loc: '/about', priority: '0.6', changefreq: 'monthly' }
  ]

  for (const page of staticPages) {
    urls.push(`
    <url>
      <loc>${siteUrl}${page.loc}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`)
  }

  // Chinese blog posts
  for (const post of zhPosts) {
    const lastmod = post.updatedAt || post.publishedAt || new Date().toISOString()
    urls.push(`
    <url>
      <loc>${siteUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`)
  }

  // English blog posts
  for (const post of enPosts) {
    const lastmod = post.updatedAt || post.publishedAt || new Date().toISOString()
    urls.push(`
    <url>
      <loc>${siteUrl}/en/blog/${post.slug}</loc>
      <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('')}
</urlset>`

  setResponseHeader(event, 'content-type', 'application/xml')
  return sitemap
})
