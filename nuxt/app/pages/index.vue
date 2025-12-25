<script setup lang="ts">
const { t } = useI18n()

// SEO
useSeoMeta({
  title: t('site.title'),
  description: t('site.description')
})

// Fetch featured posts
const { data: featuredPosts } = await useAsyncData('featured-posts', () =>
  queryContent('blog')
    .where({ featured: true, status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(3)
    .find()
)

// Fetch latest posts
const { data: latestPosts } = await useAsyncData('latest-posts', () =>
  queryContent('blog')
    .where({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(6)
    .find()
)
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-teal-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Noveris Blog
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {{ $t('site.description') }}
        </p>
        <div class="flex gap-4 justify-center">
          <NuxtLink
            to="/blog"
            class="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
          >
            {{ $t('nav.blog') }}
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="px-6 py-3 border border-teal-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            {{ $t('nav.about') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Posts Section -->
    <section v-if="featuredPosts?.length" class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-8">{{ $t('blog.featured') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <article
            v-for="post in featuredPosts"
            :key="post._path"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <NuxtLink :to="post._path">
              <div v-if="post.cover" class="aspect-video bg-gray-100 dark:bg-gray-700">
                <NuxtImg
                  :src="post.cover.src"
                  :alt="post.cover.alt"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-6">
                <h3 class="font-semibold text-lg mb-2 hover:text-teal-600 transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Latest Posts Section -->
    <section v-if="latestPosts?.length" class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold">{{ $t('blog.latest') }}</h2>
          <NuxtLink to="/blog" class="text-teal-600 dark:text-teal-400 hover:underline">
            {{ $t('common.more') }} →
          </NuxtLink>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="post in latestPosts"
            :key="post._path"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-md transition-shadow"
          >
            <NuxtLink :to="post._path">
              <span
                v-if="post.category"
                class="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wide"
              >
                {{ post.category }}
              </span>
              <h3 class="font-semibold mt-2 mb-2 hover:text-teal-600 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {{ post.description }}
              </p>
              <div class="mt-4 text-sm text-gray-500 dark:text-gray-500">
                {{ post.readTime }} {{ $t('blog.readTime', { time: post.readTime }) }}
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold mb-4">{{ $t('contact.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          {{ $t('site.description') }}
        </p>
        <NuxtLink
          to="/about#contact"
          class="inline-block px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
        >
          {{ $t('contact.title') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
