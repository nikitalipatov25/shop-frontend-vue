<template>
  <div class="test">
    <div class="custom-card">
      <div class="card" style="width: 18rem; margin-bottom: 25px; margin-right: 25px">
        <img
            style="height: 286px; width: 286px"
            class="card-img-top"
            :src="'http://localhost:8080/files/' + product.image"
            alt=""
            @click="$router.push({ name: 'product-page', params: { id: product.id } })"
        >
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">Стоимость за шт. {{product.price}} руб.</p>
          <p style="color: crimson" v-if="product.amount === 1"> Поторопитесь! Осталась одна штука</p>
          <p v-else-if="product.amount === 0"> Товар распродан</p>
          <p v-else> Кол-во на складе: {{product.amount}} шт.</p>
        </div>
        <div class="card-footer">
          <button v-if="product.amount === 0" class="btn btn-secondary">Добавить в корзину</button>
          <button v-else class="btn btn-primary" @click="addToCart">Добавить в корзину</button>
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
  methods: {
    addToCart() {
      CartService.addToCart(this.product.id)
    }
  }
}
</script>

<style>
</style>


