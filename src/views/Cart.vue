<template>
  <div class="cart">
    <div class="cart__modal">
      <Modal :title="'Оформление'" @closeModal="closeOrderModal" v-if="isOrderModalVisible">
        <template v-slot:content>
          <form class="modal-form">
            <h3>Ваш зкаказ:</h3>
            <div class="cart__modal-sec cart__modal-order">
              <div class="order__list" v-for="product in products"
                   :key="product.id"
                   :product="product"
              >
                <p>Товар: {{product.product.name}} - {{product.amount}} шт. </p>
              </div>
            </div>
            <h3>Личные данные:</h3>
            <div class="cart__modal-sec cart__modal-info">
              <label>
                <select class="" v-model="defaultOrderType">
                  <option
                      v-for="type in orderType"
                      :value="type.value"
                      :key="type.value"
                  >
                    {{type.value}}
                  </option>
                </select>
              </label>
              <div class="info-el" v-if="defaultOrderType === 'Доставка'">
                <label>
                  <span>Адрес:</span>
                  <input :disabled="inputStatus" type="text" class="form-control" v-model="order.address">
                </label>
              </div>
              <div class="info-el">
                <label>
                  <span>Фамилия покупателя:</span>
                  <input :disabled="inputStatus" type="text" class="form-control"  v-model="order.surname">
                </label>
              </div>
              <div class="info-el">
                <label>
                  <span>Имя покупателя:</span>
                  <input :disabled="inputStatus" type="text" class="form-control"  v-model="order.name">
                </label>
              </div>
              <div class="info-el">
                <label>
                  <span>Телефон:</span>
                  <input :disabled="inputStatus" type="tel" class="form-control"  v-model="order.phoneNumber">
                </label>
              </div>
              <div class="">
                <label>
                  <input type="checkbox" @change="changeOrderInfo">
                  <span>Изменить данные заказа</span>
                </label>
              </div>
            </div>
            <div class="cart__modal-sec cart__modal-total">
              <p>Итого:</p>
              <h3>{{ cart.priceWithDiscount }} &#x20bd;</h3>
            </div>
          </form>
        </template>
        <template v-slot:footer>
          <div class="">
            <Button
                :label="'Оформить'"
                :size="'small'"
                :color="'color'"
                :click="orderProducts"
            />
          </div>
        </template>
      </Modal>
    </div>
    <Header/>
    <main class="container">
      <article class="row">
        <section class="heading">
          <h1>Корзина</h1>
        </section>
        <section v-if="!small && cart.numberOfProductsInCart > 0" class="cart-list_desk ">
          <table>
            <tr>
              <td><h4>Продукт</h4></td>
              <td><h4>Название</h4></td>
              <td><h4>Количество</h4></td>
              <td><h4>Цена</h4></td>
              <td><h4>Удалить</h4></td>
            </tr>
            <cart-item-desk
                v-for="product in products"
                :key="product.id"
                :product="product"
                :setDelList="setDelList"
            />
          </table>
          <div class="cart-list_desk__del">
            <div class="wrapper">
              <!--  deleteSelected button    -->
              <div @click="delSelected">
                <h3 >Удалить выбранные</h3>
              </div>
              <!--   deleteAll button   -->
              <div @click="delAll">
                <h3 >Очистить</h3>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="small && cart.numberOfProductsInCart > 0" class="cart-list_mob">
          <cart-item-mob
              v-for="product in products"
              :key="product.id"
              :product="product"
              :setDelList="setDelList"
          />
        </section>
        <section v-else-if="cart.numberOfProductsInCart === 0" class="cart-list_void">
          <h1>В корзине нет товаров</h1>
        </section>
      </article>
      <article class="row">
        <section class="heading">
          <h1>Всего товаров: {{ cart.numberOfProductsInCart }}</h1>
        </section>
        <section class="cart-pay border">
          <div class="pay-row pay-price">
            <p class="key">Товары</p>
            <p class="value">{{ cart.priceWithoutDiscount }} &#x20bd; </p>
          </div>
          <div class="pay-row pay-sale">
            <p class="key">Скидка</p>
            <p class="value">{{cart.discount.toFixed(1)}} &#x20bd;</p>
          </div>
          <div class="pay-row pay-total">
            <p class="key">Общая стоимость</p>
            <p class="value">{{ cart.priceWithDiscount }} &#x20bd;</p>
          </div>
          <div class="pay-row pay-button">
            <Button
                :label="'Оплатить'"
                :size="'small'"
                :color="'color'"
                :click="showOrderModal"
            />
          </div>
        </section>
      </article>
    </main>
    <Footer/>
  </div>
