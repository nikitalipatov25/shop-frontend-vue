<template>
  <div class="cart-item_mob">
    <div class="row row_img">
      <div class="item__el item__image">
        <img
            :src="'http://localhost:8080/files/' + product.product.image"
            alt="">
      </div>
    </div>
    <div class="row row_inf">
      <div class="item__el item__label">
        <h3>{{ product.product.name }}</h3>
      </div>
      <div class="row row_price-counter">
        <div class="item__el item__total-price">
          <h3>{{ product.product.price * product.amount }} &#x20bd; </h3>
        </div>
        <div class="item__el item__counter">
          <button type="button" class="" v-on:click="subQuantity">-</button>
          <h3>{{ product.amount }} шт.</h3>
          <button type="button" class="" v-on:click="addQuantity">+</button>
        </div>
      </div>
    </div>
    <div class="row row_del">
      <div class="item__el item__del" @click="deleteProductFromCart">
          <img src="../assets/cross.png"  >
      </div>
      <div class="item__el item__select">
        <!--   checkbox для удаления    -->
        <input @change="setDelList(isChecked, product.productId)" v-model="isChecked" type="checkbox">

      </div>
    </div>

  </div>
</template>

<script>
import { eventBus } from '../main'
import CartService from '../services/cart.service'

export default {
  props: {
    setDelList: Function,
    product: {
      type: Object
    }
  },
  data() {
    return {
      currentQuantity: 1,
      isChecked: false
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

<style lang="scss">
  .cart-item_mob{
    min-width: 280px;
    padding: 20px 10px;
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    column-gap: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    transition: 0.3s;
    &:hover{
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
      transform: scale(1.01);
      transition: 0.3s;
    }
    .row_inf{
      display: grid;
      grid-template-rows: auto auto;
      justify-items: start;
      gap: 10px;
      .row_price-counter{
        display: grid;
        grid-template-columns: 60px auto;
        justify-items: start;
        align-items: center;
        gap: 15px;
      }
    }
    .row_del{
      width: 100%;
      height: 100%;
      display: grid;
      gap: 15px;
      grid-template-rows: 15px 15px;

    }
    .item__el{
      text-align: center;
    }
    .row_img{
      .item__image{
        display: grid;
        justify-items: start;
        img{
          height: 80px;
          width: 55px;
        }
      }
    }

    .item__label{
      h3{
        color: #1BB0CE;
      }
    }
    .item__counter{
      display: grid;
      grid-template-columns: 10px 60px 10px;
      align-items: center;
      justify-items: center;
      button{
        font-size: 30px;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        background: none;
      }
    }
    .item__del{
      img{
        cursor: pointer;
        height: 15px;
      }
    }
  }
</style>
