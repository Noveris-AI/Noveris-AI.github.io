<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { marked } from 'marked'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { formatChinaDate } from '../data/posts'
import { useBlog } from '../composables/useBlog'
import { useTranslation, isChinese } from '../composables/useTranslation'
import Comments from '../components/blog/Comments.vue'
import Appreciation from '../components/blog/Appreciation.vue'

const route = useRoute()
const { locale, t } = useI18n()
const { getPost } = useBlog()
const { isTranslating, translateMarkdown } = useTranslation()

const translatedContent = ref<string | null>(null)
const showTranslation = ref(false)
const hasTranslationAvailable = ref(false)

const post = computed(() => {
  return getPost(route.params.slug as string)
})

const title = computed(() => {
  if (!post.value) return ''
  // If showing translation and we have translated title, use it
  if (showTranslation.value && translatedTitle.value) {
    return translatedTitle.value
  }
  return locale.value === 'zh' ? post.value.titleZh : post.value.title
})

const translatedTitle = ref<string | null>(null)

// SEO Meta Tags - Dynamic based on post
useHead({
  title: computed(() => post.value ? `${locale.value === 'zh' ? post.value.titleZh : post.value.title} - Noveris` : 'Noveris'),
  meta: [
    { name: 'description', content: computed(() => post.value ? (locale.value === 'zh' ? post.value.excerptZh : post.value.excerpt) : '') },
    { name: 'keywords', content: computed(() => post.value ? `${post.value.category}, blog, article` : '') },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: computed(() => post.value ? `${locale.value === 'zh' ? post.value.titleZh : post.value.title}` : '') },
    { property: 'og:description', content: computed(() => post.value ? (locale.value === 'zh' ? post.value.excerptZh : post.value.excerpt) : '') },
    { property: 'article:published_time', content: computed(() => post.value?.createdAt || '') },
    { property: 'article:author', content: 'Liu Yaojie (Passion)' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => post.value ? `${locale.value === 'zh' ? post.value.titleZh : post.value.title}` : '') },
    { name: 'twitter:description', content: computed(() => post.value ? (locale.value === 'zh' ? post.value.excerptZh : post.value.excerpt) : '') },
  ]
})

// Content to display
const content = computed(() => {
  if (!post.value) return ''

  let contentToRender: string

  if (showTranslation.value && translatedContent.value) {
    contentToRender = translatedContent.value
  } else if (locale.value === 'zh') {
    contentToRender = post.value.contentZh || post.value.content
  } else {
    // English - check if we have English content or need translation
    contentToRender = post.value.content
    // If content is same as Chinese (meaning no English version), show Chinese
    if (post.value.content === post.value.contentZh || !post.value.content) {
      contentToRender = post.value.contentZh
    }
  }

  return marked(contentToRender)
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  return formatChinaDate(post.value.createdAt, locale.value)
})

// Check if translation is available
onMounted(() => {
  checkTranslationAvailable()
})

watch(locale, () => {
  // Reset translation state when language changes
  showTranslation.value = false
  translatedContent.value = null
  translatedTitle.value = null
  checkTranslationAvailable()
})

const checkTranslationAvailable = () => {
  if (!post.value) return

  if (locale.value === 'en') {
    // Check if content is primarily Chinese
    const contentToCheck = post.value.contentZh || post.value.content
    hasTranslationAvailable.value = isChinese(contentToCheck)
  } else {
    hasTranslationAvailable.value = false
  }
}

const handleTranslate = async () => {
  if (!post.value || isTranslating.value) return

  showTranslation.value = true

  // Check cache first
  const cacheKey = `translated_${post.value.slug}_${locale.value}`
  const cached = localStorage.getItem(cacheKey)

  if (cached) {
    const { title, content } = JSON.parse(cached)
    translatedTitle.value = title
    translatedContent.value = content
    return
  }

  // Translate content
  const sourceContent = post.value.contentZh || post.value.content
  const sourceTitle = post.value.titleZh || post.value.title

  const [translatedTitleResult, translatedContentResult] = await Promise.all([
    translateMarkdown(sourceTitle, 'zh-CN', 'en'),
    translateMarkdown(sourceContent, 'zh-CN', 'en')
  ])

  translatedTitle.value = translatedTitleResult
  translatedContent.value = translatedContentResult

  // Cache the translation
  localStorage.setItem(cacheKey, JSON.stringify({
    title: translatedTitleResult,
    content: translatedContentResult
  }))
}

