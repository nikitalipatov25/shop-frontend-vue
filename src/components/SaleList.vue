<template>
  <div class="saleComponent">
    <div class="wrapper">
      <div class="sale__img">
        <img src="../assets/sale_banner_1.jpg" alt="">
      </div>
      <div class="sale__title">
        <h2>{{sale.name}}</h2>
        <h3>{{sale.date }} - {{ sale.expirationDate }}</h3>
      </div>
      <div class="sale__desc">
        <p>{{sale.description}}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    sale: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.saleComponent{
  .wrapper{
    width: 280px;
    display: grid;
    gap: 10px;
    .sale__img{
      width: 280px;
      img{
        width: 280px;
        background-size: cover;
      }
    }
    .sale__title{

    }
    .sale__desc{

    }
  }
}


</style>