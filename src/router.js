import { createRouter, createWebHistory } from 'vue-router'

const Page = () => import('./pages/Page.vue')

const routes = [
  { 
    path: '/', 
    redirect: () => {
      const browserLang = navigator.language || navigator.userLanguage
      const lang = browserLang.toLowerCase().startsWith('zh') ? 'cn' : 'en'
      return `/${lang}/`
    }
  },
  { path: '/:lang(en|cn)/', component: Page, props: r => ({ lang: r.params.lang, page: 'home' }) },
  { path: '/:lang(en|cn)/about/', component: Page, props: r => ({ lang: r.params.lang, page: 'about' }) },
  { path: '/:lang(en|cn)/about/team', component: Page, props: r => ({ lang: r.params.lang, page: 'team' }) },
  { path: '/:lang(en|cn)/team/', component: Page, props: r => ({ lang: r.params.lang, page: 'team' }) },
  { path: '/:lang(en|cn)/legend-world-remake/', component: Page, props: r => ({ lang: r.params.lang, page: 'legend-world-remake' }) },
  { path: '/:lang(en|cn)/legend-world-remake/legend-world-on-mario-worker', component: Page, props: r => ({ lang: r.params.lang, page: 'legend-world-on-mario-worker' }) },
  { path: '/en/super-mario-worker-project/', component: Page, props: r => ({ lang: 'en', page: 'super-mario-worker-project' }) },
  { path: '/en/super-mario-worker-project/version-archive', component: Page, props: r => ({ lang: 'en', page: 'super-mario-worker-project-version-archive' }) }
]

export default createRouter({ history: createWebHistory(), routes })