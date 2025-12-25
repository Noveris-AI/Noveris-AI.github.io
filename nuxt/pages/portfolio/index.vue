<script setup lang="ts">
const { t, locale } = useI18n()

// SEO
useSeoMeta({
  title: () => `${t('portfolio.title')} | Noveris`,
  description: () => t('portfolio.description')
})

// Fetch projects
const { data: projects } = await useAsyncData('portfolio-projects', () =>
  queryContent('portfolio/projects')
    .sort({ order: 1 })
    .find()
)
</script>

<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ $t('portfolio.title') }}</h1>
        <p class="text-muted text-lg">
          {{ $t('portfolio.description') }}
        </p>
      </header>

      <!-- Projects Grid -->
      <section v-if="projects?.length" class="mb-16">
        <h2 class="text-2xl font-bold mb-6">{{ $t('portfolio.projects') }}</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="project in projects"
            :key="project.id"
            class="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
          >
            <div v-if="project.cover" class="aspect-video bg-gray-100 dark:bg-gray-700">
              <NuxtImg
                :src="project.cover.src"
                :alt="locale === 'zh' ? project.title?.zh : project.title?.en"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="text-xs font-medium px-2 py-0.5 rounded"
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': project.status === 'active',
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': project.status === 'in-progress',
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': project.status === 'completed'
                  }"
                >
                  {{ $t(`portfolio.status.${project.status?.replace('-', '')}`) }}
                </span>
              </div>

              <h3 class="font-semibold text-lg mb-2">
                {{ locale === 'zh' ? project.title?.zh : project.title?.en }}
              </h3>

              <p class="text-muted text-sm line-clamp-2 mb-4">
                {{ locale === 'zh' ? project.description?.zh : project.description?.en }}
              </p>

              <!-- Technologies -->
              <div v-if="project.technologies?.length" class="flex flex-wrap gap-1 mb-4">
                <span
                  v-for="tech in project.technologies.slice(0, 4)"
                  :key="tech"
                  class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Links -->
              <div class="flex gap-4">
                <a
                  v-if="project.links?.live"
                  :href="project.links.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-primary hover:underline"
                >
                  {{ $t('portfolio.viewProject') }} →
                </a>
                <a
                  v-if="project.links?.github"
                  :href="project.links.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-muted hover:text-primary transition-colors"
                >
                  {{ $t('portfolio.viewCode') }}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <p class="text-muted text-lg">
          {{ locale === 'zh' ? '项目正在筹备中...' : 'Projects coming soon...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: #0d9488;
}

.bg-white {
  background-color: white;
}

.dark .bg-gray-800 {
  background-color: #1f2937;
}
</style>
