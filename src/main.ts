import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import AOS from 'aos'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

// Initialize AOS
AOS.init({
  duration: 600,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50
})

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(i18n)
app.use(head)

app.mount('#app')
