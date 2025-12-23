import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import AOS from 'aos'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

// Application initialization with error handling
async function initializeApp() {
  try {
    // Global error handlers
    window.addEventListener('error', (event) => {
      console.error('[Global Error]:', event.error || event.message)
      // Track error for monitoring
      if (window.localStorage) {
        try {
          const errors = JSON.parse(localStorage.getItem('app_errors') || '[]')
          errors.push({
            message: event.error?.message || event.message,
            timestamp: new Date().toISOString(),
            stack: event.error?.stack
          })
          // Keep only last 10 errors
          localStorage.setItem('app_errors', JSON.stringify(errors.slice(-10)))
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    })

    window.addEventListener('unhandledrejection', (event) => {
      console.error('[Unhandled Promise Rejection]:', event.reason)
      // Track promise rejection
      if (window.localStorage) {
        try {
          const errors = JSON.parse(localStorage.getItem('app_errors') || '[]')
          errors.push({
            message: `Promise rejection: ${event.reason}`,
            timestamp: new Date().toISOString()
          })
          localStorage.setItem('app_errors', JSON.stringify(errors.slice(-10)))
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    })

    // Initialize AOS with error handling
    try {
      AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: false
      })
    } catch (err) {
      console.warn('[AOS Init Warning]:', err)
      // AOS is optional, continue without it
    }

    // Create Vue app
    const app = createApp(App)
    const head = createHead()

    // Vue error handler with detailed logging
    app.config.errorHandler = (err, _instance, info) => {
      console.error('[Vue Error]:', {
        error: err,
        info: info,
        timestamp: new Date().toISOString()
      })

      // Track Vue errors
      if (window.localStorage) {
        try {
          const errors = JSON.parse(localStorage.getItem('app_errors') || '[]')
          errors.push({
            type: 'vue',
            message: err instanceof Error ? err.message : String(err),
            info: info,
            timestamp: new Date().toISOString()
          })
          localStorage.setItem('app_errors', JSON.stringify(errors.slice(-10)))
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    }

    // Vue warning handler (only in development)
    if (import.meta.env.DEV) {
      app.config.warnHandler = (msg, _instance, trace) => {
        console.warn('[Vue Warning]:', msg, trace)
      }
    }

    // Install plugins
    app.use(router)
    app.use(i18n)
    app.use(head)

    // Wait for router to be ready
    await router.isReady()

    // Mount app
    const mountedApp = app.mount('#app')

    // Remove loading indicator
    setTimeout(() => {
      const loading = document.getElementById('app-loading')
      if (loading) {
        loading.style.transition = 'opacity 0.3s ease-out'
        loading.style.opacity = '0'
        setTimeout(() => {
          if (loading.parentNode) {
            loading.parentNode.removeChild(loading)
          }
        }, 300)
      }
    }, 500)

    console.log('[App]:', 'Mounted successfully at', new Date().toISOString())

    // Report successful initialization
    if (window.localStorage) {
      try {
        localStorage.setItem('app_last_success', new Date().toISOString())
      } catch (e) {
        // Ignore localStorage errors
      }
    }

    return mountedApp
  } catch (error) {
    console.error('[App Init Failed]:', error)

    // Show error to user
    const appElement = document.getElementById('app')
    if (appElement) {
      appElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
          <div style="max-width: 500px;">
            <h1 style="color: #ef4444; font-size: 1.5rem; margin-bottom: 1rem;">⚠️ Application Error</h1>
            <p style="color: #64748b; margin-bottom: 1rem;">The application failed to start. This is usually a temporary issue.</p>
            <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 2rem;">${error instanceof Error ? error.message : 'Unknown error'}</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button onclick="location.reload()" style="padding: 0.75rem 1.5rem; background: #0d9488; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem; font-weight: 500;">
                Reload Page
              </button>
              <button onclick="localStorage.clear(); location.reload()" style="padding: 0.75rem 1.5rem; background: #64748b; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem; font-weight: 500;">
                Clear Cache & Reload
              </button>
            </div>
            <p style="margin-top: 2rem; font-size: 0.75rem; color: #94a3b8;">
              If this persists, please try clearing your browser cache or contact support.
            </p>
          </div>
        </div>
      `
    }

    throw error
  }
}

// Start application
initializeApp().catch(err => {
  console.error('[Fatal Error]:', err)
})
