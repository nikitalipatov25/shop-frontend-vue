<template>
  <div class="test">
    <div class="custom-card">
      <div class="card" style="width: 18rem; margin-bottom: 25px; margin-right: 25px">
        <img v-if="isDevMode"
            style="height: 286px; width: 286px"
            class="card-img-top"
            :src="'http://localhost:8080/files/' + product.image"
            alt=""
            @click="$router.push({ name: 'product-page', params: { id: product.id } })"
        >
        <img v-else
             style="height: 286px; width: 286px"
             class="card-img-top"
             :src="'https://hand-made-shop.herokuapp.com/files/' + product.image"
             alt=""
             @click="$router.push({ name: 'product-page', params: { id: product.id } })"
        >
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">Стоимость за шт. {{product.price}} руб.</p>
          <p style="color: crimson" v-if="product.amount === 1"> Поторопитесь! Осталась одна штука</p>
          <p v-else-if="product.amount === 0"> Товар распродан</p>
          <p v-else> Кол-во на складе: {{product.amount}} шт.</p>
          <div v-if="product.sale !== null">
            <p>Скидка {{product.sale.discount}}%</p>
            <p>Стоимость с учетом скидки {{priceWithDiscount}}</p>
          </div>
        </div>
        <div class="card-footer">
          <button v-if="product.amount === 0" class="btn btn-secondary">Добавить в корзину</button>
          <button v-else class="btn btn-primary" @click="addProductToCart">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
import CartService from '../services/cart.service'

export default {
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      priceWithDiscount: 0,
      isDevMode: false
    }
  },
  methods: {
    calculateDiscount() {
      if (this.product.sale !== null) {
        this.priceWithDiscount = (this.product.price / 100) * (100 - this.product.sale.discount);
      }

    },
    addProductToCart() {
      let cartDTO = {
        "productId": this.product.id,
        "amount": 1
      }
      CartService.addProductToCart(cartDTO);
    }
  },
  created() {
    this.calculateDiscount();
    if (process.env.NODE_ENV === 'development') {
      this.isDevMode = true;
    }
  }
}
</script>

<style>
</style>


