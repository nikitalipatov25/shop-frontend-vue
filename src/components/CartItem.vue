<template>
  <div class="cart-item">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col-3">
        <img
          :src="'http://localhost:8080/files/' + product.product.image"
          width="200px"
          height="200px"
          alt="">
      </div>
      <div class="col-2">
        {{ product.product.name }}
        На складе {{product.product.amount}} шт.
      </div>
      <div class="col-3">
        {{ product.product.price }} руб.
        <button type="button" class="btn btn-primary" v-on:click="addQuantity">+</button>
        {{ product.amount }} шт.
        <button type="button" class="btn btn-primary" v-on:click="subQuantity">-</button>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-danger" @click="deleteProductFromCart">Удалить</button>
      </div>
    </div>
    <hr>
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
      currentQuantity: 1
    }
  },
  methods: {
    async addQuantity() {
      if (this.currentQuantity < this.product.product.amount) {
        this.currentQuantity++;
        let cartDTO = {
          "productId": this.product.productId,
          "amount": this.currentQuantity
        }
        await CartService.modifyProductInCart(cartDTO);
        await eventBus.$emit('addQuantity')
      }
    },
    async subQuantity() {
      if (this.currentQuantity > 1) {
        this.currentQuantity--;
        let cartDTO = {
          "productId": this.product.productId,
          "amount": this.currentQuantity
        }
        await CartService.modifyProductInCart(cartDTO);
        await eventBus.$emit('subQuantity');
      }
    },
    async deleteProductFromCart() {
      await CartService.deleteProductFromCart(this.product.productId)
      eventBus.$emit('deleteProductFromCart');
    }
  },
  created() {
    this.currentQuantity = this.product.amount;
  }
}
</script>