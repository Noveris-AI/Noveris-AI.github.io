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
  cover?: string     // Cover image URL from Strapi
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

export const categories: Category[] = [
  { id: 'ai', name: 'Artificial Intelligence', nameZh: '人工智能', icon: '🤖', color: '#0d9488' },
  { id: 'cloud-native', name: 'Cloud Native', nameZh: '云原生', icon: '☁️', color: '#0ea5e9' },
  { id: 'development', name: 'Development', nameZh: '开发', icon: '💻', color: '#8b5cf6' },
  { id: 'llm', name: 'Large Language Models', nameZh: '大语言模型', icon: '🧠', color: '#f59e0b' }
]

// Empty posts array - no mock data
export const posts: Post[] = []

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
    if (diffMin < 60) return `${diffMin} 分钟前`
    if (diffHour < 24) return `${diffHour} 小时前`
    if (diffDay < 7) return `${diffDay} 天前`
    if (diffWeek < 4) return `${diffWeek} 周前`
    if (diffMonth < 12) return `${diffMonth} 个月前`
    return `${diffYear} 年前`
  } else {
    if (diffSec < 60) return 'just now'
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
    if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`
    if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`
    return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`
  }
}

// Utility: Get current China time as ISO string
export const getChinaTimeNow = (): string => {
  return new Date().toISOString()
}
