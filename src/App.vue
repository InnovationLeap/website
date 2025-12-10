<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
// 16:9 媒体自适应逻辑
function adjustMediaAspect() {
  const ratio = 1.777777777777777
  document.querySelectorAll('iframe').forEach(el => {
    el.style.height = (el.offsetWidth / ratio) + 'px'
  })
  document.querySelectorAll('embed').forEach(el => {
    el.style.height = (el.offsetWidth / ratio) + 'px'
  })
}
// 暴露到全局
window.adjustMediaAspect = adjustMediaAspect

function observeContent() {
  const contentEl = document.getElementById('content')
  if (contentEl && 'MutationObserver' in window) {
    const mo = new MutationObserver(() => {
      nextTick(adjustMediaAspect)
    })
    mo.observe(contentEl, { childList: true, subtree: true })
    return mo
  }
  return null
}
let mo = null
onMounted(() => {
  nextTick(adjustMediaAspect)
  window.addEventListener('resize', adjustMediaAspect)
  mo = observeContent()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustMediaAspect)
  if (mo) mo.disconnect()
  delete window.adjustMediaAspect
})
</script>

<style>
@import url('/assets/css/main.css');
@import url('/assets/css/markpro.css');
@import url('/assets/css/puhuiti.css');
@import url('/assets/css/fontawesome-all.min.css');
</style>
