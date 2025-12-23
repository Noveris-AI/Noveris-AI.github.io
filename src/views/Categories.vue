<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { categories, posts } from '../data/posts'

const { t, locale } = useI18n()

const getCategoryPostCount = (categoryId: string) => {
  return posts.filter(p => p.category === categoryId).length
}
</script>

<template>
  <DefaultLayout>
    <section class="page-header">
      <div class="container">
        <h1>{{ t('categories.title') }}</h1>
        <p>{{ t('categories.subtitle') }}</p>
      </div>
    </section>

    <section class="categories-content">
      <div class="container">
        <div class="categories-grid">
          <RouterLink
            v-for="category in categories"
            :key="category.id"
            :to="`/categories/${category.id}`"
            class="category-card"
            :style="{ '--category-color': category.color }"
          >
            <div class="card-header">
              <span class="category-icon">{{ category.icon }}</span>
              <span class="post-count">{{ getCategoryPostCount(category.id) }} posts</span>
            </div>
            <h2>{{ locale === 'zh' ? category.nameZh : category.name }}</h2>
            <p class="category-desc">
              {{ t(`categories.${category.id === 'cloud-native' ? 'cloudNative' : category.id}Desc`) }}
            </p>
            <span class="view-link">{{ t('categories.viewPosts') }} →</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.page-header {
  padding: 4rem 0;
  background: var(--bg-secondary);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.categories-content {
  padding: 4rem 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: var(--category-color);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.category-card:hover .view-link {
  color: var(--category-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: 3rem;
}

.post-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.category-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.category-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
}

.view-link {
  color: var(--accent-color);
  font-weight: 600;
  transition: color 0.2s;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
