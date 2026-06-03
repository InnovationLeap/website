<template>
  <article ref="articleEl" v-html="content" />
</template>
<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import MarkdownIt from 'markdown-it'
import GallerySlider from './GallerySlider.vue'
import { createApp } from 'vue'

const md = new MarkdownIt({ html: true, linkify: true, breaks: true })
const props = defineProps({
  src: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['frontmatter'])
const content = ref('')
const articleEl = ref(null)

// 构建时通过 import.meta.glob 导入所有 markdown 文件
const markdownModules = import.meta.glob('/public/content/**/*.md', { query: '?raw', import: 'default', eager: true })

// Keep references to dynamically mounted slider apps to unmount on updates
let mountedSliderApps = []

function unmountSliders() {
  if (mountedSliderApps.length) {
    mountedSliderApps.forEach(app => {
      try { app.unmount() } catch {}
    })
    mountedSliderApps = []
  }
}

function enhanceGalleries() {
  const root = articleEl.value
  if (!root) return
  const galleries = root.querySelectorAll('.image-gallery')
  if (!galleries || !galleries.length) return

  galleries.forEach(container => {
    const imgs = Array.from(container.querySelectorAll('img'))
    if (!imgs.length) return
    const images = imgs.map(img => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || ''
    }))
    container.innerHTML = ''
    const app = createApp(GallerySlider, { images })
    app.mount(container)
    mountedSliderApps.push(app)
  })
}

function enhanceTables() {
  const root = articleEl.value
  if (!root) return
  const tables = root.querySelectorAll('table')
  if (!tables || !tables.length) return
  tables.forEach(t => {
    const p = t.parentElement
    if (p && p.classList && p.classList.contains('table-responsive')) return
    const wrap = document.createElement('div')
    wrap.className = 'table-responsive'
    t.parentNode.insertBefore(wrap, t)
    wrap.appendChild(t)
  })
}

function enhanceLinks() {
  const root = articleEl.value
  if (!root) return

  const links = root.querySelectorAll('a[href]')
  links.forEach(link => {
    const href = link.getAttribute('href')
    if (href && !href.startsWith('http') && !href.startsWith('//') && !link.hasAttribute('target')) {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        if (typeof window !== 'undefined' && window.router) {
          window.router.push(href)
        } else if (typeof window !== 'undefined') {
          window.location.assign(href)
        }
      })
    }
  })
}

function parseFrontMatter(text) {
  const match = text.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/)
  if (!match) return { body: text, fm: {} }
  const fmText = match[1] || ''
  const body = text.slice(match[0].length)
  const titleLine = fmText.match(/^title\s*:\s*(.+)$/m)
  let title = ''
  if (titleLine && titleLine[1]) {
    title = titleLine[1].trim()
    if ((title.startsWith('"') && title.endsWith('"')) || (title.startsWith('\'') && title.endsWith('\''))) {
      title = title.slice(1, -1)
    }
  }
  return { body, fm: { title } }
}

// 从构建时导入的模块中获取 markdown 内容
function getMarkdownContent(src) {
  // src 格式如 /content/en/about.md
  // import.meta.glob 的 key 格式为 /public/content/en/about.md
  const key = `/public${src}`
  return markdownModules[key] || null
}

async function load() {
  unmountSliders()
  if (!props.src) return

  const rawText = getMarkdownContent(props.src)
  if (!rawText) {
    console.error(`Markdown file not found: ${props.src}`)
    return
  }

  const { body, fm } = parseFrontMatter(rawText)
  const rendered = md.render(body)

  try { emit('frontmatter', fm) } catch {}
  content.value = rendered
  await nextTick()
  enhanceGalleries()
  enhanceTables()
  enhanceLinks()
  if (typeof window !== 'undefined' && window.adjustMediaAspect) {
    nextTick(window.adjustMediaAspect)
  }
}

watch(() => props.src, load, { immediate: true })

onBeforeUnmount(() => {
  unmountSliders()
})
</script>
