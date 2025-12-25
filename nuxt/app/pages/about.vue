<script setup lang="ts">
const { t, locale } = useI18n()

// SEO
useSeoMeta({
  title: () => `${t('nav.about')} | Noveris`,
  description: () => t('site.description')
})

// Fetch author info
const { data: author } = await useAsyncData('author-passion', () =>
  queryContent('authors/passion').findOne()
)
</script>

<template>
  <div class="py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ $t('nav.about') }}</h1>
        <p class="text-xl text-muted">
          {{ $t('site.description') }}
        </p>
      </header>

      <!-- About Section -->
      <section class="mb-16">
        <div class="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <!-- Avatar -->
          <div v-if="author?.avatar" class="shrink-0">
            <NuxtImg
              :src="author.avatar"
              :alt="locale === 'zh' ? author.name?.zh : author.name?.en"
              class="w-32 h-32 rounded-full object-cover"
              width="128"
              height="128"
            />
          </div>

          <!-- Bio -->
          <div class="text-center md:text-left">
            <h2 class="text-2xl font-bold mb-2">
              {{ locale === 'zh' ? author?.name?.zh : author?.name?.en }}
            </h2>
            <p class="text-muted mb-4">
              {{ locale === 'zh' ? author?.bio?.zh : author?.bio?.en }}
            </p>

            <!-- Social Links -->
            <div v-if="author?.social" class="flex gap-4 justify-center md:justify-start">
              <a
                v-if="author.social.github"
                :href="author.social.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-primary transition-colors"
                :aria-label="$t('footer.links.github')"
              >
                GitHub
              </a>
              <a
                v-if="author.social.email"
                :href="`mailto:${author.social.email}`"
                class="text-muted hover:text-primary transition-colors"
                :aria-label="$t('footer.links.email')"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-4">Mission</h2>
        <div class="prose max-w-none">
          <p v-if="locale === 'zh'">
            Noveris AI 致力于探索人工智能与 Web 技术的前沿，分享技术洞察和最佳实践。
            我们相信开放和共享是技术进步的基石。
          </p>
          <p v-else>
            Noveris AI is dedicated to exploring the frontiers of AI and Web technologies,
            sharing technical insights and best practices. We believe openness and sharing
            are the cornerstones of technological progress.
          </p>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-4">Tech Stack</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">Frontend</h3>
            <p class="text-muted text-sm">Nuxt 4, Vue 3, TypeScript, CSS</p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">Content</h3>
            <p class="text-muted text-sm">Nuxt Content, Markdown, Git-based CMS</p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">Search</h3>
            <p class="text-muted text-sm">Meilisearch</p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">Deployment</h3>
            <p class="text-muted text-sm">GitHub Pages, Vercel Functions</p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="scroll-mt-20">
        <h2 class="text-2xl font-bold mb-4">{{ $t('contact.title') }}</h2>
        <p class="text-muted mb-6">
          {{ locale === 'zh'
            ? '有任何问题或建议，欢迎联系我们。'
            : 'Feel free to reach out with any questions or suggestions.'
          }}
        </p>

        <!-- Contact Form Placeholder -->
        <div class="p-8 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
          <p class="text-muted">
            {{ locale === 'zh' ? '联系表单即将上线' : 'Contact form coming soon' }}
          </p>
          <a
            :href="`mailto:${author?.social?.email || 'contact@noveris.ai'}`"
            class="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            {{ $t('footer.links.email') }}
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.prose {
  line-height: 1.75;
}

.prose p {
  margin-bottom: 1rem;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.dark .bg-gray-800 {
  background-color: #1f2937;
}

.bg-primary {
  background-color: #0d9488;
}

.scroll-mt-20 {
  scroll-margin-top: 5rem;
}
</style>
