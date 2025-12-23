import { ref, watch, onMounted } from 'vue'

type ThemeMode = 'light' | 'dark' | 'system'
type AppliedTheme = 'light' | 'dark'

const themeMode = ref<ThemeMode>('system')
const appliedTheme = ref<AppliedTheme>('light')

export function useTheme() {
  const getSystemTheme = (): AppliedTheme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const applyTheme = (t: AppliedTheme) => {
    appliedTheme.value = t
    document.documentElement.setAttribute('data-theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  const initTheme = () => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode
    if (savedMode) {
      themeMode.value = savedMode
    }

    if (themeMode.value === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(themeMode.value)
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (themeMode.value === 'system') {
        applyTheme(e.matches ? 'dark' : 'light')
      }
    })
  }

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    localStorage.setItem('themeMode', mode)

    if (mode === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(mode)
    }
  }

  // Legacy toggle for backward compatibility
  const toggleTheme = () => {
    const newMode = appliedTheme.value === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  onMounted(() => {
    initTheme()
  })

  watch(themeMode, (newMode) => {
    if (newMode === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(newMode)
    }
  })

  return {
    theme: appliedTheme,
    themeMode,
    toggleTheme,
    setThemeMode,
    initTheme
  }
}
