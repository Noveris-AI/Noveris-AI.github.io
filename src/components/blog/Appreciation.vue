<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  postSlug: string
}>()

const { t } = useI18n()

const showThanks = ref(false)
const selectedAmount = ref<number | null>(null)

const amounts = [5, 10, 20, 50]

const selectAmount = (amount: number) => {
  selectedAmount.value = amount
}

const appreciate = () => {
  if (!selectedAmount.value) return

  // In a real app, this would open a payment modal
  console.log('Appreciate with amount:', selectedAmount.value)
  showThanks.value = true

  setTimeout(() => {
    showThanks.value = false
    selectedAmount.value = null
  }, 3000)
}
</script>

<template>
  <section class="appreciation-section">
    <div class="appreciation-card">
      <div class="appreciation-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>

      <h3 class="appreciation-title">{{ t('post.appreciation') }}</h3>
      <p class="appreciation-desc">{{ t('post.appreciationDesc') }}</p>

      <Transition name="fade" mode="out-in">
        <div v-if="showThanks" class="thanks-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <p>{{ t('post.appreciationThanks') }}</p>
        </div>

        <div v-else class="appreciation-content">
          <div class="amount-buttons">
            <button
              v-for="amount in amounts"
              :key="amount"
              :class="['amount-btn', { active: selectedAmount === amount }]"
              @click="selectAmount(amount)"
            >
              ${{ amount }}
            </button>
          </div>

          <button
            class="appreciate-btn"
            :disabled="!selectedAmount"
            @click="appreciate"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            {{ t('post.appreciation') }}
          </button>

          <div class="payment-methods">
            <span class="payment-icon" title="WeChat Pay">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66l-.98 2.34 2.86-1.54C7.59 15.81 8.53 16 9.5 16c.96 0 1.9-.19 2.78-.54A5.99 5.99 0 0 1 12 14c0-3.31 3.13-6 7-6 .34 0 .67.02 1 .06C19.16 5.75 14.88 4 9.5 4zm0 10c-.28 0-.55-.02-.82-.05l-.37.2-.57.3.16-.38.19-.44-.35-.26C6.53 12.5 5.5 11.32 5.5 10c0-2.21 2.24-4 5-4s5 1.79 5 4-2.24 4-5 4z"/>
                <circle cx="7" cy="10" r="1"/>
                <circle cx="12" cy="10" r="1"/>
              </svg>
            </span>
            <span class="payment-icon" title="Alipay">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm-1 16H6c-.55 0-1-.45-1-1v-1.53c2.27-.87 4.28-2.08 5.91-3.55-1.02-1.15-1.66-2.42-1.96-3.42H7.5V8h3.75V6.75h1.5V8h3.75v1.5h-1.7c-.28 1.06-.9 2.34-1.88 3.55a16.9 16.9 0 0 0 5.08 3.28V18c0 .55-.45 1-1 1z"/>
              </svg>
            </span>
            <span class="payment-icon" title="PayPal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788l.04-.175.73-4.633.047-.256a.932.932 0 0 1 .919-.782h.578c3.748 0 6.684-1.523 7.543-5.93.359-1.84.173-3.377-.75-4.457v-.062z"/>
              </svg>
            </span>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.appreciation-section {
  margin-top: 2rem;
}

.appreciation-card {
  background: linear-gradient(135deg,
    rgba(13, 148, 136, 0.08) 0%,
    rgba(52, 211, 153, 0.05) 100%
  );
  border: 1px solid rgba(13, 148, 136, 0.2);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
}

.appreciation-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  border-radius: var(--radius-full);
  margin-bottom: 1rem;
}

.appreciation-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.appreciation-desc {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.appreciation-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.amount-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.amount-btn {
  padding: 0.75rem 1.5rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.amount-btn:hover {
  border-color: var(--accent-color);
}

.amount-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.appreciate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.appreciate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.appreciate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.payment-methods {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.payment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text-tertiary);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.payment-icon:hover {
  color: var(--accent-color);
  background: var(--accent-bg);
}

/* Thanks Message */
.thanks-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.thanks-message svg {
  color: var(--accent-color);
}

.thanks-message p {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-color);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .appreciation-card {
    padding: 1.5rem;
  }

  .amount-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .appreciate-btn {
    padding: 0.75rem 1.5rem;
  }
}
</style>
