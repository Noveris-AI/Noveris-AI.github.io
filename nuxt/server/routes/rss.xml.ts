import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://noveris-ai.github.io'

  // Fetch all published posts from both languages
  const zhPosts = await serverQueryContent(event, 'blog/zh')
    .where({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(20)
    .find()

  const enPosts = await serverQueryContent(event, 'blog/en')
    .where({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(20)
    .find()

  // Combine and sort by date
  const allPosts = [...zhPosts, ...enPosts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0)
    const dateB = new Date(b.publishedAt || 0)
    return dateB.getTime() - dateA.getTime()
  }).slice(0, 20)

  // Generate RSS items
  const items = allPosts.map((post) => {
    const isEnglish = post._path?.includes('/en/')
    const postUrl = isEnglish
      ? `${siteUrl}/en/blog/${post.slug}`
      : `${siteUrl}/blog/${post.slug}`

    const pubDate = new Date(post.publishedAt || new Date()).toUTCString()

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.category ? `<category>${post.category}</category>` : ''}
      ${post.tags?.map((tag: string) => `<category>${tag}</category>`).join('') || ''}
    </item>`
  })

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Noveris Blog</title>
    <link>${siteUrl}</link>
    <description>Noveris AI Tech Blog - AI, Web Development, and Technology Insights</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.svg</url>
      <title>Noveris Blog</title>
      <link>${siteUrl}</link>
    </image>
${items.join('')}
  </channel>
</rss>`

  setResponseHeader(event, 'content-type', 'application/xml')
  return rss
})
