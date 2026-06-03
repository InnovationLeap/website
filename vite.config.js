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
        manualChunks(id) {
          if (id.includes('node_modules/vue/') || id.includes('node_modules/@vue/') || id.includes('node_modules/vue-router/') || id.includes('node_modules/vue3-carousel/')) {
            return 'vendor'
          }
          if (id.includes('node_modules/markdown-it/')) {
            return 'utils'
          }
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
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false
    },
    // 预渲染的路由列表
    includedRoutes: () => [
      '/cn/',
      '/cn/about/',
      '/cn/about/team/',
      '/cn/team/',
      '/cn/legend-world-remake/',
      '/cn/legend-world-remake/legend-world-on-mario-worker/',
      '/cn/legend-world-remake/changelog/',
      '/en/',
      '/en/about/',
      '/en/about/team/',
      '/en/team/',
      '/en/legend-world-remake/',
      '/en/legend-world-remake/legend-world-on-mario-worker/',
      '/en/legend-world-remake/changelog/',
      '/en/super-mario-worker-project/',
      '/en/super-mario-worker-project/version-archive/',
      '/en/super-mario-worker-project/changelog/'
    ]
  }
})
