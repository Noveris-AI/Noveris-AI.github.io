// Sentry Error Monitoring Plugin
// This is a placeholder that will be configured when Sentry DSN is provided

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const sentryDsn = config.public.sentryDsn

  // Only initialize if DSN is configured
  if (!sentryDsn) {
    console.log('[Sentry] Not configured - error monitoring disabled')
    return
  }

  // In production, this would initialize Sentry:
  // import * as Sentry from '@sentry/vue'
  //
  // Sentry.init({
  //   app: nuxtApp.vueApp,
  //   dsn: sentryDsn,
  //   environment: process.env.NODE_ENV || 'development',
  //   tracesSampleRate: 0.1,
  //   replaysOnErrorSampleRate: 1.0,
  //   replaysSessionSampleRate: 0.1,
  //   integrations: [
  //     Sentry.browserTracingIntegration({
  //       router: useRouter()
  //     }),
  //     Sentry.replayIntegration()
  //   ]
  // })

  // For now, provide a simple error handler
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('[App Error]', {
      error,
      component: instance?.$options?.name,
      info
    })

    // In production with Sentry:
    // Sentry.captureException(error, {
    //   extra: { component: instance?.$options?.name, info }
    // })
  }

  // Handle unhandled promise rejections
  if (import.meta.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('[Unhandled Rejection]', event.reason)

      // In production with Sentry:
      // Sentry.captureException(event.reason)
    })
  }

  console.log('[Sentry] Placeholder initialized - configure DSN for full monitoring')
})
