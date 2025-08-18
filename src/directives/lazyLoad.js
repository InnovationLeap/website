export const vLazyLoad = {
  mounted: (el, binding) => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = binding.value
          observer.unobserve(img)
        }
      })
    })
    imageObserver.observe(el)
  }
}