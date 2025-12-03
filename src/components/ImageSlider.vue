<template>
  <div class="image-slider">
    <transition name="fade" mode="out-in">
      <div :key="currentIndex" class="slide-container">
        <template v-if="currentImage.link.startsWith('http')">
          <a :href="currentImage.link" class="slider-link" :target="currentImage.target || '_blank'">
            <img 
              :src="currentImage.src" 
              :alt="currentImage.alt"
              class="slider-image"
            />
          </a>
        </template>
        <template v-else>
          <router-link :to="currentImage.link" class="slider-link">
            <img 
              :src="currentImage.src" 
              :alt="currentImage.alt"
              class="slider-image"
            />
          </router-link>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lang: String
})

const images = computed(() => [
  {
    src: props.lang === 'cn' ? '/images/lgr-slider.webp' : '/images/lgr-slider-en.webp',
    srcMobile: props.lang === 'cn' ? '/images/lgr-sliderm.webp' : '/images/lgr-sliderm-en.webp',
    alt: 'Legend World Remake',
    link: `/${props.lang}/legend-world-remake/`
  },
  {
    src: props.lang === 'cn' ? '/images/smwp-slider.webp' : '/images/smwp-slider-en.webp',
    srcMobile: props.lang === 'cn' ? '/images/smwp-sliderm.webp' : '/images/smwp-sliderm-en.webp',
    alt: 'Super Mario Worker Project',
    link: props.lang === 'cn' ? 'https://smwp.marioforever.net/' : `/${props.lang}/super-mario-worker-project/`,
    target: props.lang === 'cn' ? '_blank' : '_self'
  }
])

const currentIndex = ref(0)
const isMobile = ref(window.innerWidth <= 980)

const currentImage = computed(() => {
  const image = images.value[currentIndex.value]
  return {
    ...image,
    src: isMobile.value ? image.srcMobile : image.src
  }
})

let intervalId = null

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const updateMobileState = () => {
  isMobile.value = window.innerWidth <= 980
}

const preloadImages = () => {
  const allImages = []
  images.value.forEach(image => {
    allImages.push(image.src, image.srcMobile)
  })
  
  allImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

onMounted(() => {
  preloadImages()
  intervalId = setInterval(nextImage, 5000)
  window.addEventListener('resize', updateMobileState)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  window.removeEventListener('resize', updateMobileState)
})
</script>

<style scoped>
.image-slider {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slide-container {
  width: 100%;
  height: 100%;
}

.slider-link {
  display: block;
  width: 100%;
  height: 100%;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>