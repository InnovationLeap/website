<template>
  <div id="footer-wrapper">
    <footer id="footer" class="container">
      <div class="row">
        <div v-for="(section, i) in cfg.footer.sections" :key="i" class="col-3 col-6-medium col-12-small">
          <section :class="section.title === 'Social media' ? 'widget contact' : 'widget links'">
            <h3>{{ section.title }}</h3>
            <ul :class="section.title === 'Social media' ? '' : 'style2'">
              <li v-for="(link, idx) in section.links" :key="idx">
                <a v-if="link.icon" :href="link.href" :target="link.target || null" :class="`icon brands ${link.icon}`">
                  <span class="label">{{ link.icon.includes('x-twitter') ? 'X' : link.icon.replace('fa-', '') }}</span>
                </a>
                <span v-else-if="!link.href">{{ link.text }}</span>
                <a v-else :href="link.href" :target="link.target || null">{{ link.text }}</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div id="copyright">
            <ul class="menu">
              <li v-html="cfg.footer.copyright"></li>
              <li><a :href="switchLangUrl" @click.prevent="switchLanguage">{{ cfg.footer.switchLang.text }}</a></li>
              <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import i18n from '../i18n'

const props = defineProps({ lang: { type: String, default: 'en' } })
const route = useRoute()
const router = useRouter()

const cfg = computed(() => i18n[props.lang] || i18n.en)

const switchLangUrl = computed(() => {
  const currentPath = route.path
  const isEn = props.lang === 'en'
  
  // 特殊处理：如果在SMWP页面点击中文，跳转到SMWP官网
  if (isEn && currentPath.includes('/super-mario-worker-project')) {
    return 'https://smwp.marioforever.net/'
  }
  
  // 正常路径切换
  const newLang = isEn ? 'cn' : 'en'
  return currentPath.replace(/^\/(en|cn)/, `/${newLang}`)
})

const switchLanguage = () => {
  const targetUrl = switchLangUrl.value
  // 如果是外部链接（如SMWP官网），直接跳转
  if (targetUrl.startsWith('http')) {
    window.location.href = targetUrl
  } else {
    // 使用 window.location 替代 router.push，强制刷新页面
    window.location.assign(targetUrl)
  }
}
</script>
<style scoped></style>