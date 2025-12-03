<template>
  <div v-if="items && items.length" class="sub-nav">
    <div class="hd nav-bar">
      <div class="container">
        <div class="title" v-if="title" ref="titleRef">
          <h2>{{ title }}</h2>
          <!-- Mobile dropdown toggle -->
          <button
            class="mobile-nav-toggle"
            type="button"
            aria-haspopup="true"
            :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
            @click="toggleMobileMenu"
            title="Open section menu"
            ref="toggleRef"
          >
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
          <!-- Mobile dropdown menu -->
          <ul v-if="mobileMenuOpen" class="mobile-nav-menu" role="menu" ref="menuRef">
            <li v-for="(item, idx) in items" :key="`m-${idx}-${item.text}`" role="menuitem">
              <router-link :to="item.href" :class="{ active: !!item.active }">{{ item.text }}</router-link>
            </li>
          </ul>
        </div>
        <div class="nav">
          <span class="nav-switch">
            <template v-for="(item, idx) in items" :key="item.text">
              <router-link class="link" :class="{ active: !!item.active }" :to="item.href">{{ item.text }}</router-link>
              <span v-if="idx < items.length - 1" class="sep">|</span>
            </template>
          </span>
          <a v-if="downloadUrl" class="btn btn-small btn-primary" target="_blank" :href="downloadUrl">{{ downloadText || 'Download' }}</a>
          <span v-else-if="downloadText" class="btn btn-small btn-gray">{{ downloadText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({ 
  items: { type: Array, default: () => [] }, 
  title: { type: String, default: '' },
  downloadUrl: { type: String, default: '' },
  downloadText: { type: String, default: '' }
})

const mobileMenuOpen = ref(false)
const titleRef = ref(null)
const menuRef = ref(null)
const toggleRef = ref(null)

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

const positionMenuWithinViewport = () => {
  const titleEl = titleRef.value
  const menuEl = menuRef.value
  const toggleEl = toggleRef.value
  if (!titleEl || !menuEl || !toggleEl) return

  // Reset to auto so we can measure natural width
  menuEl.style.left = 'auto'
  menuEl.style.right = 'auto'

  const titleRect = titleEl.getBoundingClientRect()
  const toggleRect = toggleEl.getBoundingClientRect()
  const vw = window.innerWidth

  // Use natural width within constraints
  const maxWidth = Math.min(menuEl.offsetWidth || 0, vw - 16)
  if (maxWidth > 0) menuEl.style.maxWidth = maxWidth + 'px'

  const menuWidth = menuEl.getBoundingClientRect().width || maxWidth

  // Ideal: align menu's right edge with toggle right edge
  const idealLeftViewport = toggleRect.right - menuWidth
  const minLeft = 8
  const maxLeft = vw - 8 - menuWidth
  const clampedLeftViewport = clamp(idealLeftViewport, minLeft, Math.max(minLeft, maxLeft))

  // Convert viewport left to title's local left (absolute positioned within title)
  const leftInTitle = clampedLeftViewport - titleRect.left
  menuEl.style.left = leftInTitle + 'px'
  menuEl.style.right = 'auto'
}

const toggleMobileMenu = async () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    await nextTick()
    positionMenuWithinViewport()
  }
}

// Removed navigate function as we're now using router-link instead of manual navigation

const handleClickOutside = (e) => {
  const el = titleRef.value
  if (!el) return
  if (!el.contains(e.target)) {
    mobileMenuOpen.value = false
  }
}

const handleResize = () => {
  if (mobileMenuOpen.value) positionMenuWithinViewport()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>
<style scoped>
.sep {
  margin: 0 0.25em;
}

/* Mobile dropdown styles */
.mobile-nav-toggle {
  display: none;
}
.mobile-nav-menu {
  display: none;
}

@media screen and (max-width: 736px) {
  /* Keep existing float-based layout from main.css; only add positioning */
  .sub-nav .nav-bar .title {
    position: relative;
    white-space: nowrap; /* keep on one line */
  }
  .sub-nav .nav-bar .title h2 {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    padding-right: 28px; /* reserve space for icon, no ellipsis */
  }

  .mobile-nav-toggle {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    height: 30px; /* align to h2 line-height */
    line-height: 30px;
    padding: 0 4px;
    margin-left: 0;
    border: none;
    background: transparent; /* icon only */
    color: #424242; /* primary color */
    font-size: 20px; /* icon size */
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
  .mobile-nav-toggle:hover,
  .mobile-nav-toggle:active,
  .mobile-nav-toggle[aria-expanded="true"] {
    color: #006eff; /* active color */
    background: transparent;
  }
  .mobile-nav-toggle:focus {
    outline: none;
    box-shadow: none;
  }
  .mobile-nav-toggle i {
    display: inline-block;
    transform: rotate(0deg);
    transition: transform 180ms ease;
  }
  .mobile-nav-toggle[aria-expanded="true"] i {
    transform: rotate(180deg);
  }

  /* Dropdown styles with viewport constraints */
  .mobile-nav-menu {
    display: block;
    position: absolute;
    right: auto; /* allow using computed left */
    left: 0;     /* base left, overridden inline */
    top: 100%;
    margin-top: 0.5rem;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    min-width: 160px; /* slightly smaller for tiny viewports */
    max-width: calc(100vw - 16px); /* keep inside viewport */
    box-sizing: border-box;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    z-index: 10;
    padding: 0.25rem 0;
    max-height: 60vh; /* prevent vertical overflow */
    overflow-y: auto;
  }
  .mobile-nav-menu li { list-style: none; }
  .mobile-nav-menu a {
    display: block;
    padding: 0.5rem 0.75rem;
    color: inherit;
    text-decoration: none;
    white-space: normal; /* allow wrap to stay in viewport */
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  .mobile-nav-menu a.active { font-weight: 700; }
  .mobile-nav-menu a:hover { background: #f5f5f5; color: #006eff; }
}
</style>