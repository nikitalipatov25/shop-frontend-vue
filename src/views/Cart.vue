<template>
  <div class="cart">
  <Header/>
    <div class="body">
      <div class="row">
        <div class="col-7">
          <cart-item
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="col-5">
          <p>Товаров в корзине: {{ cart.numberOfProductsInCart }}</p>
          <p>Цена без скидки: {{ cart.priceWithoutDiscount }} руб.</p>
          <p>Ваша скидка: {{ cart.discount }}</p>
          <p>Цена с учетом скидки: {{ cart.priceWithDiscount }} руб.</p>
          <b-button variant="primary" @click="$bvModal.show('order-modal')" >Оформить покупку</b-button>
        </div>

<!--    Начинается модальное окно-->

        <b-modal id="order-modal" hide-footer title="Оформить покупку">
          <div class="d-block text-left">
            <form>
              <select class="form-select" v-model="payload">
                <option
                  v-for="type in orderType"
                  :value="type.value"
                  :key="type"
                >
                  {{type.label}}
                </option>
              </select>
              <div class="mb-3" v-if="payload === 'Delivery'">
                <label  class="form-label">Адрес</label>
                <input type="email" class="form-control"  v-model="user.address">
              </div>
              <div class="mb-3">
                <label  class="form-label">ФИО покупателя</label>
                <input type="email" class="form-control"  v-model="user.name">
              </div>
              <div class="mb-3">
                <label  class="form-label">Телефон</label>
                <input type="email" class="form-control"  v-model="user.phone">
              </div>
                <p>*Оплата производится наличными и только при получении товара</p>
            </form>
          </div>
          <b-button @click="orderProducts" variant="success">Оформить</b-button>
          <b-button @click="$bvModal.hide('add-modal')" variant="danger">Закрыть</b-button>
        </b-modal>

 <!-- Модальное окно закончилось -->

      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
import { eventBus } from '../main'
import Header from '../components/Header'
import Footer from '../components/Foter'
import CartService from '../services/cart.service'
import OrdersService from '../services/orders.service'

export default {
  name: 'Cart',
  components: {
    CartItem,
    Header,
    Footer
  },
  data() {
    return {
      user: {
        name: '',
        address: '',
        phone: ''
      },
      cart: {
        numberOfProductsInCart: 0,
        priceWithoutDiscount: 0,
        discount: 0,
        priceWithDiscount: 0
      },
      orderType: [
        {
          label: 'Самовывоз из магазина',
          value: 'Pickup'
        },
        {
          label: 'Доставка по указанномму адресу',
          value: 'Delivery'
        }
      ],
      text: 'Корзина',
      products: [],
      payload: 'Pickup'
    }
  },
  methods: {
    getNewCart() {
      CartService.getNewCart().then(
          response => {
            this.products = response.data.content;
            this.getCartSummary();
          }
      )
    },
    getCartSummary() {
      CartService.getCartSummary().then(
          response => {
            this.cart.numberOfProductsInCart = response.data[0];
            this.cart.priceWithoutDiscount = response.data[1];
            this.cart.discount = response.data[2];
            this.cart.priceWithDiscount = response.data[3];
          }
      )
    },
    orderProducts() {
      let payload = {
        "orderType": this.payload,
      }
      OrdersService.generateOrder(payload);
    }
  },
  created() {
    eventBus.$on('deleteProductFromCart', this.getNewCart)
    eventBus.$on('addQuantity', this.getNewCart)
    eventBus.$on('subQuantity', this.getNewCart)
    this.getNewCart();

  }
}
</script>

<style>
.cart h1 {
  text-align: left;
  margin-left: 10px;
}
</style>