import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

// 将 router 实例挂载到 window 对象上，以便在其他地方可以访问
window.router = router
