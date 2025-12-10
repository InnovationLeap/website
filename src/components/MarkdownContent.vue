<template>
  <article ref="articleEl" v-html="content" />
</template>
<script setup>
import { ref, watch, nextTick, onBeforeUnmount, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import GallerySlider from './GallerySlider.vue'
import { createApp } from 'vue'

const md = new MarkdownIt({ html: true, linkify: true, breaks: false })
const props = defineProps({ src: String })
const emit = defineEmits(['frontmatter'])
const content = ref('')
const articleEl = ref(null)

// 内容缓存，避免重复请求和渲染
const contentCache = new Map()
// 所有markdown文件的路径，用于预加载
const allMarkdownPaths = [
  // Chinese files
  '/content/cn/about.md',
  '/content/cn/changelog.md',
  '/content/cn/legend-world-on-mario-worker.md',
  '/content/cn/legend-world-remake.md',
  '/content/cn/team.md',
  // English files
  '/content/en/about.md',
  '/content/en/changelog.md',
  '/content/en/legend-world-on-mario-worker.md',
  '/content/en/legend-world-remake.md',
  '/content/en/super-mario-worker-project-changelog.md',
  '/content/en/super-mario-worker-project-version-archive.md',
  '/content/en/super-mario-worker-project.md',
  '/content/en/team.md'
]
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
    // Collect images
    const imgs = Array.from(container.querySelectorAll('img'))
    if (!imgs.length) return
    const images = imgs.map(img => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || ''
    }))
    // Clear existing content
    container.innerHTML = ''
    // Mount a Vue app with the GallerySlider component into this container
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
  
  // 处理内部链接，使用 click 事件替代 a 标签的默认行为
  const links = root.querySelectorAll('a[href]')
  links.forEach(link => {
    const href = link.getAttribute('href')
    // 检查是否为内部链接（相对路径或站内绝对路径）
    if (href && !href.startsWith('http') && !href.startsWith('//') && !link.hasAttribute('target')) {
      // 添加点击事件监听器来使用 router 进行导航
      link.addEventListener('click', (e) => {
        e.preventDefault()
        // 使用 Vue Router 进行导航
        if (typeof window !== 'undefined' && window.router) {
          window.router.push(href)
        } else {
          // 降级处理：如果 router 不可用，则使用 location.assign
          window.location.assign(href)
        }
      })
    }
  })
}

function parseFrontMatter(text) {
  // Match YAML front matter starting and ending with ---
  const match = text.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/)
  if (!match) return { body: text, fm: {} }
  const fmText = match[1] || ''
  const body = text.slice(match[0].length)
  // Extract title: value may be quoted or unquoted
  const titleLine = fmText.match(/^title\s*:\s*(.+)$/m)
  let title = ''
  if (titleLine && titleLine[1]) {
    title = titleLine[1].trim()
    // Remove surrounding quotes if present
    if ((title.startsWith('"') && title.endsWith('"')) || (title.startsWith("'") && title.endsWith("'"))) {
      title = title.slice(1, -1)
    }
  }
  return { body, fm: { title } }
}

// Preload all markdown files into cache
async function preloadMarkdownFiles() {
  for (const path of allMarkdownPaths) {
    if (!contentCache.has(path)) {
      try {
        const res = await fetch(path)
        const txt = await res.text()
        const { body, fm } = parseFrontMatter(txt)
        const rendered = md.render(body)
        contentCache.set(path, { rendered, fm })
      } catch (error) {
        console.error(`Failed to preload ${path}:`, error)
      }
    }
  }
}

async function load() {
  // Unmount any previously mounted sliders when source changes
  unmountSliders()
  if (!props.src) return
  
  // Check if content is already in cache
  if (contentCache.has(props.src)) {
    const cached = contentCache.get(props.src)
    content.value = cached.rendered
    try { emit('frontmatter', cached.fm) } catch {}
    await nextTick()
    enhanceGalleries()
    enhanceTables()
    enhanceLinks()
    // 触发全局 iframe 自适应
    if (window.adjustMediaAspect) {
      nextTick(window.adjustMediaAspect)
    }
    return
  }
  
  // If not in cache, fetch and process
  const res = await fetch(props.src)
  const txt = await res.text()
  const { body, fm } = parseFrontMatter(txt)
  const rendered = md.render(body)
  
  // Cache the processed content
  contentCache.set(props.src, { rendered, fm })
  
  // Emit front matter to parent (for SubNav title override)
  try { emit('frontmatter', fm) } catch {}
  content.value = rendered
  await nextTick()
  enhanceGalleries()
  enhanceTables()
  enhanceLinks()
  // 触发全局 iframe 自适应
  if (window.adjustMediaAspect) {
    nextTick(window.adjustMediaAspect)
  }
}

watch(() => props.src, load, { immediate: true })

onMounted(() => {
  // Preload all markdown files in background when component mounts
  preloadMarkdownFiles()
})

onBeforeUnmount(() => {
  unmountSliders()
})
</script>
<style scoped></style>