import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { constants } from 'zlib'

// https://vite.dev/config/
export default defineConfig({
  define: {
    BUILD_TIME: JSON.stringify(new Date())
  },
  plugins: [
    vue(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 5120,
      deleteOriginFile: false,
      compressionOptions: {
        level: 9
      }
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 5120,
      deleteOriginFile: false,
      compressionOptions: {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11
        }
      }
    })
  ],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue3-carousel'],
          utils: ['markdown-it']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsInlineLimit: 8192,
    reportCompressedSize: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'markdown-it', 'vue3-carousel']
  },
  server: {
    hmr: true,
    host: '0.0.0.0'
  }
})
