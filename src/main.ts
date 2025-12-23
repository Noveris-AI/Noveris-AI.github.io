import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import AOS from 'aos'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

// Initialize AOS
AOS.init({
  duration: 600,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50
})

const app = createApp(App)
const head = createHead()

// Vue error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err, info)
}

app.use(router)
app.use(i18n)
app.use(head)

// Ensure router is ready before mounting
router.isReady().then(() => {
  app.mount('#app')
  console.log('App mounted successfully')
})
