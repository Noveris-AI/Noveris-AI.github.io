#!/usr/bin/env node
/**
 * CMS 内容同步脚本
 * 自动将 content/ 目录的 Markdown 文件转换为 src/data/posts.ts
 * 确保 CMS 编辑的内容能被应用使用
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// YAML frontmatter 解析
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---/)
  if (!match) return { data: {}, content: '' }

  const yaml = match[1]
  const body = content.slice(match[0].length).trim()

  const data = {}
  const lines = yaml.split('\n')
  let currentKey = null
  let currentValue = ''
  let inMultiline = false

  for (let line of lines) {
    // 处理多行值 (|-  或 |)
    if (line.match(/^(\w+):\s*\|-?\s*$/)) {
      if (currentKey && inMultiline) {
        data[currentKey] = currentValue.trim()
      }
      currentKey = line.match(/^(\w+):/)[1]
      currentValue = ''
      inMultiline = true
      continue
    }

    if (inMultiline) {
      // 如果是新的键值对，结束多行模式
      if (line.match(/^(\w+):\s+/)) {
        data[currentKey] = currentValue.trim()
        inMultiline = false
        currentKey = null
        currentValue = ''
        // 继续处理这一行
      } else {
        currentValue += (currentValue ? '\n' : '') + line
        continue
      }
    }

    // 普通键值对
    const kvMatch = line.match(/^(\w+):\s+(.+)$/)
    if (kvMatch) {
      const key = kvMatch[1]
      let value = kvMatch[2].trim()

      // 移除引号
      if ((value.startsWith("'") && value.endsWith("'")) ||
          (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1)
      }

      data[key] = value
    }
  }

  // 保存最后一个多行值
  if (currentKey && inMultiline) {
    data[currentKey] = currentValue.trim()
  }

  return { data, content: body }
}

// 读取所有分类
function loadCategories() {
  const categoriesDir = join(__dirname, '../content/categories')
  if (!existsSync(categoriesDir)) {
    console.warn('⚠️  Categories directory not found, using defaults')
    return []
  }

  const files = readdirSync(categoriesDir)
  const categories = []

  for (const file of files) {
    if (extname(file) !== '.json') continue

    try {
      const content = readFileSync(join(categoriesDir, file), 'utf-8')
      const category = JSON.parse(content)
      categories.push({
        id: category.slug,
        name: category.name,
        nameZh: category.nameZh,
        icon: category.icon,
        color: category.color
      })
    } catch (error) {
      console.error(`❌ Failed to parse category ${file}:`, error.message)
    }
  }

  return categories
}

// 读取所有文章
function loadPosts() {
  const postsDir = join(__dirname, '../content/posts')
  if (!existsSync(postsDir)) {
    console.warn('⚠️  Posts directory not found')
    return []
  }

  const files = readdirSync(postsDir)
  const posts = []

  for (const file of files) {
    if (extname(file) !== '.md') continue

    try {
      const content = readFileSync(join(postsDir, file), 'utf-8')
      const { data, content: body } = parseFrontmatter(content)

      // 验证必需字段
      if (!data.title || !data.titleZh) {
        console.error(`❌ Invalid post ${file}: missing title or titleZh`)
        continue
      }

      // 从文件名提取 slug (如果 frontmatter 中的 slug 无效)
      const fileSlug = basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '')

      const post = {
        slug: data.slug && data.slug !== data.category ? data.slug : fileSlug,
        title: data.title,
        titleZh: data.titleZh,
        excerpt: data.excerpt || data.content?.substring(0, 150) || '',
        excerptZh: data.excerptZh || data.contentZh?.substring(0, 150) || '',
        content: data.content || body,
        contentZh: data.contentZh || body,
        category: data.category || 'development',
        createdAt: data.publishedAt || new Date().toISOString(),
        readTime: parseInt(data.readTime) || 5,
        cover: data.cover || '',
        likes: parseInt(data.likes) || 0,
        comments: []
      }

      posts.push(post)
      console.log(`✅ Loaded post: ${post.title}`)
    } catch (error) {
      console.error(`❌ Failed to parse post ${file}:`, error.message)
    }
  }

  // 按发布日期降序排序
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return posts
}

// 生成 TypeScript 文件
function generatePostsFile(categories, posts) {
  const content = `// 自动生成的文章数据
// 由 scripts/sync-cms-content.mjs 生成
// 最后更新: ${new Date().toISOString()}

export interface Post {
  id?: number
  slug: string
  title: string
  titleZh: string
  excerpt: string
  excerptZh: string
  content: string
  contentZh: string
  category: string
  createdAt: string  // ISO timestamp
  updatedAt?: string // ISO timestamp
  readTime: number
  icon?: string
  color?: string
  likes?: number
  cover?: string
  comments?: Comment[]
}

export interface Comment {
  id: string
  author: string
  email: string
  content: string
  createdAt: string
  likes: number
  replies?: Comment[]
}

export interface Category {
  id: string
  name: string
  nameZh: string
  icon: string
  color: string
}

export const categories: Category[] = ${JSON.stringify(categories, null, 2)}

export const posts: Post[] = ${JSON.stringify(posts, null, 2)}

// Utility: Format date in China timezone (UTC+8)
export const formatChinaDate = (isoString: string, locale: string = 'zh'): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Utility: Format datetime in China timezone
export const formatChinaDateTime = (isoString: string, locale: string = 'zh'): string => {
  const date = new Date(isoString)
  return date.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Utility: Get relative time in China timezone
export const getRelativeTime = (isoString: string, locale: string = 'zh'): string => {
  const now = new Date()
  const date = new Date(isoString)
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (locale === 'zh') {
    if (diffSec < 60) return '刚刚'
    if (diffMin < 60) return \`\${diffMin} 分钟前\`
    if (diffHour < 24) return \`\${diffHour} 小时前\`
    if (diffDay < 7) return \`\${diffDay} 天前\`
    if (diffWeek < 4) return \`\${diffWeek} 周前\`
    if (diffMonth < 12) return \`\${diffMonth} 个月前\`
    return \`\${diffYear} 年前\`
  } else {
    if (diffSec < 60) return 'just now'
    if (diffMin < 60) return \`\${diffMin} minute\${diffMin > 1 ? 's' : ''} ago\`
    if (diffHour < 24) return \`\${diffHour} hour\${diffHour > 1 ? 's' : ''} ago\`
    if (diffDay < 7) return \`\${diffDay} day\${diffDay > 1 ? 's' : ''} ago\`
    if (diffWeek < 4) return \`\${diffWeek} week\${diffWeek > 1 ? 's' : ''} ago\`
    if (diffMonth < 12) return \`\${diffMonth} month\${diffMonth > 1 ? 's' : ''} ago\`
    return \`\${diffYear} year\${diffYear > 1 ? 's' : ''} ago\`
  }
}
`

  const outputPath = join(__dirname, '../src/data/posts.ts')
  writeFileSync(outputPath, content, 'utf-8')
  console.log(`\n✅ Generated ${outputPath}`)
  console.log(`   - ${categories.length} categories`)
  console.log(`   - ${posts.length} posts`)
}

// 主函数
function main() {
  console.log('🔄 Syncing CMS content...\n')

  try {
    const categories = loadCategories()
    const posts = loadPosts()

    if (posts.length === 0) {
      console.warn('\n⚠️  No posts found in content/posts/')
      console.log('   Using existing data or defaults')
      return
    }

    generatePostsFile(categories, posts)

    console.log('\n✨ Content sync completed successfully!')
  } catch (error) {
    console.error('\n❌ Content sync failed:', error)
    process.exit(1)
  }
}

main()
