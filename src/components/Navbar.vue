<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import { RouterLink } from 'vue-router'
import MobileMenu from './MobileMenu.vue'
import Dropdown from './Dropdown.vue'

const { t, locale } = useI18n()
const { themeMode, setThemeMode } = useTheme()

const mobileMenuOpen = ref(false)

// Language options
const languageOptions = computed(() => [
  { value: 'zh', label: t('language.zh'), icon: '🇨🇳' },
  { value: 'en', label: t('language.en'), icon: '🇺🇸' }
])

const currentLocale = computed({
  get: () => locale.value,
  set: (val: string) => {
    locale.value = val
    localStorage.setItem('locale', val)
  }
})

// Theme options
const themeOptions = computed(() => [
  { value: 'light', label: t('theme.light'), icon: '☀️' },
  { value: 'dark', label: t('theme.dark'), icon: '🌙' },
  { value: 'system', label: t('theme.system'), icon: '💻' }
])

const currentTheme = computed({
  get: () => themeMode.value,
  set: (val: string) => {
    setThemeMode(val as 'light' | 'dark' | 'system')
  }
})
</script>

<template>
  <header class="header glass">
    <div class="container">
      <!-- Logo (Left) -->
      <RouterLink to="/" class="logo">
        <img src="/logo.svg" alt="Noveris" class="logo-icon" />
        <span class="logo-text">Noveris</span>
      </RouterLink>

      <!-- Navigation (Center) -->
      <nav class="nav">
        <RouterLink to="/" class="nav-link">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/blog" class="nav-link">{{ t('nav.blog') }}</RouterLink>
        <RouterLink to="/categories" class="nav-link">{{ t('nav.categories') }}</RouterLink>
        <RouterLink to="/about" class="nav-link">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/contact" class="nav-link">{{ t('nav.contact') }}</RouterLink>
      </nav>

      <!-- Actions (Right) -->
      <div class="header-actions">
        <Dropdown
          v-model="currentLocale"
          :options="languageOptions"
          icon="🌐"
          :title="t('language.title')"
        />
        <Dropdown
          v-model="currentTheme"
          :options="themeOptions"
          icon="🎨"
          :title="t('theme.title')"
        />

        <!-- Mobile Menu Button -->
        <button
          class="menu-btn"
          @click="mobileMenuOpen = true"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <MobileMenu :is-open="mobileMenuOpen" @close="mobileMenuOpen = false" />
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
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
}

.logo-text {
  font-family: var(--font-sans);
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color var(--transition-fast);
  padding: 0.5rem 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--accent-color);
}

.nav-link.router-link-active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.menu-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-color);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .header-actions :deep(.dropdown) {
    display: none;
  }

  .menu-btn {
    display: flex;
  }

  .logo-text {
    display: none;
  }
}
</style>
