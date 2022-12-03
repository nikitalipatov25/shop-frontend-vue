<template>
  <div class="carousel__item" :class="index === currentSlideIndex ? 'carousel__item-active' : 'carousel__item-none'">
      <slot>
        {{item_data.name}}
       <img :src="'http://localhost:8080/files/' + item_data.image">
      </slot>
  </div>
</template>

<script>

export default {
  name: "CarouselItem",
  props:{
    item_data:{
      type: Object,
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
