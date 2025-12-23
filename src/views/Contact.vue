<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))

  isSubmitted.value = true
  isSubmitting.value = false
  form.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <DefaultLayout>
    <section class="contact-header">
      <div class="container">
        <h1>{{ t('contact.title') }}</h1>
        <p>{{ t('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>{{ t('contact.email') }}</h2>
            <a href="mailto:novatra.ai@novatra.cn" class="email-link">
              novatra.ai@novatra.cn
            </a>

            <div class="social-links">
              <h3>Follow Us</h3>
              <a href="https://github.com/Noveris-AI" target="_blank" class="social-link">
                <span class="social-icon">📦</span>
                GitHub
              </a>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <form v-if="!isSubmitted" @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name">{{ t('contact.form.name') }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="email">{{ t('contact.form.email') }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="message">{{ t('contact.form.message') }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="form-input"
                ></textarea>
              </div>
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? '...' : t('contact.form.send') }}
              </button>
            </form>

            <div v-else class="success-message">
              <div class="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you soon.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.contact-header {
  padding: 4rem 0;
  background: var(--bg-secondary);
  text-align: center;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.contact-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.contact-content {
  padding: 4rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
}

.contact-info h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.email-link {
  color: var(--accent-color);
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
}

.email-link:hover {
  text-decoration: underline;
}

.social-links {
  margin-top: 2rem;
}

.social-links h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.social-link:hover {
  background: var(--bg-secondary);
}

.social-icon {
  font-size: 1.25rem;
}

.contact-form {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

textarea.form-input {
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  padding: 3rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.success-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #10b981;
  color: white;
  font-size: 1.5rem;
  border-radius: 50%;
  margin: 0 auto 1rem;
}

.success-message h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
