<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import { RouterLink } from 'vue-router'

const { t, locale } = useI18n()
const { theme, toggleTheme } = useTheme()

const toggleLocale = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('locale', locale.value)
}
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">N</span>
        <span class="logo-text">Noveris AI</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/blog" class="nav-link">{{ t('nav.blog') }}</RouterLink>
        <RouterLink to="/about" class="nav-link">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/contact" class="nav-link">{{ t('nav.contact') }}</RouterLink>
      </nav>

      <div class="header-actions">
        <button @click="toggleLocale" class="action-btn" :title="locale === 'zh' ? 'Switch to English' : '切换到中文'">
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <button @click="toggleTheme" class="action-btn theme-toggle" :title="theme === 'light' ? t('theme.dark') : t('theme.light')">
          <span v-if="theme === 'light'">🌙</span>
          <span v-else>☀️</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 8px;
  font-weight: 800;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent-color);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--bg-tertiary);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .logo-text {
    display: none;
  }
}
</style>
