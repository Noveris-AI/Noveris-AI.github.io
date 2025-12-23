<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import { posts, categories } from '../data/posts'

const { t, locale } = useI18n()
const latestPosts = posts.slice(0, 3)
</script>

<template>
  <DefaultLayout>
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title gradient-text">{{ t('home.title') }}</h1>
          <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
          <p class="hero-description">{{ t('home.description') }}</p>
          <div class="hero-actions">
            <RouterLink to="/blog" class="btn btn-primary">{{ t('home.viewAll') }}</RouterLink>
            <RouterLink to="/categories" class="btn btn-secondary">{{ t('nav.categories') }}</RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <img src="/logo.svg" alt="Noveris" class="hero-logo" />
        </div>
      </div>
    </section>

    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">{{ t('home.featuredCategories') }}</h2>
        <div class="categories-grid">
          <RouterLink
            v-for="category in categories"
            :key="category.id"
            :to="`/categories/${category.id}`"
            class="category-card"
            :style="{ '--category-color': category.color }"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <h3>{{ locale === 'zh' ? category.nameZh : category.name }}</h3>
            <span class="arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="latest-posts">
      <div class="container">
        <div class="section-header">
          <h2>{{ t('home.latestPosts') }}</h2>
          <RouterLink to="/blog" class="view-all">{{ t('home.viewAll') }} →</RouterLink>
        </div>
        <div class="posts-grid">
          <BlogCard v-for="post in latestPosts" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.hero {
  padding: 5rem 0;
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(13, 148, 136, 0.3);
}

.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-color);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-logo {
  width: 280px;
  height: 280px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.categories-section {
  padding: 5rem 0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: var(--category-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.category-card:hover .arrow {
  transform: translateX(4px);
  color: var(--category-color);
}

.category-icon {
  font-size: 2.5rem;
}

.category-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}

.arrow {
  color: var(--text-secondary);
  transition: all 0.2s;
}

.latest-posts {
  padding: 5rem 0;
  background: var(--bg-secondary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
}

.view-all {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.view-all:hover {
  opacity: 0.8;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-visual {
    order: -1;
  }

  .hero-logo {
    width: 200px;
    height: 200px;
  }

  .hero-actions {
    justify-content: center;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .categories-grid {
    grid-template-columns: 1fr 1fr;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
