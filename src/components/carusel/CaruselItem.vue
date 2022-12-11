<template>
  <div class="carousel__item" :class="index === currentSlideIndex ? 'carousel__item-active' : 'carousel__item-none'">
    <div class="carousel__item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselItem",
  props:{
    index: Number,
    item_data:{
      type: Object,
      default: () => {}
    },
    currentSlideIndex: Number
  },
}
</script>

<style lang="scss">
.carousel__item{
  position: absolute;
  height: 80%;
  width: 100%;
  top: 0;
  left: 0;
  .carousel__item__content{
    display: block;
    margin: 0 auto;
    height: 100%;
  }

}
.carousel__item-active{
  opacity: 1;
  transition-duration: .3s;
}
.carousel__item-none{
  opacity: 0;
  transition-duration: .3s;
}
</style>
