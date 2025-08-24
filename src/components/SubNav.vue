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
          >
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
          <!-- Mobile dropdown menu -->
          <ul v-if="mobileMenuOpen" class="mobile-nav-menu" role="menu">
            <li v-for="(item, idx) in items" :key="`m-${idx}-${item.text}`" role="menuitem">
              <a :href="item.href" :class="{ active: !!item.active }" @click.prevent="navigate(item.href)">{{ item.text }}</a>
            </li>
          </ul>
        </div>
        <div class="nav">
          <span class="nav-switch">
            <template v-for="(item, idx) in items" :key="item.text">
              <a class="link" :class="{ active: !!item.active }" :href="item.href">{{ item.text }}</a>
              <span v-if="idx < items.length - 1" class="sep">|</span>
            </template>
          </span>
          <a v-if="downloadUrl" class="btn btn-small btn-primary" target="_blank" :href="downloadUrl">{{ downloadText || 'Download' }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ 
  items: { type: Array, default: () => [] }, 
  title: { type: String, default: '' },
  downloadUrl: { type: String, default: '' },
  downloadText: { type: String, default: '' }
})

const mobileMenuOpen = ref(false)
const titleRef = ref(null)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const navigate = (href) => {
  mobileMenuOpen.value = false
  window.location.assign(href)
}

const handleClickOutside = (e) => {
  const el = titleRef.value
  if (!el) return
  if (!el.contains(e.target)) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
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

  /* Dropdown styles unchanged */
  .mobile-nav-menu {
    display: block;
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.5rem;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    min-width: 200px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    z-index: 10;
    padding: 0.25rem 0;
  }
  .mobile-nav-menu li { list-style: none; }
  .mobile-nav-menu a {
    display: block;
    padding: 0.5rem 0.75rem;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
  }
  .mobile-nav-menu a.active { font-weight: 700; }
  .mobile-nav-menu a:hover { background: #f5f5f5; color: #006eff; }
}
</style>