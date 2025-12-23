<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router'
import HomeLayout from '../layouts/HomeLayout.vue'
import { formatChinaDate } from '../data/posts'
import { useBlog } from '../composables/useBlog'

const { t, locale } = useI18n()
const { categories, latestPosts, isLoading } = useBlog()

// Helper to get category name
const getCategoryName = (categoryId: string) => {
  const cat = categories.value.find(c => c.id === categoryId)
  return locale.value === 'zh' ? cat?.nameZh : cat?.name
}

// SEO Meta Tags
useHead({
  title: computed(() => `Noveris - ${t('home.subtitle')}`),
  meta: [
    { name: 'description', content: computed(() => t('home.description')) },
    { name: 'keywords', content: 'AI, Cloud Native, Development, LLM, 人工智能, 云原生, 技术博客' },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: computed(() => `Noveris - ${t('home.subtitle')}`) },
    { property: 'og:description', content: computed(() => t('home.description')) },
    { property: 'og:site_name', content: 'Noveris' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => `Noveris - ${t('home.subtitle')}`) },
    { name: 'twitter:description', content: computed(() => t('home.description')) },
  ]
})
</script>

<template>
  <HomeLayout>
    <div class="home-container">
      <!-- Left Side: Hero -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">Noveris</span>
          </h1>
          <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
          <p class="hero-description">{{ t('home.description') }}</p>
          <div class="hero-actions">
            <RouterLink to="/blog" class="btn btn-primary">
              {{ t('home.viewAll') }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">
              {{ t('nav.about') }}
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- Right Side: Categories + Latest Posts -->
      <section class="content-section">
        <!-- Categories Grid -->
        <div class="categories-area">
          <div class="categories-grid">
            <RouterLink
              v-for="category in categories"
              :key="category.id"
              :to="`/categories/${category.id}`"
              class="category-card card-hover"
              :style="{ '--category-color': category.color }"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ locale === 'zh' ? category.nameZh : category.name }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- Latest Posts -->
        <div class="posts-area">
          <div class="posts-header">
            <h2>{{ t('home.latestPosts') }}</h2>
            <RouterLink to="/blog" class="view-all">
              {{ t('home.viewAll') }} →
            </RouterLink>
          </div>
          <div v-if="isLoading" class="posts-loading">
            <div class="spinner"></div>
          </div>
          <div v-else class="posts-list">
            <RouterLink
              v-for="post in latestPosts"
              :key="post.slug"
              :to="`/blog/${post.slug}`"
              class="post-item"
            >
              <div class="post-meta">
                <span class="post-category tag">{{ getCategoryName(post.category) }}</span>
                <span class="post-date">{{ formatChinaDate(post.createdAt, locale) }}</span>
              </div>
              <h3 class="post-title">{{ locale === 'zh' ? post.titleZh : post.title }}</h3>
            </RouterLink>
            <div v-if="latestPosts.length === 0" class="no-posts">
              {{ t('blog.noResults') }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </HomeLayout>
</template>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  background: linear-gradient(135deg,
    rgba(var(--bg-rgb), 0.95) 0%,
    rgba(var(--bg-rgb), 0.98) 100%
  );
}

/* Left Side: Hero */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: linear-gradient(135deg,
    rgba(13, 148, 136, 0.03) 0%,
    rgba(52, 211, 153, 0.03) 100%
  );
  border-right: 1px solid var(--border-light);
}

.hero-content {
  max-width: 480px;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Right Side: Content */
.content-section {
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  overflow-y: auto;
}

/* Categories */
.categories-area {
  margin-bottom: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-base);
}

.category-card:hover {
  border-color: var(--category-color, var(--accent-color));
  background: var(--bg-tertiary);
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Posts */
.posts-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.posts-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.view-all {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-color);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.view-all:hover {
  opacity: 0.8;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post-item {
  display: block;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-base);
}

.post-item:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-color);
  transform: translateX(4px);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.post-category {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}

.post-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.post-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

/* Loading */
.posts-loading {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-posts {
  padding: 1rem;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .home-container {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .hero-section {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    padding: 2rem;
  }

  .hero-content {
    text-align: center;
    max-width: 100%;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .content-section {
    padding: 2rem;
    overflow-y: visible;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
