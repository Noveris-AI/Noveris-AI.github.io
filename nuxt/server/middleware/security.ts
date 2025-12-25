// Security headers middleware
export default defineEventHandler((event) => {
  // Only add headers for HTML responses
  if (!event.path.endsWith('.json') && !event.path.startsWith('/api/')) {
    // Content Security Policy
    setResponseHeader(event, 'Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://giscus.app",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://giscus.app https://*.meilisearch.com wss://giscus.app",
      "frame-src https://giscus.app",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; '))

    // Security headers
    setResponseHeader(event, 'X-Content-Type-Options', 'nosniff')
    setResponseHeader(event, 'X-Frame-Options', 'DENY')
    setResponseHeader(event, 'X-XSS-Protection', '1; mode=block')
    setResponseHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
    setResponseHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    // HSTS (only in production)
    if (process.env.NODE_ENV === 'production') {
      setResponseHeader(
        event,
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    }
  }
})
