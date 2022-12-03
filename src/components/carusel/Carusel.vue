<template>
  <div class="wrapper">
    <div class="v-carusel" :style="{'margin-left': '-' + (100 * currentSlideIndex) + '%'}">
      <CaruselItem
          v-for="item in carusel_data"
          :key="item.id"
          :item_data="item"
      >
      </CaruselItem>
    </div>
    <button @click="prevSlide">Prev</button>
    <button @click="nextSlide">Next</button>
  </div>
</template>

<script>
import CaruselItem from '../carusel/CaruselItem'

export default {
  components: {
    CaruselItem
  },
  props: {
    carusel_data: {
      type: Array,
      default: () => []
    },
    interval: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentSlideIndex: 0
    }
  },
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--
      }
    },
    nextSlide() {
      if (this.currentSlideIndex >= this.carusel_data.length - 1) {
        this.currentSlideIndex = 0
      } else {
        this.currentSlideIndex++
      }
    }
  },
  mounted() {
    if (this. interval > 0) {
      let vm = this
      setInterval(function () {
        vm.nextSlide()
      }, vm.interval)
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  max-width: 300px;
  overflow: hidden;
  margin: 0 auto;
}
.v-carusel {
  display: flex;
  transition: all ease .5s;
}
</style>