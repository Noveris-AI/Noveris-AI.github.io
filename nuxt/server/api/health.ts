export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  return {
    status: 'healthy',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    services: {
      content: 'ok',
      i18n: 'ok',
      search: config.public.meilisearchHost ? 'configured' : 'not_configured'
    }
  }
})
