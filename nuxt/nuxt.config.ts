// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint'
  ],

  // Nuxt Content configuration
  content: {
    documentDriven: false,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // Internationalization
  i18n: {
    locales: [
      { code: 'zh', language: 'zh-CN', file: 'zh.json', name: '中文' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'zh'
    }
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Route rules for SSG and caching
  routeRules: {
    '/': { prerender: true },
    '/blog/**': { prerender: true },
    '/en/**': { prerender: true },
    '/portfolio/**': { prerender: true },
    '/knowledge/**': { prerender: true },
    '/api/**': { cors: true }
  },

  // Nitro server configuration
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml'],
      crawlLinks: true
    }
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Noveris Blog',
      htmlAttrs: {
        lang: 'zh'
      },
      meta: [
        { name: 'description', content: 'Noveris AI Tech Blog - AI, Web Development, and Technology Insights' },
        { name: 'theme-color', content: '#0d9488' },
        { property: 'og:site_name', content: 'Noveris Blog' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (only available server-side)
    meilisearchApiKey: process.env.NUXT_MEILISEARCH_API_KEY || '',
    emailPassword: process.env.NUXT_EMAIL_PASSWORD || '',
    githubClientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET || '',

    // Public keys (exposed to client)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://noveris-ai.github.io',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://noveris-blog-auth.vercel.app',

      // Meilisearch
      meilisearchHost: process.env.NUXT_PUBLIC_MEILISEARCH_HOST || '',
      meilisearchSearchKey: process.env.NUXT_PUBLIC_MEILISEARCH_SEARCH_KEY || '',

      // Giscus
      giscusRepo: process.env.NUXT_PUBLIC_GISCUS_REPO || 'Noveris-AI/Noveris-AI.github.io',
      giscusRepoId: process.env.NUXT_PUBLIC_GISCUS_REPO_ID || '',
      giscusCategory: process.env.NUXT_PUBLIC_GISCUS_CATEGORY || 'Comments',
      giscusCategoryId: process.env.NUXT_PUBLIC_GISCUS_CATEGORY_ID || '',

      // Sentry
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || ''
    }
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disable during build for speed
  },

  // ESLint configuration
  eslint: {
    config: {
      standalone: false
    }
  }
})
