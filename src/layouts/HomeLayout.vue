<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="home-layout">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <Navbar />
    <main id="main-content" class="home-content" role="main" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.home-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.home-content {
  flex: 1;
  overflow: hidden;
  outline: none;
}

/* Skip Link - Hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  font-family: var(--font-sans);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 1rem;
  outline: 3px solid var(--accent-color);
  outline-offset: 2px;
}
</style>
