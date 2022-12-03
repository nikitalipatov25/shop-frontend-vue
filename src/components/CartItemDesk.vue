<template>
  <tr class="cart-item_desk">
    <td class="item__el item__image">
      <img
          :src="'http://localhost:8080/files/' + product.product.image"
          alt="">
    </td>
    <td class="item__el item__label">
      <h4>{{ product.product.name }}</h4>
    </td>
    <td class="item__el">
      <div class="item__counter">
        <button type="button" class="" v-on:click="subQuantity">-</button>
        <h4>{{ product.amount }} шт.</h4>
        <button type="button" class="" v-on:click="addQuantity">+</button>
      </div>
    </td>
    <td class="item__el item__total-price">
      <h4>{{ product.product.price * product.amount }} &#x20bd; </h4>
    </td>
    <!--   checkbox для удаления    -->
    <td class="item__el ">
      <div class="item__del">
        <div>
          <input @change="setDelList(isChecked, product.productId)" v-model="isChecked" type="checkbox">
        </div>
        <div @click="deleteProductFromCart">
          <img src="../assets/cross.png"  >
        </div>
      </div>
    </td>
  </tr>
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
.cart-item_desk{
  width: 280px;
  .row_del{
    width: 100%;
    height: 100%;
  }
  .item__el{
    text-align: center;
  }
  .item__image{
    img{
      //max-height: 150px;
      //max-width: 150px;
      height: 80px;
      width: 80px;
    }
  }
  .item__label{
    h4{
      color: #1BB0CE;
    }
  }
  .item__counter{
    display: grid;
    grid-template-columns: 20px 70px 20px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    button{
      color: #1BB0CE;
      font-size: 30px;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      background: none;
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
    }
  }
  .item__del{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
      img{
        cursor: pointer;
        height: 15px;
    }
  }
}
</style>
