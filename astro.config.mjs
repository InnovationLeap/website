import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://inleap.marioforever.net',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cn'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  redirects: {
    '/cn/team': '/cn/about/team/',
    '/en/team': '/en/about/team/',
    '/en/super-mario-worker-project': 'https://smwp.marioforever.net/',
    '/en/super-mario-worker-project/version-archive': 'https://smwp.marioforever.net/',
    '/en/super-mario-worker-project/changelog': 'https://smwp.marioforever.net/'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false
  }
})
