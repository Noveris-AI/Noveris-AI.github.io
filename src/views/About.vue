<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { t, tm } = useI18n()

// Get topics list as string array
const topicsList = computed(() => tm('about.topicsList') as string[])

// SEO Meta Tags
useHead({
  title: computed(() => `${t('about.title')} - Noveris`),
  meta: [
    { name: 'description', content: computed(() => t('about.intro')) },
    { name: 'keywords', content: 'Liu Yaojie, Passion, about, developer, tech enthusiast' },
    { property: 'og:type', content: 'profile' },
    { property: 'og:title', content: computed(() => `${t('about.title')} - Noveris`) },
    { property: 'og:description', content: computed(() => t('about.intro')) },
    { name: 'twitter:card', content: 'summary' },
  ]
})
</script>

<template>
  <DefaultLayout>
    <section class="about-page">
      <div class="container">
        <div class="about-grid">
          <!-- Left Column: Profile -->
          <aside class="profile-column">
            <div class="profile-card">
              <div class="profile-avatar">
                <img src="/logo.svg" alt="Noveris Logo" class="avatar-img" />
              </div>
              <h1 class="profile-name">{{ t('about.name') }}</h1>
              <p class="profile-alias">Passion</p>
              <p class="profile-bio">{{ t('about.intro') }}</p>

              <div class="social-links">
                <a href="https://github.com/Noveris-AI" target="_blank" rel="noopener" class="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="mailto:novatra.ai@novatra.cn" class="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </aside>

          <!-- Right Column: Content -->
          <main class="content-column">
            <!-- What I Do Section -->
            <section class="content-section" data-aos="fade-up">
              <h2>{{ t('about.what') }}</h2>
              <p>{{ t('about.whatText') }}</p>
            </section>

            <!-- Topics Section -->
            <section class="content-section" data-aos="fade-up">
              <h2>{{ t('about.topics') }}</h2>
              <div class="topics-grid">
                <span v-for="topic in topicsList" :key="topic" class="topic-tag">
                  {{ topic }}
                </span>
              </div>
            </section>

            <!-- Tech Stack Section -->
            <section class="content-section tech-section" data-aos="fade-up">
              <h2>{{ t('about.techStack') }}</h2>
              <div class="tech-categories">
                <!-- Frontend -->
                <div class="tech-category">
                  <div class="category-header">
                    <div class="category-icon frontend">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                        <line x1="12" y1="22" x2="12" y2="15.5"/>
                        <polyline points="22 8.5 12 15.5 2 8.5"/>
                        <polyline points="2 15.5 12 8.5 22 15.5"/>
                        <line x1="12" y1="2" x2="12" y2="8.5"/>
                      </svg>
                    </div>
                    <h3>{{ t('about.techCategories.frontend') }}</h3>
                  </div>
                  <div class="tech-items">
                    <span class="tech-item">Vue 3</span>
                    <span class="tech-item">React</span>
                    <span class="tech-item">TypeScript</span>
                    <span class="tech-item">Vite</span>
                    <span class="tech-item">Tailwind CSS</span>
                    <span class="tech-item">Next.js</span>
                  </div>
                </div>

                <!-- Backend -->
                <div class="tech-category">
                  <div class="category-header">
                    <div class="category-icon backend">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                        <line x1="6" y1="6" x2="6.01" y2="6"/>
                        <line x1="6" y1="18" x2="6.01" y2="18"/>
                      </svg>
                    </div>
                    <h3>{{ t('about.techCategories.backend') }}</h3>
                  </div>
                  <div class="tech-items">
                    <span class="tech-item">Python</span>
                    <span class="tech-item">Node.js</span>
                    <span class="tech-item">Go</span>
                    <span class="tech-item">FastAPI</span>
                    <span class="tech-item">PostgreSQL</span>
                    <span class="tech-item">Redis</span>
                  </div>
                </div>

                <!-- DevOps -->
                <div class="tech-category">
                  <div class="category-header">
                    <div class="category-icon devops">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3>{{ t('about.techCategories.devops') }}</h3>
                  </div>
                  <div class="tech-items">
                    <span class="tech-item">Docker</span>
                    <span class="tech-item">Kubernetes</span>
                    <span class="tech-item">GitHub Actions</span>
                    <span class="tech-item">Terraform</span>
                    <span class="tech-item">AWS</span>
                    <span class="tech-item">Linux</span>
                  </div>
                </div>

                <!-- AI & ML -->
                <div class="tech-category">
                  <div class="category-header">
                    <div class="category-icon ai">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                        <path d="M7.5 13a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z"/>
                        <path d="M13.5 13a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z"/>
                        <path d="M9 17l1.5 1 1.5-1 1.5 1 1.5-1"/>
                      </svg>
                    </div>
                    <h3>{{ t('about.techCategories.ai') }}</h3>
                  </div>
                  <div class="tech-items">
                    <span class="tech-item">PyTorch</span>
                    <span class="tech-item">LangChain</span>
                    <span class="tech-item">OpenAI API</span>
                    <span class="tech-item">Claude API</span>
                    <span class="tech-item">RAG</span>
                    <span class="tech-item">Fine-tuning</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Connect Section -->
            <section class="content-section" data-aos="fade-up">
              <h2>{{ t('about.connect') }}</h2>
              <p>{{ t('about.connectText') }}</p>
            </section>
          </main>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.about-page {
  padding: 3rem 0;
  min-height: calc(100vh - 64px);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;
}

/* Profile Column */
.profile-column {
  position: sticky;
  top: 88px;
}

.profile-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border-radius: 50%;
  padding: 4px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  border-radius: 50%;
  padding: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.profile-alias {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 1rem;
}

.profile-bio {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.social-link:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

/* Content Column */
.content-column {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.content-section h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--accent-color);
  display: inline-block;
}

.content-section p {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
}

/* Topics */
.topics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.topic-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: var(--radius-full);
}

/* Tech Grid */
.tech-categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tech-category {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  transition: all var(--transition-fast);
}

.tech-category:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.category-icon.frontend {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.category-icon.backend {
  background: rgba(14, 165, 233, 0.1);
  color: #0ea5e9;
}

.category-icon.devops {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.category-icon.ai {
  background: rgba(13, 148, 136, 0.1);
  color: var(--accent-color);
}

.category-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-item {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.tech-item:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

/* Responsive */
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .profile-column {
    position: static;
  }

  .profile-card {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .tech-categories {
    grid-template-columns: 1fr;
  }
}
</style>
