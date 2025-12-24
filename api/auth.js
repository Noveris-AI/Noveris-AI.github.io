// Serverless function for GitHub OAuth authentication
// Deploy this to Vercel/Netlify to enable CMS authentication

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Get authorization code from query
  const { code } = req.query

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    })

    const data = await tokenResponse.json()

    if (data.error) {
      return res.status(400).json(data)
    }

    // Return token with HTML script to send message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Authorization Success</title></head>
        <body>
          <script>
            window.opener.postMessage('authorization:github:success:${JSON.stringify(data)}', window.location.origin);
            window.close();
          </script>
          <p>Authorization successful. You can close this window.</p>
        </body>
      </html>
    `
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (error) {
    console.error('Auth error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
}
