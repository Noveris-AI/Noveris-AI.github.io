<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Post } from '../../data/posts'
import { formatChinaDate } from '../../data/posts'

const props = defineProps<{
  post: Post
}>()

const { locale, t } = useI18n()

const title = computed(() => {
  return locale.value === 'zh' ? props.post.titleZh : props.post.title
})

const excerpt = computed(() => {
  return locale.value === 'zh' ? props.post.excerptZh : props.post.excerpt
})

const formattedDate = computed(() => {
  return formatChinaDate(props.post.createdAt, locale.value)
})
</script>

<template>
  <RouterLink :to="`/blog/${post.slug}`" class="blog-card">
    <div class="card-image" :style="{ backgroundColor: post.color || '#0d9488' }">
      <span class="card-icon">{{ post.icon || '📝' }}</span>
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="category">{{ post.category }}</span>
        <span class="date">{{ formattedDate }}</span>
      </div>
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-excerpt">{{ excerpt }}</p>
      <div class="card-footer">
        <span class="read-time">{{ post.readTime }} {{ t('blog.readTime') }}</span>
        <span class="read-more">{{ t('home.readMore') }} →</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.blog-card {
  display: block;
  background: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  text-decoration: none;
  transition: all 0.3s;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-color);
}

.card-image {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  font-size: 3rem;
}

.card-content {
  padding: 1.5rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.category {
  background: var(--accent-bg);
  color: var(--accent-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.date {
  color: var(--text-secondary);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.card-excerpt {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.read-time {
  color: var(--text-secondary);
}

.read-more {
  color: var(--accent-color);
  font-weight: 600;
}
</style>