</template>

<script>
import { eventBus } from '../main'
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import CartItemMob from '../components/CartItemMob'
import CartItemDesk from "../components/CartItemDesk";
import Button from "../components/Base/Button";
import Modal from "../components/Base/Modal";

import CartService from '../services/cart.service'
import OrdersService from '../services/orders.service'
import UserService from '@/services/user.service'

export default {
  name: 'Cart',
  components: {
    CartItemDesk,
    Button,
    CartItemMob,
    Modal,
    Header,
    Footer
  },
  data() {
    return {
      isOrderModalVisible: false,
      small: false,
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
        address: '',
        phoneNumber: '',
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
  created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    eventBus.$on('deleteProductFromCart', this.getNewCart)
    eventBus.$on('addQuantity', this.getNewCart)
    eventBus.$on('subQuantity', this.getNewCart)
    this.getNewCart();
    this.getUserInformation();
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    showOrderModal(){
      this.isOrderModalVisible = true
    },
    closeOrderModal(){
      this.isOrderModalVisible = false
    },
    onResize() {
      this.small = window.innerWidth <= 767;
    },
    async delSelected(){
      await CartService.deleteSelectedCartItems(this.delList)
      await this.getNewCart()
      await this.getCartSummary()
    },
    setDelList(isChecked, productId) {
      if (isChecked === true) {
        this.delList.push(productId)
        isChecked = false;
      } else {
        this.delList.forEach((item, index) => {
          if (item === productId) {
            this.delList.splice(index, 1)
          }
        })
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
    },
    getUserInformation() {
      UserService.getUser().then(
          response => {
            this.order.surname = response.data.surname;
            this.order.name = response.data.name;
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
    async orderProducts() {
      this.order.orderType = this.defaultOrderType;
      await OrdersService.createOrder(this.order);
      await this.getNewCart();
      await this.closeOrderModal();
    },
  }
}
</script>

<style lang="scss">

.cart{
  .cart__modal{
    display: grid;
    justify-items: center;
    .modal-form{
      display: grid;
      gap: 10px;
      .cart__modal-sec{
        display: grid;
        gap: 5px;
        .info-el{
          label{
            display: inline-grid;
            input{
              outline: none;
              -moz-appearance: none;
              border: 1px solid #ccc;
              border-radius: 15px;
              padding: 5px;
            }
          }
        }
      }
      .cart__modal-total{
        grid-template-columns: 50px 100px;
      }
    }

  }

  .border{
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  main{
    display: grid;

    grid-template-columns: 60% auto;
    gap: 15px;
    .cart-list_desk{
      table{
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        td {
          text-align: center;
          border: 1px #ccc;
          border-style: none solid solid none;
          //padding: 10px;
        }
        tr:first-child{
          td{
            padding: 5px 1px;
          }
        }
        tr:first-child td:first-child { border-top-left-radius: 10px; }
        tr:first-child td:last-child { border-top-right-radius: 10px; }
        tr:last-child td:first-child { border-bottom-left-radius: 10px; }
        tr:last-child td:last-child { border-bottom-right-radius: 10px; }
        tr:first-child td { border-top-style: solid; }
        tr td:first-child { border-left-style: solid; }
      }
      .cart-list_desk__del{
        margin-top: 10px;
        display: grid;
        justify-content: right;
        .wrapper{
          display: grid;
          grid-template-columns: auto auto;
          justify-items: end;
          gap: 10px;
          div{
            cursor: pointer;
            h3:hover{
              color: #1BB0CE;
            }
          }

        }
      }
    }
    .cart-list_mob{
      display: grid;
      justify-items: center;
    }
    .cart-list_void{
      display: grid;
      align-items: center;
      h1{
        color: #1BB0CE;
      }
    }
    .cart-pay{

      display: grid;
      grid-template-rows: repeat(2, 1fr);
      gap: 15px;
      .pay-row{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        .value{
          display: grid;
          justify-self: right;
          font-weight: bold;
        }
      }
      .pay-sale{
        .value{
          color: #FF1616;
        }
      }
      .pay-total{
        border-top: 1px solid #ccc;
        padding-top: 15px;
        margin-top: 15px;
      }
      .pay-button{
        padding-top: 10px;
      }
    }
  }
  }
@media (max-width: 767px) {
  .cart{
    main{
      display: grid;
      grid-template-columns: none;
      grid-template-rows: repeat(2, 1fr);
      gap: 30px;
    }
  }
}

</style>
