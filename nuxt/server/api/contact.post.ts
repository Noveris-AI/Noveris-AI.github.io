import { z } from 'zod'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0).optional() // Anti-spam honeypot
})

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5 // requests per hour
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

export default defineEventHandler(async (event) => {
  // Only allow POST
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  }

  // Get client IP
  const ip = getHeader(event, 'x-forwarded-for')?.split(',')[0] ||
    getHeader(event, 'x-real-ip') ||
    'unknown'

  // Check rate limit
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      message: 'Too many requests. Please try again later.'
    })
  }

  // Parse and validate body
  const body = await readBody(event)

  try {
    const validated = contactSchema.parse(body)

    // Check honeypot (anti-spam)
    if (validated.honeypot) {
      // Silently ignore spam
      return { success: true, message: 'Message sent successfully' }
    }

    // Generate message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`

    // Create message record
    const message = {
      id: messageId,
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ip: ip.substring(0, 50), // Truncate for privacy
      userAgent: getHeader(event, 'user-agent')?.substring(0, 200)
    }

    // In production, this would:
    // 1. Save to database or Git-based storage
    // 2. Send email notification
    // 3. Add to queue for processing

    // For now, just log it
    console.log('[Contact] New message:', {
      id: message.id,
      from: message.email,
      subject: message.subject
    })

    // TODO: Integrate with email service
    // const config = useRuntimeConfig()
    // await sendEmail({
    //   to: 'contact@noveris.ai',
    //   subject: `New contact: ${validated.subject}`,
    //   body: `From: ${validated.name} <${validated.email}>\n\n${validated.message}`
    // })

    return {
      success: true,
      message: 'Message sent successfully',
      messageId
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to send message. Please try again later.'
    })
  }
})
