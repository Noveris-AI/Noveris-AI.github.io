<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { t } = useI18n()
</script>

<template>
  <DefaultLayout>
    <section class="page-header">
      <div class="container">
        <h1>{{ t('about.title') }}</h1>
        <p>{{ t('about.subtitle') }}</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-intro">
          <div class="intro-text">
            <h2 class="gradient-text">{{ t('about.greeting') }}</h2>
            <p>{{ t('about.intro') }}</p>
          </div>
          <div class="intro-image">
            <img src="/logo.svg" alt="Noveris Logo" class="profile-logo" />
          </div>
        </div>

        <div class="about-section">
          <h2>{{ t('about.what') }}</h2>
          <p>{{ t('about.whatText') }}</p>
        </div>

        <div class="about-section">
          <h2>{{ t('about.topics') }}</h2>
          <div class="topics-grid">
            <div v-for="topic in t('about.topicsList')" :key="topic" class="topic-card">
              {{ topic }}
            </div>
          </div>
        </div>

        <div class="about-section">
          <h2>{{ t('about.connect') }}</h2>
          <p>{{ t('about.connectText') }}</p>
          <div class="connect-links">
            <a href="https://github.com/Noveris-AI" target="_blank" class="connect-link">
              <span class="link-icon">📦</span>
              <span>GitHub</span>
            </a>
            <a href="mailto:novatra.ai@novatra.cn" class="connect-link">
              <span class="link-icon">📧</span>
              <span>novatra.ai@novatra.cn</span>
            </a>
          </div>
        </div>

        <div class="about-section tech-section">
          <h2>Tech Stack</h2>
          <div class="tech-grid">
            <div class="tech-card">
              <span class="tech-icon">⚡</span>
              <h3>Vue 3</h3>
              <p>Progressive JavaScript Framework</p>
            </div>
            <div class="tech-card">
              <span class="tech-icon">🚀</span>
              <h3>Vite</h3>
              <p>Next Generation Frontend Tooling</p>
            </div>
            <div class="tech-card">
              <span class="tech-icon">📝</span>
              <h3>TypeScript</h3>
              <p>Typed JavaScript at Any Scale</p>
            </div>
            <div class="tech-card">
              <span class="tech-icon">🌐</span>
              <h3>GitHub Pages</h3>
              <p>Static Site Hosting</p>
            </div>
          </div>
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
  max-width: 800px;
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

.about-content {
  padding: 4rem 0;
}

.about-intro {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border-color);
}

.intro-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-text p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.profile-logo {
  width: 150px;
  height: 150px;
}

.about-section {
  margin-bottom: 3rem;
}

.about-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.about-section p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.125rem;
}

.topics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.topic-card {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
}

.connect-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.connect-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s;
}

.connect-link:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.link-icon {
  font-size: 1.25rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tech-card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.tech-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.tech-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.tech-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .about-intro {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .intro-image {
    order: -1;
  }

  .profile-logo {
    width: 120px;
    height: 120px;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .connect-links {
    flex-direction: column;
  }
}
</style>
