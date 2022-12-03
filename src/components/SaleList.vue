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
  <!--    <div class="sale__back">
      <img src="../assets/sale_banner_1.jpg" alt="">
    </div>
    <div class="sale__body">
      <div class="wrapper">
        <div class="sale__header">
          <h1 class="sale-font">{{sale.name}}</h1>
        </div>
        <div class="sale__time">
          <p>{{sale.date }} - {{ sale.expirationDate }}</p>
        </div>
        <div class="sale__desc">
          <p>{{sale.description}}</p>
        </div>
      </div>
      <div class="sale__footer">
        <div class="sale__links">
          <span>telegram</span>
        </div>
      </div>
    </div>-->

  <!--        <img-->
  <!--            :src="'http://localhost:8080/files/' + sale.image"-->
  <!--            style="width: 300px; height: 300px"-->
  <!--        >-->
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

<style lang="scss">
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
