import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router }) => {
    // 将 router 实例挂载到 window 对象上，以便在其他地方可以访问
    if (typeof window !== 'undefined') {
      router.isReady().then(() => {
        window.router = router
      })
    }
  }
)
