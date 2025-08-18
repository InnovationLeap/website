<template>
  <div v-if="items && items.length" class="sub-nav">
    <div class="hd nav-bar">
      <div class="container">
        <div class="title" v-if="title">
          <h2>{{ title }}</h2>
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
const props = defineProps({ 
  items: { type: Array, default: () => [] }, 
  title: { type: String, default: '' },
  downloadUrl: { type: String, default: '' },
  downloadText: { type: String, default: '' }
})
</script>
<style scoped>
.sep {
  margin: 0 0.25em;
}
</style>