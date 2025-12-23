<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { locale } = useI18n()

useHead({
  title: '404 - Page Not Found | Noveris',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>

<template>
  <DefaultLayout>
    <section class="not-found">
      <div class="container">
        <div class="not-found-content">
          <div class="error-code">404</div>
          <h1>{{ locale === 'zh' ? '页面未找到' : 'Page Not Found' }}</h1>
          <p>{{ locale === 'zh' ? '抱歉，您访问的页面不存在或已被移除。' : "Sorry, the page you're looking for doesn't exist or has been moved." }}</p>
          <div class="actions">
            <RouterLink to="/" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              {{ locale === 'zh' ? '返回首页' : 'Go Home' }}
            </RouterLink>
            <RouterLink to="/blog" class="btn btn-secondary">
              {{ locale === 'zh' ? '浏览博客' : 'Browse Blog' }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.not-found-content {
  text-align: center;
}

.error-code {
  font-family: var(--font-sans);
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.not-found-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.not-found-content p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .error-code {
    font-size: 5rem;
  }

  .not-found-content h1 {
    font-size: 1.5rem;
  }

  .actions {
    flex-direction: column;
  }

  .actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
