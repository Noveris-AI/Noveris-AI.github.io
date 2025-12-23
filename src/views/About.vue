<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { t } = useI18n()
</script>

<template>
  <DefaultLayout>
    <section class="about-header">
      <div class="container">
        <h1>{{ t('about.title') }}</h1>
        <p>{{ t('about.subtitle') }}</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-intro">
          <p>{{ t('about.intro') }}</p>
        </div>

        <div class="about-section">
          <h2>{{ t('about.mission') }}</h2>
          <p>{{ t('about.missionText') }}</p>
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
          <h2>Tech Stack</h2>
          <div class="tech-grid">
            <div class="tech-card">
              <div class="tech-icon">⚡</div>
              <h3>Vue 3</h3>
              <p>Progressive JavaScript Framework</p>
            </div>
            <div class="tech-card">
              <div class="tech-icon">🚀</div>
              <h3>Vite</h3>
              <p>Next Generation Frontend Tooling</p>
            </div>
            <div class="tech-card">
              <div class="tech-icon">📝</div>
              <h3>TypeScript</h3>
              <p>Typed JavaScript at Any Scale</p>
            </div>
            <div class="tech-card">
              <div class="tech-icon">🌐</div>
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
.about-header {
  padding: 4rem 0;
  background: var(--bg-secondary);
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.about-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.about-content {
  padding: 4rem 0;
}

.about-intro {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border-color);
}

.about-section {
  margin-bottom: 3rem;
}

.about-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
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
  margin-bottom: 0.75rem;
}

.tech-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.tech-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
