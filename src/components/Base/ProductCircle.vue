<template>
  <div class="product_circle">
    <div class="product_circle__flip">
      <div class="product_circle__body product_circle__body-front "
           :class="'product_circle__body-' + type">
        <img v-if="type === 'sale'" src="../../assets/sale2.png" alt="">
        <img v-else-if="type === 'rating'" src="../../assets/like3.png" alt="">
      </div>
      <div class="product_circle__body product_circle__body-back"
           :class="'product_circle__body-' + type">
        <p v-if="type === 'sale'">{{ label + '%' }}</p>
        <p v-else>{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCircle",
  props:{
    type: String,
    label: Number
  },
  data(){
    return{
      modProduct: null
    }
  }
}
</script>

<style scoped lang="scss">

  .product_circle{
    display: inline-block;
    position: absolute;
    top: 5px;
    .product_circle__body{
      height: 55px;
      width: 55px;
      border-radius: 100%;
      display: grid;
      align-items: center;
      justify-items: center;
      p{
        font-weight: bold;
        color: #FFFFFF;
      }
    }
    .product_circle__body-sale{
      background-image: linear-gradient(224deg, #eb4d4b 0%, #ff6b6b 100%);
      img{
        height: 40px;
      }
    }
    .product_circle__body-rating{
      background-image: linear-gradient(224deg, #00E291 0%, #00FFA4 100%);
      img{
        height: 30px;
      }
    }
  }

  //flip style
  .product_circle {
    perspective: 1000px;
    width: 55px;
    height: 55px;
  }
  .product_circle__flip {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.3s;
    transform-style: preserve-3d;
  }
  .product_circle:hover .product_circle__flip {
    transform: rotateY(-180deg);
  }
  .product_circle__body-front, .product_circle__body-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .product_circle__body-front {
    color: black;
  }
  .product_circle__body-back {
    color: white;
    transform: rotateY(-180deg);
  }

</style>
