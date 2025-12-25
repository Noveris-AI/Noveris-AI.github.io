<script setup lang="ts">
const { t, locale } = useI18n()

// SEO
useSeoMeta({
  title: () => `${t('knowledge.title')} | Noveris`,
  description: () => t('knowledge.description')
})

// Fetch FAQs
const { data: faqs } = await useAsyncData('knowledge-faqs', () =>
  queryContent('knowledge/faq')
    .sort({ order: 1 })
    .find()
)

// FAQ accordion state
const expandedFaq = ref<string | null>(null)

const toggleFaq = (id: string) => {
  expandedFaq.value = expandedFaq.value === id ? null : id
}
</script>

<template>
  <div class="py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ $t('knowledge.title') }}</h1>
        <p class="text-muted text-lg">
          {{ $t('knowledge.description') }}
        </p>
      </header>

      <!-- Search -->
      <div class="mb-8">
        <input
          type="search"
          :placeholder="$t('knowledge.searchPlaceholder')"
          class="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled
        />
      </div>

      <!-- Navigation Tabs -->
      <div class="flex gap-4 mb-8 border-b dark:border-gray-700">
        <button type="button" class="pb-2 border-b-2 border-primary font-medium text-primary">
          {{ $t('knowledge.faq') }}
        </button>
        <button type="button" class="pb-2 text-muted hover:text-primary transition-colors" disabled>
          {{ $t('knowledge.glossary') }}
        </button>
        <button type="button" class="pb-2 text-muted hover:text-primary transition-colors" disabled>
          {{ $t('knowledge.snippets') }}
        </button>
      </div>

      <!-- FAQs -->
      <section v-if="faqs?.length">
        <div class="space-y-4">
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="rounded-lg border dark:border-gray-700 overflow-hidden"
          >
            <button
              type="button"
              class="w-full p-4 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :aria-expanded="expandedFaq === faq.id"
              @click="toggleFaq(faq.id)"
            >
              <span class="font-medium">
                {{ locale === 'zh' ? faq.question?.zh : faq.question?.en }}
              </span>
              <span class="text-2xl" :class="{ 'rotate-45': expandedFaq === faq.id }">
                +
              </span>
            </button>
            <div
              v-show="expandedFaq === faq.id"
              class="p-4 bg-white dark:bg-gray-900"
            >
              <p class="text-muted">
                {{ locale === 'zh' ? faq.answer?.zh : faq.answer?.en }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <p class="text-muted text-lg">
          {{ locale === 'zh' ? '内容正在筹备中...' : 'Content coming soon...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: #0d9488;
}

.border-primary {
  border-color: #0d9488;
}

.focus\:ring-primary:focus {
  --tw-ring-color: #0d9488;
}

.rotate-45 {
  transform: rotate(45deg);
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}
</style>
