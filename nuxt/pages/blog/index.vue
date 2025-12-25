<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

// Get current locale for content path
const { locale } = useI18n()
const contentPath = computed(() =>
  locale.value === 'zh' ? '/blog/zh' : '/blog/en'
)

// SEO
useSeoMeta({
  title: () => `${t('blog.title')} | Noveris`,
  description: () => t('blog.description')
})

// Fetch posts
const { data: posts } = await useAsyncData(`blog-posts-${locale.value}`, () =>
  queryContent(contentPath.value)
    .where({ status: 'published' })
    .sort({ publishedAt: -1 })
    .find()
)

// Get unique categories
const categories = computed(() => {
  if (!posts.value) return []
  const cats = new Set(posts.value.map((p) => p.category).filter(Boolean))
  return Array.from(cats)
})

// Filter state
const selectedCategory = ref<string | null>(null)

// Filtered posts
const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!selectedCategory.value) return posts.value
  return posts.value.filter((p) => p.category === selectedCategory.value)
})
</script>

<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ $t('blog.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          {{ $t('blog.description') }}
        </p>
      </header>

      <!-- Category Filter -->
      <div v-if="categories.length" class="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="selectedCategory === null
            ? 'bg-teal-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'"
          @click="selectedCategory = null"
        >
          {{ $t('common.all') }}
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="selectedCategory === cat
            ? 'bg-teal-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Posts Grid -->
      <div v-if="filteredPosts.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in filteredPosts"
          :key="post._path"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <NuxtLink :to="post._path">
            <div v-if="post.cover" class="aspect-video bg-gray-100 dark:bg-gray-700">
              <NuxtImg
                :src="post.cover.src"
                :alt="post.cover.alt || post.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  v-if="post.category"
                  class="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wide"
                >
                  {{ post.category }}
                </span>
                <span v-if="post.featured" class="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded">
                  {{ $t('blog.featured') }}
                </span>
              </div>
              <h2 class="font-semibold text-lg mb-2 hover:text-teal-600 transition-colors line-clamp-2">
                {{ post.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                {{ post.description }}
              </p>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <time v-if="post.publishedAt" :datetime="post.publishedAt">
                  {{ new Date(post.publishedAt).toLocaleDateString() }}
                </time>
                <span v-if="post.readTime">
                  {{ post.readTime }} min
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          {{ $t('blog.noPosts') }}
        </p>
      </div>
    </div>
  </div>
</template>
