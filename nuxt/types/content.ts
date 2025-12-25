// Content type definitions for Noveris Blog

// Localized string type
export interface LocalizedString {
  en: string
  zh: string
}

// Cover image type
export interface CoverImage {
  src: string
  alt: string
  width?: number
  height?: number
}

// Series information
export interface SeriesInfo {
  name: string
  slug: string
  order: number
}

// i18n reference to other language version
export interface I18nRef {
  en?: string
  zh?: string
}

// Author type
export interface Author {
  id: string
  name: LocalizedString
  avatar: string
  bio: LocalizedString
  social: {
    github?: string
    twitter?: string
    email?: string
    linkedin?: string
    website?: string
  }
}

// Category type
export interface Category {
  id: string
  name: LocalizedString
  slug: string
  description?: LocalizedString
  icon?: string
  color?: string
  order?: number
}

// Tag type
export interface Tag {
  id: string
  name: LocalizedString
  slug: string
  description?: LocalizedString
  color?: string
}

// Blog post frontmatter
export interface BlogPost {
  title: string
  description: string
  slug: string
  category: string
  tags: string[]
  series?: SeriesInfo
  author: string
  publishedAt: string
  updatedAt?: string
  cover?: CoverImage
  readTime: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  status: 'draft' | 'published' | 'archived'
  featured?: boolean
  i18n?: I18nRef
}

// Portfolio project type
export interface Project {
  id: string
  title: LocalizedString
  description: LocalizedString
  type: 'web-application' | 'mobile-app' | 'library' | 'tool' | 'other'
  status: 'active' | 'completed' | 'in-progress' | 'archived'
  technologies: string[]
  cover?: CoverImage
  links?: {
    live?: string
    github?: string
    demo?: string
    docs?: string
  }
  featured?: boolean
  order?: number
  startDate?: string
  endDate?: string
}

// Case study type
export interface CaseStudy {
  id: string
  title: LocalizedString
  description: LocalizedString
  client?: string
  industry?: string
  duration?: string
  technologies: string[]
  cover?: CoverImage
  challenge?: LocalizedString
  solution?: LocalizedString
  results?: LocalizedString
  testimonial?: {
    quote: LocalizedString
    author: string
    role: string
  }
  featured?: boolean
  order?: number
}

// FAQ item type
export interface FaqItem {
  id: string
  question: LocalizedString
  answer: LocalizedString
  category?: string
  order?: number
}

// Glossary term type
export interface GlossaryTerm {
  id: string
  term: LocalizedString
  definition: LocalizedString
  category?: string
  relatedTerms?: string[]
  seeAlso?: string[]
}

// Code snippet type
export interface CodeSnippet {
  id: string
  title: LocalizedString
  description: LocalizedString
  language: string
  code: string
  tags?: string[]
  category?: string
}

// Site settings type
export interface SiteSettings {
  title: LocalizedString
  description: LocalizedString
  logo: string
  favicon: string
  social: {
    github?: string
    twitter?: string
    email?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  comments: {
    enabled: boolean
    provider: 'giscus'
  }
  search: {
    enabled: boolean
    provider: 'meilisearch'
  }
}

// Navigation item type
export interface NavItem {
  label: LocalizedString
  to: string
  icon?: string
  children?: NavItem[]
  external?: boolean
}

// Navigation configuration
export interface Navigation {
  main: NavItem[]
  footer: {
    columns: {
      title: LocalizedString
      links: NavItem[]
    }[]
  }
}
