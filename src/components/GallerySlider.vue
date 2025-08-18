<template>
  <div class="gallery-slider">
    <Carousel
      :autoplay="2000"
      :items-to-show="2.5"
      :wrap-around="true"
    >
      <Slide v-for="(img, idx) in images" :key="idx" style="width: 40%; aspect-ratio: 4/3;">
        <img :src="img.src" :alt="img.alt" style="width: 100%; height: 100%;"/>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const props = defineProps({
  images: { type: Array, default: () => [] }
})
</script>

<style scoped>
.gallery-slider ol li {
  padding-left: 0; 
}
</style>