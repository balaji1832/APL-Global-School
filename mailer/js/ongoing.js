//https://github.com/Wlada/vue-carousel-3d
new Vue({
  el: '#carousel',
  data: {
    slides: 5
  },
  components: {
    'carousel-3d': Carousel3d.Carousel3d,
    'slide': Carousel3d.Slide
  }
})