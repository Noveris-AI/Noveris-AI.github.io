<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { posts } from '../data/posts'

const route = useRoute()
const { locale, t } = useI18n()

const post = computed(() => {
  return posts.find(p => p.slug === route.params.slug)
})

const title = computed(() => {
  if (!post.value) return ''
  return locale.value === 'zh' ? post.value.titleZh : post.value.title
})

const content = computed(() => {
  if (!post.value) return ''
  const rawContent = locale.value === 'zh' ? post.value.contentZh : post.value.content
  return marked(rawContent)
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.date).toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <DefaultLayout>
    <article v-if="post" class="blog-post">
      <header class="post-header">
        <div class="container">
          <RouterLink to="/blog" class="back-link">← {{ t('blog.title') }}</RouterLink>
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
          <div class="content" v-html="content"></div>
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
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 1.75rem;
  }

  .content {
    font-size: 1rem;
  }
}
</style>
