<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import { categories, posts } from '../data/posts'

const { t, locale } = useI18n()
const selectedCategory = ref('all')

const getCategoryPostCount = (categoryId: string) => {
  return posts.filter(p => p.category === categoryId).length
}

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'all') {
    return posts
  }
  return posts.filter(post => post.category === selectedCategory.value)
})

const currentCategory = computed(() => {
  if (selectedCategory.value === 'all') return null
  return categories.find(c => c.id === selectedCategory.value)
})

// SEO Meta Tags
useHead({
  title: computed(() => `${t('categories.title')} - Noveris`),
  meta: [
    { name: 'description', content: computed(() => t('categories.subtitle')) },
    { name: 'keywords', content: 'categories, AI, Cloud Native, Development, LLM, 分类' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: computed(() => `${t('categories.title')} - Noveris`) },
    { property: 'og:description', content: computed(() => t('categories.subtitle')) },
    { name: 'twitter:card', content: 'summary' },
  ]
})
</script>

<template>
  <DefaultLayout>
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <h1>{{ t('categories.title') }}</h1>
        <p>{{ t('categories.subtitle') }}</p>
      </div>
    </section>

    <!-- Category Filter Tags -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-tags">
          <button
            :class="['filter-tag', { active: selectedCategory === 'all' }]"
            @click="selectedCategory = 'all'"
          >
            {{ t('blog.all') }}
            <span class="tag-count">{{ posts.length }}</span>
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['filter-tag', { active: selectedCategory === category.id }]"
            :style="{ '--category-color': category.color }"
            @click="selectedCategory = category.id"
          >
            <span class="tag-icon">{{ category.icon }}</span>
            {{ locale === 'zh' ? category.nameZh : category.name }}
            <span class="tag-count">{{ getCategoryPostCount(category.id) }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Current Category Info -->
    <Transition name="fade" mode="out-in">
      <section v-if="currentCategory" class="category-info">
        <div class="container">
          <div class="info-card" :style="{ '--category-color': currentCategory.color }">
            <span class="info-icon">{{ currentCategory.icon }}</span>
            <div class="info-text">
              <h2>{{ locale === 'zh' ? currentCategory.nameZh : currentCategory.name }}</h2>
              <p>{{ t(`categories.${currentCategory.id === 'cloud-native' ? 'cloudNative' : currentCategory.id}Desc`) }}</p>
            </div>
          </div>
        </div>
      </section>
    </Transition>

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
        <div v-else class="no-results">
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
.page-header {
  padding: 3rem 0;
  background: var(--bg-secondary);
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* Filter Section */
.filter-section {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tag:hover {
  border-color: var(--category-color, var(--accent-color));
  color: var(--category-color, var(--accent-color));
}

.filter-tag.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.filter-tag.active .tag-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.tag-icon {
  font-size: 1.1rem;
}

.tag-count {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  color: var(--text-tertiary);
}

/* Category Info */
.category-info {
  padding: 1.5rem 0;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg,
    rgba(13, 148, 136, 0.05) 0%,
    rgba(52, 211, 153, 0.03) 100%
  );
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--category-color, var(--accent-color));
  border-radius: var(--radius-lg);
}

.info-icon {
  font-size: 2.5rem;
}

.info-text h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.info-text p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* Posts Section */
.posts-section {
  padding: 2.5rem 0 4rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>
