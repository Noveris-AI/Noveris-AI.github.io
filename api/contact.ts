import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

// Message storage (in production, use a database like MongoDB Atlas)
const messages: Map<string, Array<{
  id: string
  from: string
  name: string
  subject: string
  message: string
  timestamp: string
  type: 'sent' | 'reply'
}>> = new Map()

const transporter = nodemailer.createTransport({
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'novatra.ai@novatra.cn',
    pass: process.env.EMAIL_PASS // Set this in Vercel environment variables
  }
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const timestamp = new Date().toISOString()

      // Send email to site owner
      await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER || 'novatra.ai@novatra.cn'}>`,
        replyTo: email,
        to: process.env.EMAIL_USER || 'novatra.ai@novatra.cn',
        subject: subject || `New message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0d9488;">New Contact Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
            <p><strong>Message ID:</strong> ${messageId}</p>
            <hr style="border: 1px solid #e5e5e5;">
            <div style="padding: 16px; background: #f5f5f4; border-radius: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: 1px solid #e5e5e5;">
            <p style="color: #666; font-size: 12px;">Reply to this email to respond to the user.</p>
          </div>
        `
      })

      // Send confirmation email to user
      await transporter.sendMail({
        from: `"Noveris AI" <${process.env.EMAIL_USER || 'novatra.ai@novatra.cn'}>`,
        to: email,
        subject: `Message received - ${subject || 'Your inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0d9488;">Thank you for contacting us!</h2>
            <p>Hi ${name},</p>
            <p>We have received your message and will get back to you soon.</p>
            <hr style="border: 1px solid #e5e5e5;">
            <h3>Your message:</h3>
            <div style="padding: 16px; background: #f5f5f4; border-radius: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: 1px solid #e5e5e5;">
            <p><strong>Message ID:</strong> ${messageId}</p>
            <p style="color: #666; font-size: 12px;">Please keep this ID for your records.</p>
            <br>
            <p>Best regards,<br>Passion @ Noveris AI</p>
          </div>
        `
      })

      // Store message for history (in memory - use database in production)
      if (!messages.has(email)) {
        messages.set(email, [])
      }
      messages.get(email)!.push({
        id: messageId,
        from: email,
        name,
        subject: subject || 'No subject',
        message,
        timestamp,
        type: 'sent'
      })

      return res.status(200).json({
        success: true,
        messageId,
        message: 'Email sent successfully'
      })
    } catch (error) {
      console.error('Email error:', error)
      return res.status(500).json({
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  if (req.method === 'GET') {
    const { email } = req.query
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email required' })
    }

    const userMessages = messages.get(email) || []
    return res.status(200).json({ messages: userMessages })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
