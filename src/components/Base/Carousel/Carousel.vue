<template>
  <div class="container">
    <div class="carousel" >
      <CarouselItem
          v-for="item in carousel_data"
          :key="item.id"
          :item_data="item"
      >
<!--        <p class="carousel__item-content"><img :src="'http://localhost:8080/files/' + item.image"></p>-->
      </CarouselItem>
    </div>
    <button @click="prevSlide">Prev</button>
    <button  @click="nextSlide">Next</button>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem";

export default {
  name: "Carousel",
  components:{
    CarouselItem
  },
  props:{
    carousel_data:{
      type: Array,
    }
  },
  data(){
    return{
      currentSlideIndex: 0
    }
  },
  methods:{
    prevSlide(){
      this.currentSlideIndex = this.currentSlideIndex === 0  ? this.carousel_data.length - 1 : this.currentSlideIndex - 1
    },
    nextSlide(){
      this.currentSlideIndex = this.currentSlideIndex === this.carousel_data.length - 1 ? 0 : this.currentSlideIndex + 1
    }
  },
  mounted() {
    if(this.interval > 0){
      let vm = this
      setInterval(function (){
        vm.nextSlide()
      }, vm.interval)
    }
  }
}
</script>

<style lang="scss">
  .carousel{
    position: relative;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .carousel__item-content{
      height: 70vh;
      //width: 100vw;
    }
  }
</style>
