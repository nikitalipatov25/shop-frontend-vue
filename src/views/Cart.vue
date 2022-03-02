<template>
  <div class="cart">
  <Header/>
    <div class="body">
      <!--   deleteAll button   -->
      <button @click="delAll">DELL ALL</button>
      <!--  deleteSelected button    -->
      <button @click="delSelected">DEL SELECTED</button>
      {{delList}}
      <div class="row">
        <div class="col-7">
          <cart-item
            v-for="product in products"
            :key="product.id"
            :product="product"
            :setDelList="setDelList"
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
              <p>Ваш зкаказ:</p>
                <div v-for="product in products"
                  :key="product.id"
                  :product="product"
                >
                  <p>Товар: {{product.product.name}} - {{product.amount}} шт. </p>
              </div>
              <select class="form-select" v-model="defaultOrderType">
                <option
                  v-for="type in orderType"
                  :value="type.value"
                  :key="type"
                >
                  {{type.value}}
                </option>
              </select>
              <div class="mb-3" v-if="defaultOrderType === 'Доставка'">
                <label  class="form-label">Адрес</label>
                <input :disabled="inputStatus" type="text" class="form-control" v-model="order.address">
              </div>
              <div class="mb-3">
                <label  class="form-label">Фамилия покупателя</label>
                <input :disabled="inputStatus" type="text" class="form-control"  v-model="order.surname">
              </div>
              <div class="mb-3">
                <label  class="form-label">Имя покупателя</label>
                <input :disabled="inputStatus" type="text" class="form-control"  v-model="order.name">
              </div>
              <div class="mb-3">
                <label  class="form-label">Отчество покупателя</label>
                <input :disabled="inputStatus" type="text" class="form-control"  v-model="order.secondName">
              </div>
              <div class="mb-3">
                <label  class="form-label">Телефон</label>
                <input :disabled="inputStatus" type="text" class="form-control"  v-model="order.phoneNumber">
              </div>
                <p><input type="checkbox" @change="changeOrderInfo">Изменить данные заказа</p>
                <p><input type="checkbox" @change="saveOrderInfo">Изменить данные в личном кабинете</p>
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
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Foter'
import CartService from '../services/cart.service'
import OrdersService from '../services/orders.service'
import UserService from '@/services/user.service'

export default {
  name: 'Cart',
  components: {
    CartItem,
    Header,
    Footer
  },
  data() {
    return {
      delList: [],
      cart: {
        numberOfProductsInCart: 0,
        priceWithoutDiscount: 0,
        discount: 0,
        priceWithDiscount: 0
      },
      order: {
        products: [],
        orderType: '',
        surname: '',
        name: '',
        secondName: '',
        address: '',
        phoneNumber: '',
        changeData: false,
        saveData: false
      },
      text: 'Корзина',
      products: [],
      orderType: [
        {
          value: "Самовывоз"
        },
        {
          value: "Доставка"
        }
      ],
      defaultOrderType: 'Самовывоз',
      inputStatus: true,
    }
  },
  methods: {
    async delSelected(){
      await CartService.deleteSelectedCartItems(this.delList)
      await this.getNewCart()
      await this.getCartSummary()
    },
    setDelList(isChecked, productId) {
      if (isChecked === true) {
        this.delList.push(productId)
        console.log('add', this.delList);
        isChecked = false;
      } else {
        this.delList.forEach((item, index) => {
          if (item === productId) {
            this.delList.splice(index, 1)
          }
        })
        console.log('del', this.delList)
      }
    },
    async delAll(){
      await CartService.deleteAllProductFromCart()
      await this.getNewCart()
      await this.getCartSummary()
    },
    addProductsToOrder() {
      for (let i = 0; i < this.products.length; i++) {
        this.order.products.push(this.products[i].productId)
      }
    },
    changeOrderInfo() {
      this.inputStatus = !this.inputStatus;
      this.order.changeData = !this.order.changeData;
    },
    saveOrderInfo() {
      this.order.saveData = !this.order.saveData;
    },
    getUserInformation() {
      UserService.getUser().then(
          response => {
            this.order.surname = response.data.surname;
            this.order.name = response.data.name;
            this.order.secondName = response.data.secondName;
            this.order.address = response.data.address;
            this.order.phoneNumber = response.data.phoneNumber;
          }
      )
    },
    getNewCart() {
      CartService.getNewCart().then(
          response => {
            this.products = response.data.content;
            this.getCartSummary();
            this.addProductsToOrder();
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
      this.order.orderType = this.defaultOrderType;
      OrdersService.createOrder(this.order);
      this.$bvModal.hide('order-modal');
    },
  },
  created() {
    eventBus.$on('deleteProductFromCart', this.getNewCart)
    eventBus.$on('addQuantity', this.getNewCart)
    eventBus.$on('subQuantity', this.getNewCart)
    this.getNewCart();
    this.getUserInformation();
  }
}
</script>

<style>
.cart h1 {
  text-align: left;
  margin-left: 10px;
}
</style>
