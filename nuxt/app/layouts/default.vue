<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()
const route = useRoute()
const router = useRouter()

// Toggle theme
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Available locales
const availableLocales = computed(() =>
  locales.value.filter((l) => typeof l !== 'string')
)

// Check if we're on a blog post page
const isBlogPost = computed(() => {
  const path = route.path
  return /^(?:\/en)?\/blog\/(zh|en)\/[^/]+\/?$/.test(path)
})

// Extract blog post info from current path
const getBlogPostInfo = () => {
  const path = route.path
  const blogMatch = path.match(/^(?:\/en)?\/blog\/(zh|en)\/([^/]+)\/?$/)
  if (blogMatch) {
    return { contentLocale: blogMatch[1], slug: blogMatch[2] }
  }
  return null
}

// Get effective locale - for blog posts, use content locale; otherwise use i18n locale
const effectiveLocale = computed(() => {
  const blogInfo = getBlogPostInfo()
  return blogInfo ? blogInfo.contentLocale : locale.value
})

// Handle language switch - check if we're on a blog post page
const handleLocaleChange = (event: Event, newLocale: string) => {
  // For blog posts, prevent i18n default behavior and navigate directly
  const blogInfo = getBlogPostInfo()
  if (blogInfo) {
    event.preventDefault()
    event.stopPropagation()
    // Navigate to the same post in the new locale
    window.location.href = `/blog/${newLocale}/${blogInfo.slug}`
    return
  }

  // For other pages, use standard i18n locale switch
  setLocale(newLocale)
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded"
    >
      {{ $t('a11y.skipToContent') }}
    </a>

    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl text-teal-600 dark:text-teal-400">
          <span>Noveris</span>
        </NuxtLink>

        <!-- Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/blog" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {{ $t('nav.blog') }}
          </NuxtLink>
          <NuxtLink to="/portfolio" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {{ $t('nav.portfolio') }}
          </NuxtLink>
          <NuxtLink to="/knowledge" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {{ $t('nav.knowledge') }}
          </NuxtLink>
          <NuxtLink to="/about" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {{ $t('nav.about') }}
          </NuxtLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Language Switcher -->
          <div class="relative">
            <select
              :value="effectiveLocale"
              class="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm cursor-pointer"
              @change="handleLocaleChange($event, ($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="loc in availableLocales"
                :key="loc.code"
                :value="loc.code"
              >
                {{ loc.name }}
              </option>
            </select>
          </div>

          <!-- Theme Toggle -->
          <button
            type="button"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="$t('a11y.toggleTheme')"
            @click="toggleTheme"
          >
            <span v-if="colorMode.value === 'dark'">🌙</span>
            <span v-else>☀️</span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            type="button"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="$t('a11y.toggleMenu')"
          >
            <span>☰</span>
          </button>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Noveris AI. {{ $t('footer.copyright') }}.
          </p>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ $t('footer.poweredBy') }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
