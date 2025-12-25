export function useTheme() {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')
  const isLight = computed(() => colorMode.value === 'light')
  const isSystem = computed(() => colorMode.preference === 'system')

  const toggleTheme = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    colorMode.preference = theme
  }

  const currentTheme = computed(() => colorMode.value)
  const preferredTheme = computed(() => colorMode.preference)

  return {
    isDark,
    isLight,
    isSystem,
    currentTheme,
    preferredTheme,
    toggleTheme,
    setTheme
  }
}
