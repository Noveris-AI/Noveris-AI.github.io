<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { cleanupBlog } from './composables/useBlog'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

onUnmounted(() => {
  cleanupBlog()
})
</script>

<template>
  <RouterView />
</template>

<style>
/* Global styles are in style.css */
</style>
