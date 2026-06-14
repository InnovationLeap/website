import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router }) => {
    // jQuery: expose as global for legacy scripts (client only)
    if (typeof window !== 'undefined') {
      import('jquery').then(({ default: jquery }) => {
        window.jQuery = window.$ = jquery
        // Load legacy scripts in order
        return import('./lib/browser.min.js')
      }).then(() => import('./lib/breakpoints.min.js'))
        .then(() => import('./lib/jquery.dropotron.min.js'))
        .then(() => import('./lib/util.js'))
        .then(() => import('./lib/main.js'))
    }

    // 将 router 实例挂载到 window 对象上，以便在其他地方可以访问
    if (typeof window !== 'undefined') {
      router.isReady().then(() => {
        window.router = router
      })
    }
  }
)
