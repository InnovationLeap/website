<template>
  <Header :lang="lang" />
  <SubNav v-if="!isHomePage" :items="subnavItems" :title="computedSubnavTitle" :download-url="downloadUrl" :download-text="downloadText" />
  <div id="main-wrapper" :class="{ 'home-main': isHomePage }">
     <ImageSlider v-if="isHomePage" :lang="lang" class="home-slider" />
     <div v-else class="container">
       <div id="content">
         <MarkdownContent :src="markdownSrc" @frontmatter="onFrontmatter" />
       </div>
     </div>
   </div>
  <Footer :lang="lang" />
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import Header from '../components/Header.vue'
import SubNav from '../components/SubNav.vue'
import Footer from '../components/Footer.vue'
import MarkdownContent from '../components/MarkdownContent.vue'
import ImageSlider from '../components/ImageSlider.vue'
import i18n from '../i18n.js'

const props = defineProps({ lang: String, page: String })
const markdownSrc = computed(() => `/content/${props.lang}/${props.page}.md`)

const isHomePage = computed(() => props.page === 'home')

const fmTitle = ref('')
function onFrontmatter(fm) {
  fmTitle.value = (fm && fm.title) ? fm.title : ''
}

watch([fmTitle,  () => props.page], () => {
  if (props.page === 'home') {
    document.title = 'INNOVATION LEAP';
  } else {
    const title = fmTitle.value;
    document.title = title ? `${title} - INNOVATION LEAP` : 'INNOVATION LEAP';
  }
}, { immediate: true });

const baseSubnavTitle = computed(() => {
  if (props.page === 'about' || props.page === 'team') return props.lang === 'cn' ? '关于' : 'About'
  if (props.page === 'legend-world-remake' || props.page === 'changelog' || props.page === 'legend-world-on-mario-worker') return props.lang === 'cn' ? 'Legend World 重制' : 'Legend World Remake'
  if (props.page === 'super-mario-worker-project' || props.page === 'super-mario-worker-project-version-archive') return 'Super Mario Worker Project'
  return ''
})

const computedSubnavTitle = computed(() => fmTitle.value || baseSubnavTitle.value)

const downloadUrl = computed(() => {
  const langData = i18n[props.lang]
  if (props.page === 'legend-world-remake' || props.page === 'changelog') return langData.legendWorldRemake?.downloadUrl
  if (props.page === 'legend-world-on-mario-worker') return langData.legendWorldMW?.downloadUrl
  if (props.page === 'super-mario-worker-project' || props.page === 'super-mario-worker-project-version-archive') return langData.smwp?.downloadUrl
  return ''
})

const downloadText = computed(() => {
  const langData = i18n[props.lang]
  if (props.page === 'legend-world-remake' || props.page === 'changelog') return langData.legendWorldRemake?.downloadText
  if (props.page === 'legend-world-on-mario-worker') return langData.legendWorldMW?.downloadText
  if (props.page === 'super-mario-worker-project' || props.page === 'super-mario-worker-project-version-archive') return langData.smwp?.downloadText
  return ''
})

const subnavItems = computed(() => {
  if (props.page === 'about' || props.page === 'team') {
    return [
      { text: props.lang === 'cn' ? '简介' : 'About us', href: `/${props.lang}/about/`, active: props.page === 'about' },
      { text: props.lang === 'cn' ? '团队' : 'Our team', href: `/${props.lang}/about/team`, active: props.page === 'team' }
    ]
  }
  if (props.page === 'legend-world-remake' || props.page === 'changelog') {
    return [
      { text: props.lang === 'cn' ? '概述' : 'Overview', href: `/${props.lang}/legend-world-remake/`, active: props.page === 'legend-world-remake' },
      { text: props.lang === 'cn' ? '更新日志' : 'Changelog', href: `/${props.lang}/legend-world-remake/changelog`, active: props.page === 'changelog' },
      { text: props.lang === 'cn' ? '了解原版' : 'MW 1.1 edition', href: `/${props.lang}/legend-world-remake/legend-world-on-mario-worker`, active: props.page === 'legend-world-on-mario-worker' }
    ]
  }
  if (props.page === 'legend-world-on-mario-worker') {
    return [
      { text: props.lang === 'cn' ? '概述' : 'Overview', href: `/${props.lang}/legend-world-remake/legend-world-on-mario-worker`, active: props.page === 'legend-world-on-mario-worker' },
      { text: props.lang === 'cn' ? '了解重制版' : 'Remake', href: `/${props.lang}/legend-world-remake/`, active: props.page === 'legend-world-remake' }
    ]
  }
  if (props.page === 'super-mario-worker-project' || props.page === 'super-mario-worker-project-version-archive') {
    return [
      { text: 'Overview', href: `/en/super-mario-worker-project/`, active: props.page === 'super-mario-worker-project' },
      { text: 'Version archive', href: `/en/super-mario-worker-project/version-archive`, active: props.page === 'super-mario-worker-project-version-archive' }
    ]
  }
  return []
})
</script>
<style scoped>
.home-slider {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
}

.home-main {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>