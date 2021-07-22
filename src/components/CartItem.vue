<template>
  <div class="cart-item">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col-3">
        <img
          :src="product.catalogProductPhoto"
          width="200px"
          height="200px"
          alt="">
      </div>
      <div class="col-2">
        {{ product.catalogProductName }}
<!--         Сделать по-человечески-->
        На складе {{inStock}} шт.
      </div>
      <div class="col-3">
        {{ product.productCost }} руб.
        <button type="button" class="btn btn-primary" v-on:click="addQuantity">+</button>
        {{ product.selectedProductKol }} шт.
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
import CatalogService from '../services/catalog.service'

export default {
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      inStock: 0,
      currentQuantity: 1
    }
  },
  created() {
    this.checkStock()
  },
  methods: {
    checkStock() {
      CatalogService.getProductFromCatalog(this.product.productId).then(
        response =>{
          this.inStock = response.data.quantity;
        }
      )
    },
    async addQuantity() {
      this.checkStock()
      if (this.currentQuantity <= this.inStock) {
        this.currentQuantity++;
        let payload = {
          "selectedProductKol": this.currentQuantity,
        }
        await CartService.modifyProductInCart(this.product.productId, payload);
        eventBus.$emit('addQuantity') // - эмит на событие в корзине "обновить корзину"
      }
    },
    async subQuantity() {
      this.checkStock()
      if (this.currentQuantity >= 1) {
        this.currentQuantity--;
        let payload = {
          "selectedProductKol": this.currentQuantity,
        };
        await CartService.modifyProductInCart(this.product.productId, payload);
        eventBus.$emit('subQuantity');
      }// - эмит на событие в корзине "обновить корзину"
    },
    async deleteProductFromCart() {
      await CartService.deleteProductFromCart(this.product.productId)
      eventBus.$emit('deleteProductFromCart'); // - эмит на событие в корзине "обновить корзину"
    }
  }
}
</script>