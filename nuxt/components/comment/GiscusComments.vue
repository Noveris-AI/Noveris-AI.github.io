<script setup lang="ts">
const config = useRuntimeConfig()
const colorMode = useColorMode()
const { locale } = useI18n()

// Giscus configuration from runtime config
const giscusRepo = config.public.giscusRepo as `${string}/${string}`
const giscusRepoId = config.public.giscusRepoId
const giscusCategory = config.public.giscusCategory
const giscusCategoryId = config.public.giscusCategoryId

// Check if Giscus is configured
const isConfigured = computed(() =>
  giscusRepo && giscusRepoId && giscusCategoryId
)

// Theme based on color mode
const giscusTheme = computed(() =>
  colorMode.value === 'dark' ? 'dark' : 'light'
)

// Language based on locale
const giscusLang = computed(() =>
  locale.value === 'zh' ? 'zh-CN' : 'en'
)

// Reload Giscus when theme or language changes
const giscusKey = computed(() =>
  `${giscusTheme.value}-${giscusLang.value}`
)
</script>

<template>
  <div class="giscus-wrapper">
    <template v-if="isConfigured">
      <ClientOnly>
        <component
          :is="'script'"
          :key="giscusKey"
          src="https://giscus.app/client.js"
          :data-repo="giscusRepo"
          :data-repo-id="giscusRepoId"
          :data-category="giscusCategory"
          :data-category-id="giscusCategoryId"
          data-mapping="pathname"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="top"
          :data-theme="giscusTheme"
          :data-lang="giscusLang"
          data-loading="lazy"
          crossorigin="anonymous"
          async
        />
        <template #fallback>
          <div class="loading-placeholder">
            {{ locale === 'zh' ? '加载评论中...' : 'Loading comments...' }}
          </div>
        </template>
      </ClientOnly>
    </template>
    <template v-else>
      <div class="not-configured">
        <p>{{ locale === 'zh' ? '评论功能尚未配置' : 'Comments are not configured yet' }}</p>
        <p class="hint">
          {{ locale === 'zh'
            ? '请在环境变量中配置 Giscus 相关参数'
            : 'Please configure Giscus environment variables'
          }}
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  min-height: 200px;
}

.loading-placeholder,
.not-configured {
  padding: 2rem;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.dark .loading-placeholder,
.dark .not-configured {
  background-color: #1f2937;
}

.not-configured .hint {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Giscus frame styling */
:deep(.giscus) {
  margin-top: 1rem;
}

:deep(.giscus-frame) {
  border: none;
  width: 100%;
}
</style>
