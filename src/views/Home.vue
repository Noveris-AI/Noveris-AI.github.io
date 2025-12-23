<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import { posts } from '../data/posts'

const { t } = useI18n()
const latestPosts = posts.slice(0, 3)
</script>

<template>
  <DefaultLayout>
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ t('home.title') }}</h1>
          <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
          <p class="hero-description">{{ t('home.description') }}</p>
          <div class="hero-actions">
            <RouterLink to="/blog" class="btn btn-primary">{{ t('home.viewAll') }}</RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">{{ t('nav.about') }}</RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-shape"></div>
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

    <section class="features">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3>Machine Learning</h3>
            <p>Deep insights into ML algorithms and practical implementations.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>Deep Learning</h3>
            <p>Neural networks, transformers, and advanced architectures.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💬</div>
            <h3>NLP</h3>
            <p>Natural language processing and large language models.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👁️</div>
            <h3>Computer Vision</h3>
            <p>Image recognition, object detection, and visual AI.</p>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.hero {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
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
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
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
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-shape {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: morph 8s ease-in-out infinite;
  opacity: 0.8;
}

@keyframes morph {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  50% {
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
}

.latest-posts {
  padding: 5rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
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

.features {
  padding: 5rem 0;
  background: var(--bg-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.feature-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-visual {
    display: none;
  }

  .hero-actions {
    justify-content: center;
  }

  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
