<template>
    <div class="carousel-wrapper">
      <div class="carousel" >
        <CarouselItem
            v-for="(item, index) in carousel_data"
            :key="item.id"
            :index="index"
            :item_data="item"
            :currentSlideIndex="currentSlideIndex"
        >
          <div class="content__img">
            <img :src="'http://localhost:8080/files/' + item.image">
<!--            <img src="../../assets/sale_banner_1.jpg">-->
          </div>
          <div class="content__text">
            <h2>{{item.name}}</h2>
            <h3>с {{item.date}}  по {{item.expirationDate}}</h3>
            <h3>Скидка {{item.discount}}%</h3>
          </div>
        </CarouselItem>
        <div class="carousel-buttons">
          <div class="carousel-button carousel-button_left" @click="prevSlide">
            <img src="../../assets/right-arrow.png" alt="">
          </div>
          <div class="carousel-button carousel-button_right" @click="nextSlide">
            <img src="../../assets/right-arrow.png" alt="">

          </div>
        </div>
      </div>


    </div>
</template>

<script>
import CarouselItem from "./CaruselItem";

export default {
  name: "Carousel",
  components:{
    CarouselItem
  },
  props:{
    carousel_data:{
      type: Array,
      default: () => []
    },
    interval: {
      type: Number,
      default: 0
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

<style  lang="scss">
.carousel-wrapper{
  height: 80vh;
}
.carousel-buttons{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .carousel-button{
    user-select: none;
    position: absolute;
    cursor: pointer;
    img{
      height: 60px;
      //filter: brightness(0) invert(1);
    }
    &_right{
      right: 0;
    }
    &_left{
      left: 0;
      img{
        transform: rotate(180deg);
      }
    }
  }

}
.carousel{
  position: relative;
  height: 100%;
  width: 100%;
  .content__img{
    height: 100%;
    img{
        object-fit: contain;
        height: 100%;
        width: 100%;
      }
  }
  .content__text{
    padding-top: 10px;
    height: 100%;
    text-align: center;
  }


}
</style>
