<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const { t, locale } = useI18n()

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  type: 'sent' | 'reply'
  status?: 'pending' | 'sent' | 'failed'
}

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const activeTab = ref<'form' | 'history'>('form')
const messages = ref<Message[]>([])

// Load messages from localStorage
onMounted(() => {
  const savedMessages = localStorage.getItem('noveris_messages')
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages)
  }

  const savedEmail = localStorage.getItem('noveris_user_email')
  const savedName = localStorage.getItem('noveris_user_name')
  if (savedEmail) form.value.email = savedEmail
  if (savedName) form.value.name = savedName
})

// Save messages to localStorage
const saveMessages = () => {
  localStorage.setItem('noveris_messages', JSON.stringify(messages.value))
}

const handleSubmit = async () => {
  isSubmitting.value = true
  showError.value = false
  showSuccess.value = false

  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const timestamp = new Date().toISOString()

  // Save user info for convenience
  localStorage.setItem('noveris_user_email', form.value.email)
  localStorage.setItem('noveris_user_name', form.value.name)

  // Add message to history immediately with pending status
  const newMessage: Message = {
    id: messageId,
    name: form.value.name,
    email: form.value.email,
    subject: form.value.subject || t('contact.noSubject'),
    message: form.value.message,
    timestamp,
    type: 'sent',
    status: 'pending'
  }
  messages.value.unshift(newMessage)
  saveMessages()

  try {
    // Try to send via API (works on Vercel)
    const apiUrl = import.meta.env.PROD
      ? '/api/contact'
      : 'http://localhost:3000/api/contact'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      })
    })

    if (response.ok) {
      // Update message status
      const msgIndex = messages.value.findIndex(m => m.id === messageId)
      if (msgIndex !== -1) {
        const msg = messages.value[msgIndex]
        if (msg) {
          msg.status = 'sent'
          saveMessages()
        }
      }

      showSuccess.value = true
      form.value = { name: form.value.name, email: form.value.email, subject: '', message: '' }
    } else {
      throw new Error('API request failed')
    }
  } catch (error) {
    // Fallback: Open mailto link
    const mailtoUrl = `mailto:novatra.ai@novatra.cn?subject=${encodeURIComponent(form.value.subject || 'Contact from ' + form.value.name)}&body=${encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`)}`

    window.open(mailtoUrl, '_blank')

    // Update message status
    const msgIndex = messages.value.findIndex(m => m.id === messageId)
    if (msgIndex !== -1) {
      const msg = messages.value[msgIndex]
      if (msg) {
        msg.status = 'sent'
        saveMessages()
      }
    }

    showSuccess.value = true
    form.value = { name: form.value.name, email: form.value.email, subject: '', message: '' }
  }

  isSubmitting.value = false
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const clearHistory = () => {
  if (confirm(locale.value === 'zh' ? 'Are you sure you want to clear all message history?' : 'Are you sure you want to clear all message history?')) {
    messages.value = []
    saveMessages()
  }
}

const deleteMessage = (id: string) => {
  messages.value = messages.value.filter(m => m.id !== id)
  saveMessages()
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'sent': return '#10b981'
    case 'pending': return '#f59e0b'
    case 'failed': return '#ef4444'
    default: return '#10b981'
  }
}

const getStatusText = (status?: string) => {
  switch (status) {
    case 'sent': return locale.value === 'zh' ? 'Sent' : 'Sent'
    case 'pending': return locale.value === 'zh' ? 'Sending...' : 'Sending...'
    case 'failed': return locale.value === 'zh' ? 'Failed' : 'Failed'
    default: return locale.value === 'zh' ? 'Sent' : 'Sent'
  }
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

            <div class="info-card">
              <span class="info-icon">⏰</span>
              <div>
                <h4>{{ locale === 'zh' ? 'Response Time' : 'Response Time' }}</h4>
                <p>{{ locale === 'zh' ? 'Usually within 24 hours' : 'Usually within 24 hours' }}</p>
              </div>
            </div>

            <div class="info-card">
              <span class="info-icon">📧</span>
              <div>
                <h4>{{ locale === 'zh' ? 'Email Protocol' : 'Email Protocol' }}</h4>
                <p>IMAP/SMTP (SSL encrypted)</p>
              </div>
            </div>

            <div class="social-links">
              <h3>{{ locale === 'zh' ? 'Follow Me' : 'Follow Me' }}</h3>
              <a href="https://github.com/Noveris-AI" target="_blank" class="social-link">
                <span class="social-icon">📦</span>
                GitHub
              </a>
            </div>
          </div>

          <div class="contact-main">
            <div class="tabs">
              <button
                :class="['tab-btn', { active: activeTab === 'form' }]"
                @click="activeTab = 'form'"
              >
                {{ locale === 'zh' ? 'Send Message' : 'Send Message' }}
              </button>
              <button
                :class="['tab-btn', { active: activeTab === 'history' }]"
                @click="activeTab = 'history'"
              >
                {{ locale === 'zh' ? 'Message History' : 'Message History' }}
                <span v-if="messages.length" class="badge">{{ messages.length }}</span>
              </button>
            </div>

            <!-- Form Tab -->
            <div v-if="activeTab === 'form'" class="contact-form-wrapper">
              <div v-if="showSuccess" class="success-message">
                <div class="success-icon">✓</div>
                <h3>{{ locale === 'zh' ? 'Message Sent!' : 'Message Sent!' }}</h3>
                <p>{{ locale === 'zh' ? 'Thank you for reaching out. We will reply to your email soon.' : 'Thank you for reaching out. We will reply to your email soon.' }}</p>
                <button class="btn-secondary" @click="showSuccess = false; activeTab = 'history'">
                  {{ locale === 'zh' ? 'View History' : 'View History' }}
                </button>
              </div>

              <form v-else @submit.prevent="handleSubmit" class="contact-form">
                <div v-if="showError" class="error-message">
                  {{ errorMessage }}
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="name">{{ t('contact.form.name') }} *</label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="form-input"
                      :placeholder="locale === 'zh' ? 'Your name' : 'Your name'"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">{{ t('contact.form.email') }} *</label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="form-input"
                      :placeholder="locale === 'zh' ? 'your@email.com' : 'your@email.com'"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="subject">{{ locale === 'zh' ? 'Subject' : 'Subject' }}</label>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    class="form-input"
                    :placeholder="locale === 'zh' ? 'What is this about?' : 'What is this about?'"
                  />
                </div>

                <div class="form-group">
                  <label for="message">{{ t('contact.form.message') }} *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    required
                    class="form-input"
                    :placeholder="locale === 'zh' ? 'Your message...' : 'Your message...'"
                  ></textarea>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner"></span>
                  {{ isSubmitting ? (locale === 'zh' ? 'Sending...' : 'Sending...') : t('contact.form.send') }}
                </button>

                <p class="form-note">
                  {{ locale === 'zh' ? 'Your message will be sent to novatra.ai@novatra.cn. We will reply directly to your email.' : 'Your message will be sent to novatra.ai@novatra.cn. We will reply directly to your email.' }}
                </p>
              </form>
            </div>

            <!-- History Tab -->
            <div v-else class="history-wrapper">
              <div v-if="messages.length === 0" class="empty-history">
                <span class="empty-icon">📭</span>
                <h3>{{ locale === 'zh' ? 'No messages yet' : 'No messages yet' }}</h3>
                <p>{{ locale === 'zh' ? 'Your sent messages will appear here.' : 'Your sent messages will appear here.' }}</p>
                <button class="btn-primary" @click="activeTab = 'form'">
                  {{ locale === 'zh' ? 'Send your first message' : 'Send your first message' }}
                </button>
              </div>

              <div v-else class="messages-list">
                <div class="history-header">
                  <h3>{{ locale === 'zh' ? 'Your Messages' : 'Your Messages' }}</h3>
                  <button class="btn-text" @click="clearHistory">
                    {{ locale === 'zh' ? 'Clear All' : 'Clear All' }}
                  </button>
                </div>

                <div
                  v-for="msg in messages"
                  :key="msg.id"
                  :class="['message-card', msg.type]"
                >
                  <div class="message-header">
                    <div class="message-meta">
                      <span class="message-subject">{{ msg.subject }}</span>
                      <span class="message-status" :style="{ color: getStatusColor(msg.status) }">
                        {{ getStatusText(msg.status) }}
                      </span>
                    </div>
                    <button class="delete-btn" @click="deleteMessage(msg.id)" title="Delete">×</button>
                  </div>
                  <div class="message-body">
                    {{ msg.message }}
                  </div>
                  <div class="message-footer">
                    <span class="message-time">{{ formatDate(msg.timestamp) }}</span>
                    <span class="message-id">ID: {{ msg.id }}</span>
                  </div>
                </div>

                <div class="history-note">
                  <span class="note-icon">💡</span>
                  <p>{{ locale === 'zh' ? 'Replies will be sent to your email address. Check your inbox for responses.' : 'Replies will be sent to your email address. Check your inbox for responses.' }}</p>
                </div>
              </div>
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
  max-width: 1100px;
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
  grid-template-columns: 280px 1fr;
  gap: 3rem;
}

.contact-info h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.email-link {
  color: var(--accent-color);
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 600;
}

.email-link:hover {
  text-decoration: underline;
}

.info-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-icon {
  font-size: 1.5rem;
}

.info-card h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.info-card p {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.social-links {
  margin-top: 2rem;
}

.social-links h3 {
  font-size: 1rem;
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

.contact-main {
  background: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--accent-color);
  border-bottom: 2px solid var(--accent-color);
  margin-bottom: -1px;
}

.badge {
  background: var(--accent-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
}

.contact-form-wrapper,
.history-wrapper {
  padding: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
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
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(13, 148, 136, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form-note {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
}

.success-message {
  text-align: center;
  padding: 3rem 2rem;
}

.success-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #10b981;
  color: white;
  font-size: 1.5rem;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
}

.success-message h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.btn-primary {
  padding: 0.875rem 1.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  padding: 0.75rem 1.25rem;
  background: var(--bg-primary);
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-text {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-text:hover {
  color: #ef4444;
}

.empty-history {
  text-align: center;
  padding: 3rem;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-history h3 {
  margin-bottom: 0.5rem;
}

.empty-history p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.history-header h3 {
  font-size: 1rem;
  font-weight: 600;
}

.message-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
}

.message-card.sent {
  border-left: 3px solid var(--accent-color);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.message-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.message-subject {
  font-weight: 600;
  color: var(--text-primary);
}

.message-status {
  font-size: 0.75rem;
  font-weight: 500;
}

.delete-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #fef2f2;
  color: #ef4444;
}

.message-body {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 1rem;
}

.message-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.history-note {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(13, 148, 136, 0.1);
  border-radius: 8px;
  margin-top: 1rem;
}

.note-icon {
  font-size: 1.25rem;
}

.history-note p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-info {
    order: 1;
  }
}
</style>