const showOriginal = () => {
  showTranslation.value = false
}

// Handle adding comments (in a real app, this would call an API)
const handleAddComment = (comment: { author: string; email: string; content: string }) => {
  console.log('New comment:', comment)
  // In a real app, this would:
  // 1. Send the comment to an API
  // 2. Update the local state with the new comment
  // 3. Show a success notification
}
</script>

<template>
  <DefaultLayout>
    <article v-if="post" class="blog-post">
      <header class="post-header">
        <div class="container">
          <RouterLink to="/blog" class="back-link">← {{ t('blog.title') }}</RouterLink>

          <!-- Translation Banner -->
          <div v-if="hasTranslationAvailable && !showTranslation" class="translation-banner">
            <span class="banner-icon">🌐</span>
            <span class="banner-text">
              {{ locale === 'en' ? 'This article is written in Chinese.' : 'This article is written in English.' }}
            </span>
            <button
              class="translate-btn"
              @click="handleTranslate"
              :disabled="isTranslating"
            >
              {{ isTranslating ? 'Translating...' : 'Translate to English' }}
            </button>
          </div>

          <div v-if="showTranslation" class="translation-banner translated">
            <span class="banner-icon">✓</span>
            <span class="banner-text">
              {{ locale === 'en' ? 'Auto-translated from Chinese' : 'Auto-translated' }}
            </span>
            <button class="translate-btn secondary" @click="showOriginal">
              Show Original
            </button>
          </div>

          <div class="post-meta">
            <span class="category">{{ post.category }}</span>
            <span class="date">{{ formattedDate }}</span>
            <span class="read-time">{{ post.readTime }} {{ t('blog.readTime') }}</span>
          </div>
          <h1>{{ title }}</h1>
        </div>
      </header>

      <div class="post-content">
        <div class="container">
          <div v-if="isTranslating" class="translating-overlay">
            <div class="spinner"></div>
            <p>Translating content...</p>
          </div>
          <div class="content" v-html="content"></div>

          <!-- Appreciation -->
          <Appreciation :post-slug="post.slug" />

          <!-- Comments -->
          <Comments
            :comments="post.comments || []"
            :post-slug="post.slug"
            @add-comment="handleAddComment"
          />
        </div>
      </div>
    </article>

    <div v-else class="not-found">
      <div class="container">
        <h1>Post not found</h1>
        <RouterLink to="/blog" class="btn btn-primary">Back to Blog</RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.blog-post {
  padding-bottom: 4rem;
}

.post-header {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-link {
  display: inline-block;
  color: var(--accent-color);
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.translation-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background: rgba(13, 148, 136, 0.1);
  border: 1px solid rgba(13, 148, 136, 0.2);
  border-radius: 10px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.translation-banner.translated {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.banner-icon {
  font-size: 1.25rem;
}

.banner-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.translate-btn {
  padding: 0.5rem 1rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.translate-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
}

.translate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.translate-btn.secondary {
  background: transparent;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
}

.translate-btn.secondary:hover {
  background: var(--accent-color);
  color: white;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.category {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.post-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.post-content {
  padding: 3rem 0;
  position: relative;
}

.translating-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
}

.content :deep(h3) {
  font-size: 1.375rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
}

.content :deep(pre) {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.content :deep(code) {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
}

.content :deep(a) {
  color: var(--accent-color);
  text-decoration: underline;
}

.content :deep(ul),
.content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content :deep(li) {
  margin-bottom: 0.5rem;
}

.content :deep(blockquote) {
  border-left: 4px solid var(--accent-color);
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  font-style: italic;
}

.content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.not-found {
  padding: 6rem 0;
  text-align: center;
}

.not-found h1 {
  margin-bottom: 2rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
}

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 1.75rem;
  }

  .content {
    font-size: 1rem;
  }

  .translation-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .translate-btn {
    width: 100%;
  }
}
</style>
