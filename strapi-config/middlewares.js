// Strapi Middleware Configuration
// Copy this to: strapi/config/middlewares.js after Strapi is initialized

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:5173',      // Vite dev server
        'http://localhost:4173',      // Vite preview
        'http://127.0.0.1:5173',
        'https://passion-lab.github.io',  // GitHub Pages
        // Add your custom domain here if you have one
        // 'https://blog.your-domain.com',
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
