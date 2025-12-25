<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

// Determine content path based on locale
const basePath = computed(() =>
  locale.value === 'zh' ? '/blog/zh' : '/blog/en'
)

// Fetch the post
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent(`${basePath.value}/${route.params.slug}`).findOne()
)

// 404 if post not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}

// SEO
useSeoMeta({
  title: () => post.value?.title || 'Blog Post',
  description: () => post.value?.description || '',
  ogTitle: () => post.value?.title || 'Blog Post',
  ogDescription: () => post.value?.description || '',
  ogImage: () => post.value?.cover?.src,
  twitterCard: 'summary_large_image'
})

// JSON-LD structured data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value?.title,
        description: post.value?.description,
        datePublished: post.value?.publishedAt,
        dateModified: post.value?.updatedAt || post.value?.publishedAt,
        author: {
          '@type': 'Person',
          name: post.value?.author
        },
        image: post.value?.cover?.src
      })
    }
  ]
})

// Fetch related posts
const { data: relatedPosts } = await useAsyncData(`related-${route.params.slug}`, () =>
  queryContent(basePath.value)
    .where({
      _path: { $ne: post.value?._path },
      category: post.value?.category,
      status: 'published'
    })
    .sort({ publishedAt: -1 })
    .limit(3)
    .find()
)
</script>

<template>
  <article v-if="post" class="py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <NuxtLink
            to="/blog"
            class="text-sm text-gray-500 hover:text-teal-600 transition-colors"
          >
            ← {{ $t('common.back') }}
          </NuxtLink>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span
            v-if="post.category"
            class="text-sm font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wide"
          >
            {{ post.category }}
          </span>
          <span
            v-if="post.featured"
            class="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded"
          >
            {{ $t('blog.featured') }}
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          {{ post.title }}
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {{ post.description }}
        </p>

        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <span v-if="post.author">
            {{ $t('blog.author') }}: {{ post.author }}
          </span>
          <time v-if="post.publishedAt" :datetime="post.publishedAt">
            {{ $t('blog.publishedAt') }} {{ new Date(post.publishedAt).toLocaleDateString() }}
          </time>
          <span v-if="post.readTime">
            {{ post.readTime }} {{ $t('blog.readTime', { time: post.readTime }) }}
          </span>
        </div>
      </header>

      <!-- Cover Image -->
      <div v-if="post.cover" class="mb-8 rounded-lg overflow-hidden">
        <NuxtImg
          :src="post.cover.src"
          :alt="post.cover.alt || post.title"
          class="w-full h-auto"
          loading="lazy"
        />
      </div>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="mb-8 flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>

      <!-- Related Posts -->
      <section v-if="relatedPosts?.length" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6">{{ $t('blog.relatedPosts') }}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <article
            v-for="related in relatedPosts"
            :key="related._path"
            class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            <NuxtLink :to="related._path">
              <h3 class="font-semibold hover:text-teal-600 transition-colors line-clamp-2">
                {{ related.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {{ related.description }}
              </p>
            </NuxtLink>
          </article>
        </div>
      </section>

      <!-- Comments -->
      <section class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6">{{ $t('blog.share') }}</h2>
        <GiscusComments />
      </section>
    </div>
  </article>
</template>

<style scoped>
/* Prose styles for content */
.prose {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-links: #0d9488;
  line-height: 1.75;
}

.dark .prose {
  --tw-prose-body: #d1d5db;
  --tw-prose-headings: #f9fafb;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 0.5em;
}

.prose :deep(p) {
  color: var(--tw-prose-body);
  margin-bottom: 1.25em;
}

.prose :deep(a) {
  color: var(--tw-prose-links);
  text-decoration: underline;
}

.prose :deep(code) {
  background-color: #f3f4f6;
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  font-size: 0.875em;
}

.dark .prose :deep(code) {
  background-color: #374151;
}

.prose :deep(pre) {
  background-color: #1f2937;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
}

.prose :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.prose :deep(img) {
  border-radius: 0.5em;
  margin: 2em auto;
}

.prose :deep(blockquote) {
  border-left: 4px solid #0d9488;
  padding-left: 1em;
  font-style: italic;
  color: #6b7280;
}

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 1.25em;
}

.prose :deep(li) {
  margin-bottom: 0.5em;
}
</style>
