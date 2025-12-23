<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import type { Post } from '../../data/posts'
import { categories, formatChinaDate } from '../../data/posts'

defineProps<{
  post: Post
}>()

const { locale, t } = useI18n()

// Helper to get category name
const getCategoryName = (categoryId: string) => {
  const cat = categories.find(c => c.id === categoryId)
  return locale.value === 'zh' ? cat?.nameZh : cat?.name
}
</script>

<template>
  <RouterLink :to="`/blog/${post.slug}`" class="featured-post card-hover">
    <div class="featured-content">
      <div class="featured-meta">
        <span class="featured-tag">{{ getCategoryName(post.category) }}</span>
        <span class="featured-date">{{ formatChinaDate(post.createdAt, locale) }}</span>
        <span class="featured-read-time">{{ post.readTime }} {{ t('blog.readTime') }}</span>
      </div>
      <h2 class="featured-title">{{ locale === 'zh' ? post.titleZh : post.title }}</h2>
      <p class="featured-excerpt">{{ locale === 'zh' ? post.excerptZh : post.excerpt }}</p>
      <span class="featured-link">
        {{ t('home.readMore') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    </div>
    <div class="featured-visual">
      <div class="featured-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.featured-post {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg,
    rgba(13, 148, 136, 0.08) 0%,
    rgba(52, 211, 153, 0.05) 100%
  );
  border: 1px solid rgba(13, 148, 136, 0.2);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--transition-base);
}

.featured-post:hover {
  border-color: var(--accent-color);
  box-shadow: var(--shadow-lg);
}

.featured-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.featured-tag {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background: var(--accent-color);
  color: white;
  border-radius: var(--radius-full);
}

.featured-date,
.featured-read-time {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.featured-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
}

.featured-excerpt {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-top: 0.5rem;
}

.featured-link svg {
  transition: transform var(--transition-fast);
}

.featured-post:hover .featured-link svg {
  transform: translateX(4px);
}

.featured-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: rgba(13, 148, 136, 0.1);
  border-radius: var(--radius-lg);
}

.featured-icon {
  color: var(--accent-color);
}

@media (max-width: 640px) {
  .featured-post {
    grid-template-columns: 1fr;
  }

  .featured-visual {
    display: none;
  }
}
</style>
