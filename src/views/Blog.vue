<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import { posts, categories } from '../data/posts'

const { t, locale } = useI18n()
const searchQuery = ref('')
const selectedCategory = ref('all')

const filteredPosts = computed(() => {
  let result = posts

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
</script>

<template>
  <DefaultLayout>
    <section class="blog-header">
      <div class="container">
        <h1>{{ t('blog.title') }}</h1>
        <p>{{ t('blog.subtitle') }}</p>
      </div>
    </section>

    <section class="blog-content">
      <div class="container">
        <div class="blog-controls">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('blog.search')"
              class="search-input"
            />
          </div>
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
              {{ locale === 'zh' ? category.nameZh : category.name }}
            </button>
          </div>
        </div>

        <div v-if="filteredPosts.length" class="posts-grid">
          <BlogCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
        </div>
        <div v-else class="no-results">
          <p>{{ t('blog.noResults') }}</p>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.blog-header {
  padding: 4rem 0;
  background: var(--bg-secondary);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.blog-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.blog-content {
  padding: 3rem 0;
}

.blog-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.search-box {
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
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

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
