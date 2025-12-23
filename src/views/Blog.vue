<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import FeaturedPost from '../components/blog/FeaturedPost.vue'
import { formatChinaDate } from '../data/posts'
import { useBlog } from '../composables/useBlog'

const { t, locale } = useI18n()
const { posts, categories, featuredPost, isLoading } = useBlog()
const searchQuery = ref('')
const selectedCategory = ref('all')

const sidebarPosts = computed(() => posts.value.slice(1, 4))

// Helper to get category name
const getCategoryName = (categoryId: string) => {
  const cat = categories.value.find(c => c.id === categoryId)
  return locale.value === 'zh' ? cat?.nameZh : cat?.name
}

const filteredPosts = computed(() => {
  let result = posts.value.slice(1) // Exclude featured post

  if (selectedCategory.value !== 'all') {
    result = result.filter(post => post.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => {
      const title = locale.value === 'zh' ? post.titleZh : post.title
      const excerpt = locale.value === 'zh' ? post.excerptZh : post.excerpt
      return title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query)
    })
  }

  return result
})

// SEO Meta Tags
useHead({
  title: computed(() => `${t('blog.title')} - Noveris`),
  meta: [
    { name: 'description', content: computed(() => t('blog.subtitle')) },
    { name: 'keywords', content: 'blog, tech articles, AI, Cloud Native, Development, LLM' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: computed(() => `${t('blog.title')} - Noveris`) },
    { property: 'og:description', content: computed(() => t('blog.subtitle')) },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: computed(() => `${t('blog.title')} - Noveris`) },
  ]
})
</script>

<template>
  <DefaultLayout>
    <!-- Header with Search -->
    <section class="blog-header">
      <div class="container">
        <div class="header-content">
          <div class="header-text">
            <h1>{{ t('blog.title') }}</h1>
            <p>{{ t('blog.subtitle') }}</p>
          </div>
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('blog.search')"
              class="search-input"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="featured-section">
      <div class="container">
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ t('blog.loading') || 'Loading...' }}</p>
        </div>
        <div v-else-if="posts.length > 0" class="featured-grid">
          <!-- Large Featured Card -->
          <div v-if="featuredPost" class="featured-main">
            <FeaturedPost :post="featuredPost" />
          </div>

          <!-- Sidebar Posts -->
          <div class="featured-sidebar">
            <RouterLink
              v-for="post in sidebarPosts"
              :key="post.slug"
              :to="`/blog/${post.slug}`"
              class="sidebar-post card-hover"
            >
              <span class="sidebar-tag">{{ getCategoryName(post.category) }}</span>
              <h3 class="sidebar-title">{{ locale === 'zh' ? post.titleZh : post.title }}</h3>
              <div class="sidebar-meta">
                <span>{{ formatChinaDate(post.createdAt, locale) }}</span>
                <span>{{ post.readTime }} {{ t('blog.readTime') }}</span>
              </div>
            </RouterLink>
          </div>
        </div>
        <!-- Don't show empty state on initial load, only when actually no posts exist after loading -->
        <div v-else-if="!isLoading && posts.length === 0" class="empty-state">
          <p>{{ t('blog.noResults') }}</p>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="categories-section">
      <div class="container">
        <div class="categories">
          <button
            :class="['category-btn', { active: selectedCategory === 'all' }]"
            @click="selectedCategory = 'all'"
          >
            {{ t('blog.all') }}
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['category-btn', { active: selectedCategory === category.id }]"
            @click="selectedCategory = category.id"
          >
            <span class="category-icon">{{ category.icon }}</span>
            {{ locale === 'zh' ? category.nameZh : category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Posts Grid -->
    <section class="posts-section">
      <div class="container">
        <div v-if="filteredPosts.length" class="posts-grid">
          <BlogCard
            v-for="post in filteredPosts"
            :key="post.slug"
            :post="post"
            data-aos="fade-up"
          />
        </div>
        <!-- Only show "no results" if user has actively searched or filtered -->
        <div v-else-if="searchQuery.trim() || selectedCategory !== 'all'" class="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <p>{{ t('blog.noResults') }}</p>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.blog-header {
  padding: 3rem 0;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.header-text h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.header-text p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.search-box {
  position: relative;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

/* Featured Section */
.featured-section {
  padding: 2.5rem 0;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
}

.featured-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-post {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-base);
}

.sidebar-post:hover {
  border-color: var(--accent-color);
  background: var(--bg-tertiary);
}

.sidebar-tag {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sidebar-meta {
  display: flex;
  gap: 1rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

/* Categories */
.categories-section {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.category-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.category-icon {
  font-size: 1rem;
}

/* Posts Grid */
.posts-section {
  padding: 2.5rem 0 4rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
  color: var(--text-tertiary);
  text-align: center;
}

.no-results svg {
  opacity: 0.5;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
  color: var(--text-secondary);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  padding: 4rem 0;
  text-align: center;
  color: var(--text-tertiary);
}

/* Responsive */
@media (max-width: 1024px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-sidebar {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .sidebar-post {
    min-width: 280px;
    flex-shrink: 0;
  }

  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    width: 100%;
    min-width: unset;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
