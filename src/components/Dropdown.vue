<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface DropdownOption {
  value: string
  label: string
  icon?: string
}

const props = defineProps<{
  options: DropdownOption[]
  modelValue: string
  icon?: string
  title?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectedOption = () => {
  return props.options.find(opt => opt.value === props.modelValue)
}

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="dropdown" :class="{ open: isOpen }">
    <button class="dropdown-trigger" @click="isOpen = !isOpen" :title="title">
      <span v-if="icon" class="trigger-icon">{{ icon }}</span>
      <span class="trigger-label">{{ selectedOption()?.label }}</span>
      <svg class="trigger-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <button
          v-for="option in options"
          :key="option.value"
          class="dropdown-item"
          :class="{ active: option.value === modelValue }"
          @click="selectOption(option.value)"
        >
          <span v-if="option.icon" class="item-icon">{{ option.icon }}</span>
          <span class="item-label">{{ option.label }}</span>
          <svg v-if="option.value === modelValue" class="item-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dropdown-trigger:hover {
  border-color: var(--accent-color);
  background: var(--bg-tertiary);
}

.dropdown.open .dropdown-trigger {
  border-color: var(--accent-color);
}

.trigger-icon {
  font-size: 1rem;
}

.trigger-arrow {
  transition: transform var(--transition-fast);
}

.dropdown.open .trigger-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 160px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.dropdown-item.active {
  color: var(--accent-color);
  background: var(--accent-bg);
}

.item-icon {
  font-size: 1rem;
}

.item-label {
  flex: 1;
}

.item-check {
  color: var(--accent-color);
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
