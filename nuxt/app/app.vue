<script setup lang="ts">
// Set up color mode
useHead({
  htmlAttrs: {
    class: 'scroll-smooth'
  },
  bodyAttrs: {
    class: 'antialiased'
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Global styles */
:root {
  --color-primary: #0d9488;
  --color-primary-dark: #0f766e;
}

/* Tailwind-like utility classes */
.container {
  max-width: 1280px;
}

/* Dark mode transition */
html.dark {
  color-scheme: dark;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip to content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus,
.sr-only:not(.sr-only) {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>
