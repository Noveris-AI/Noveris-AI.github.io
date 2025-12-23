<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { t, locale } = useI18n()

// SEO Meta Tags
useHead({
  title: computed(() => `${t('contact.title')} - Noveris`),
  meta: [
    { name: 'description', content: computed(() => t('contact.subtitle')) },
    { name: 'keywords', content: 'contact, email, 联系, 邮件' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: computed(() => `${t('contact.title')} - Noveris`) },
    { property: 'og:description', content: computed(() => t('contact.subtitle')) },
    { name: 'twitter:card', content: 'summary' },
  ]
})

const emails = [
  {
    address: 'yaojie.liu2025@outlook.com',
    labelZh: '常用邮箱',
    labelEn: 'Primary Email',
    icon: 'primary'
  },
  {
    address: 'novatra.ai@novatra.cn',
    labelZh: '公司/团队邮箱',
    labelEn: 'Company / Team',
    icon: 'company'
  },
  {
    address: 'yaojieliu3@gmail.com',
    labelZh: '海外邮箱',
    labelEn: 'International',
    icon: 'global'
  }
]
</script>

<template>
  <DefaultLayout>
    <section class="contact-page">
      <div class="contact-wrapper">
        <div class="contact-card" data-aos="fade-up">
          <!-- Header -->
          <div class="card-header">
            <div class="header-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h1>{{ t('contact.title') }}</h1>
            <p>{{ t('contact.subtitle') }}</p>
          </div>

          <!-- Email List -->
          <div class="email-list">
            <a
              v-for="email in emails"
              :key="email.address"
              :href="`mailto:${email.address}`"
              class="email-card"
            >
              <div class="email-icon" :class="email.icon">
                <svg v-if="email.icon === 'primary'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <svg v-else-if="email.icon === 'company'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 21h18"/>
                  <path d="M9 8h1"/>
                  <path d="M9 12h1"/>
                  <path d="M9 16h1"/>
                  <path d="M14 8h1"/>
                  <path d="M14 12h1"/>
                  <path d="M14 16h1"/>
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                </svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="email-info">
                <span class="email-label">{{ locale === 'zh' ? email.labelZh : email.labelEn }}</span>
                <span class="email-address">{{ email.address }}</span>
              </div>
              <div class="email-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          </div>

          <!-- Footer -->
          <div class="card-footer">
            <a href="https://github.com/Noveris-AI" target="_blank" rel="noopener" class="github-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.contact-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg,
    rgba(13, 148, 136, 0.03) 0%,
    rgba(52, 211, 153, 0.02) 100%
  );
}

.contact-wrapper {
  width: 100%;
  max-width: 480px;
}

.contact-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Header */
.card-header {
  text-align: center;
  padding: 2.5rem 2rem 2rem;
}

.header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.card-header h1 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.card-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* Email List */
.email-list {
  padding: 0.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.email-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-base);
}

.email-card:hover {
  border-color: var(--accent-color);
  background: var(--bg-tertiary);
  transform: translateX(4px);
}

.email-card:hover .email-arrow {
  opacity: 1;
  transform: translateX(0);
}

.email-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.email-icon.primary {
  background: rgba(13, 148, 136, 0.1);
  color: var(--accent-color);
}

.email-icon.company {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.email-icon.global {
  background: rgba(14, 165, 233, 0.1);
  color: #0ea5e9;
}

.email-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.email-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.email-address {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-arrow {
  color: var(--accent-color);
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

/* Footer */
.card-footer {
  display: flex;
  justify-content: center;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.github-link:hover {
  color: var(--accent-color);
}

/* Responsive */
@media (max-width: 640px) {
  .contact-page {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  .card-header {
    padding: 2rem 1.5rem 1.5rem;
  }

  .email-list {
    padding: 0.5rem 1rem 1rem;
  }

  .email-card {
    padding: 0.875rem 1rem;
  }

  .email-icon {
    width: 40px;
    height: 40px;
  }

  .email-address {
    font-size: 0.85rem;
  }
}
</style>
