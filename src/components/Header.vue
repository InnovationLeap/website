<template>
  <div id="header-wrapper">
    <header id="header" class="container">
      <div id="logo">
        <router-link :to="`/${lang}/`"><img src="/images/inleap2022.png" alt="" /></router-link>
      </div>
      <nav id="nav">
        <ul>
          <li v-for="item in cfg.nav" :key="item.text" :class="{ current: isCurrent(item.href) }">
            <template v-if="item.href.startsWith('http')">
              <a :href="item.href" :target="item.target || '_blank'">{{ item.text }}</a>
            </template>
            <template v-else>
              <router-link :to="item.href">{{ item.text }}</router-link>
            </template>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '../i18n'
const props = defineProps({ lang: { type: String, default: 'en' } })
const route = useRoute()
const lang = computed(() => props.lang)
const cfg = computed(() => i18n[props.lang] || i18n.en)
function isCurrent(href) {
  const path = route.path.replace(/\/$/, '');
  // 主页特殊处理
  if (href === `/${lang.value}/` && path === `/${lang.value}`) return true;
  // 通用：只要当前路径以导航项 href 为前缀（且 href 不为根），即视为激活
  if (href !== `/${lang.value}/` && path.startsWith(href.replace(/\/$/, ''))) {
    return true;
  }
  return path === href.replace(/\/$/, '');
}

onMounted(() => {
  // 关闭预加载动画
  document.body.classList.remove('is-preload')
})
</script>

<style scoped>
</style>