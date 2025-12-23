<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import { posts, categories } from '../data/posts'

const route = useRoute()
const { locale } = useI18n()

const category = computed(() => {
  return categories.find(c => c.id === route.params.category)
})

const categoryPosts = computed(() => {
  return posts.filter(p => p.category === route.params.category)
})

const categoryName = computed(() => {
  if (!category.value) return ''
  return locale.value === 'zh' ? category.value.nameZh : category.value.name
})
</script>

<template>
  <DefaultLayout>
    <section v-if="category" class="page-header" :style="{ '--category-color': category.color }">
      <div class="container">
        <RouterLink to="/categories" class="back-link">← Categories</RouterLink>
        <div class="header-content">
          <span class="category-icon">{{ category.icon }}</span>
          <h1>{{ categoryName }}</h1>
          <p>{{ categoryPosts.length }} {{ categoryPosts.length === 1 ? 'post' : 'posts' }}</p>
        </div>
      </div>
    </section>

    <section class="posts-content">
      <div class="container">
        <div v-if="categoryPosts.length" class="posts-grid">
          <BlogCard v-for="post in categoryPosts" :key="post.slug" :post="post" />
        </div>
        <div v-else class="no-posts">
          <p>No posts in this category yet.</p>
          <RouterLink to="/blog" class="btn">View All Posts</RouterLink>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.page-header {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-link {
  display: inline-block;
  color: var(--accent-color);
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.back-link:hover {
  opacity: 0.8;
}

.header-content {
  text-align: center;
}

.category-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
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

.posts-content {
  padding: 4rem 0;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.no-posts {
  text-align: center;
  padding: 4rem 0;
}

.no-posts p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.875rem 1.75rem;
  background: var(--accent-color);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
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
