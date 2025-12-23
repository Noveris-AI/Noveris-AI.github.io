<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import { RouterLink } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { t, locale } = useI18n()
const { themeMode, setThemeMode } = useTheme()

const toggleLocale = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('locale', locale.value)
}

// Cycle through: light -> dark -> system -> light
const cycleTheme = () => {
  const modes = ['light', 'dark', 'system'] as const
  const currentIndex = modes.indexOf(themeMode.value as typeof modes[number])
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % modes.length
  setThemeMode(modes[nextIndex]!)
}

const themeIcon = computed(() => {
  switch (themeMode.value) {
    case 'light': return '☀️'
    case 'dark': return '🌙'
    case 'system': return '💻'
  }
})

const handleNavClick = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="menu-backdrop"
        @click="emit('close')"
      />
    </Transition>

    <!-- Slide-out Menu -->
    <Transition name="slide">
      <aside v-if="isOpen" class="mobile-menu">
        <div class="menu-header">
          <RouterLink to="/" class="logo" @click="handleNavClick">
            <img src="/logo.svg" alt="Noveris" class="logo-icon" />
            <span class="logo-text">Noveris</span>
          </RouterLink>
          <button class="close-btn" @click="emit('close')" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav class="menu-nav">
          <RouterLink to="/" class="menu-link" @click="handleNavClick">
            {{ t('nav.home') }}
          </RouterLink>
          <RouterLink to="/blog" class="menu-link" @click="handleNavClick">
            {{ t('nav.blog') }}
          </RouterLink>
          <RouterLink to="/categories" class="menu-link" @click="handleNavClick">
            {{ t('nav.categories') }}
          </RouterLink>
          <RouterLink to="/about" class="menu-link" @click="handleNavClick">
            {{ t('nav.about') }}
          </RouterLink>
          <RouterLink to="/contact" class="menu-link" @click="handleNavClick">
            {{ t('nav.contact') }}
          </RouterLink>
        </nav>

        <div class="menu-actions">
          <button @click="toggleLocale" class="action-btn">
            <span class="action-icon">{{ locale === 'zh' ? '🇺🇸' : '🇨🇳' }}</span>
            <span class="action-label">{{ locale === 'zh' ? 'English' : '中文' }}</span>
          </button>
          <button @click="cycleTheme" class="action-btn">
            <span class="action-icon">{{ themeIcon }}</span>
            <span class="action-label">{{ t(`theme.${themeMode}`) }}</span>
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background: var(--bg-primary);
  z-index: 999;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.25rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.menu-nav {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-link {
  display: block;
  padding: 0.875rem 1rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.menu-link:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.menu-link.router-link-active {
  background: var(--accent-bg);
  color: var(--accent-color);
}

.menu-actions {
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-color);
}

.action-icon {
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.action-label {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-primary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-slow);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform var(--transition-slow);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
