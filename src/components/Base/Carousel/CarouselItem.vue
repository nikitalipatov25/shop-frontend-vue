<template>
  <div class="carousel__item" :class="index === currentSlideIndex ? 'carousel__item-active' : 'carousel__item-none'">
      <slot></slot>
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
    min-width: 100vh;
    position: absolute;
    width: 100%;
    img{
      height: auto;
      width: auto;
    }
  }
  .carousel__item-active{
    opacity: 1;
    //display: block;
    transition-duration: .3s;
    //transform: scale(1.08);

  }
  .carousel__item-none{
    opacity: 0;
    //display: none;
    transition-duration: .3s;
  }
</style>
