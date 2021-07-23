<template>
  <div class="custom-list">
    <hr>
    <div class="row">
      <div class="col-3">
        <img
            :src="product.photo"
            style="width: 286px; height: 286px"
            @click="$router.push({ name: 'product-page', params: { id: product.id } })"
        >
      </div>
      <div class="col-3">
        <p>{{product.name}}</p>
        <p v-if="product.promotionPrice === 0">Стоимость за шт. {{product.price}} руб.</p>
        <p v-else>Стоимость за шт. {{product.promotionPrice}} руб.</p>
        <p style="color: crimson" v-if="product.quantity === 1"> Поторопитесь! Осталась одна штука</p>
        <p v-else-if="product.quantity === 0"> Товар распродан</p>
        <p v-else> Кол-во на складе: {{product.quantity}} шт.</p>
      </div>
      <div class="col-3">
        <button v-if="product.quantity === 0" class="btn btn-secondary">Добавить в корзину</button>
        <button v-else class="btn btn-primary" @click="addToCart">Добавить в корзину</button>
      </div>
    </div>

  </div>
</template>

<script>
import { eventBus } from '../main'
import CartService from '../services/cart.service'

export default {
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      byDefault: 'list',
      list: false,
      card : true,
    }
  },
  methods: {
    addToCart() {
        CartService.addToCart(this.product.id)
      // await this.$api.cart.addItemToCart(this.product.id);
      // eventBus.$emit('addToCart');
    },
    async deleteFromCart() {
      this.$api.cart.deleteItemFromCart(this.product.id);
      eventBus.$emit('deleteFromCart');
    },
  }
}
</script>

