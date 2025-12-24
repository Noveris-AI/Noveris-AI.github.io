import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'docs',  // GitHub Pages for user sites can use docs/ folder
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    // Target modern browsers with fallback support
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'vendor': ['vue', 'vue-router', 'vue-i18n'],
          'markdown': ['marked', 'highlight.js'],
          'utils': ['aos', '@vueuse/head']
        },
        // Consistent naming for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const info = assetInfo.name || ''
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(info)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.css$/.test(info)) {
            return 'assets/styles/[name]-[hash][extname]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(info)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Ensure reproducible builds
    reportCompressedSize: true,
    // CSS code splitting
    cssCodeSplit: true,
    // Ensure all assets are properly emitted
    assetsInlineLimit: 4096,
    // Enable module preload for better performance
    modulePreload: {
      polyfill: true
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vue-i18n',
      '@vueuse/head',
      'aos',
      'marked',
      'highlight.js'
    ],
    // Force re-optimize on certain conditions
    force: false
  },
  // Server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: false
  },
  // Preview configuration (for testing production builds)
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: false
  },
  // Ensure proper environment variable handling
  envPrefix: 'VITE_',
  // CSS optimization
  css: {
    devSourcemap: false,
    preprocessorOptions: {}
  },
  // Enable esbuild for JSX/TSX (if needed in future)
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Ensure proper tree-shaking
    treeShaking: true
  },
  // JSON optimization
  json: {
    namedExports: true,
    stringify: false
  }
})
