// Serverless function for GitHub OAuth authentication
// Handles Sveltia CMS authentication flow

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

  const { code, provider } = req.query

  // Step 1: Initial authorization request - redirect to GitHub
  if (!code) {
    if (!clientId) {
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'GITHUB_CLIENT_ID not configured'
      })
    }

    // Redirect to GitHub OAuth authorization page
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`
    return res.redirect(302, redirectUrl)
  }

  // Step 2: Handle OAuth callback - exchange code for token
  try {
    if (!clientSecret) {
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'GITHUB_CLIENT_SECRET not configured'
      })
    }

    // Exchange authorization code for access token
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
      console.error('GitHub OAuth error:', data)
      return res.status(400).json(data)
    }

    // Return success page that sends message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Authorization Successful</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .success {
              color: #0d9488;
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            h1 {
              color: #333;
              margin-bottom: 0.5rem;
            }
            p {
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✓</div>
            <h1>Authorization Successful</h1>
            <p>You can close this window and return to the CMS.</p>
          </div>
          <script>
            (function() {
              try {
                const token = ${JSON.stringify(data.access_token)};
                const provider = 'github';

                // Send message to opener window (CMS)
                if (window.opener) {
                  window.opener.postMessage(
                    'authorization:' + provider + ':success:' + JSON.stringify({
                      token: token,
                      provider: provider
                    }),
                    window.location.origin
                  );

                  // Close after a short delay
                  setTimeout(() => {
                    window.close();
                  }, 1000);
                } else {
                  console.error('No opener window found');
                }
              } catch (error) {
                console.error('Error sending auth message:', error);
              }
            })();
          </script>
        </body>
      </html>
    `

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)

  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({
      error: 'Authentication failed',
      message: error.message
    })
  }
}
