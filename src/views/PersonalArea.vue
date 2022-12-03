<template>
  <div class="personal-area">
    <div class="personal-area__modal">
      <Modal :title="'Изменение'" @closeModal="closePersonModal" v-if="isPersonModalVisible">
        <template v-slot:content>
          <form class="modal-form">
            <div class="info-el">
              <label>
                <span>Введите Ваше имя:</span>
                <input type="text" v-model="user.name">
              </label>
            </div>
            <div class="info-el">
              <label>
                <span>Введите Вашу фамилию:</span>
                <input type="text" v-model="user.surname">
              </label>
            </div>
            <div class="info-el">
              <label>
                <span>Введите адрес доставки:</span>
                <input type="text" v-model="user.address">
              </label>
            </div>
            <div class="info-el">
              <label>
                <span>Введите Ваш номер телефона:</span>
                <input type="tel" v-model="user.phoneNumber">
              </label>
            </div>
          </form>
        </template>
        <template v-slot:footer>
          <div class="">
            <Button
                :label="'Изменить'"
                :size="'small'"
                :color="'color'"
                :click="modifyUser"
            />
          </div>
        </template>
      </Modal>
    </div>
    <Header/>
    <main class="container">
      <article>
        <section class="heading">
          <h1>Личный кабинет</h1>
        </section>
      </article>
      <article class="row">
        <section class="profile">
          <div class="wrapper">
            <p><span>Фамилия:</span> {{user.surname}}</p>
            <p><span>Имя:</span> {{user.name}}</p>
            <p><span>Телефон:</span> {{user.phoneNumber}}</p>
            <p><span>Эл. адрес:</span> {{user.email}}</p>
            <p><span>Адрес доставки:</span> {{user.address}}</p>
            <div class="edit">
              <Button
                  :label="'Изменить данные'"
                  :size="'medium'"
                  :color="'color'"
                  :click="showPersonModal"
              />
            </div>
          </div>
        </section>
        <section v-if="orders.length !== 0" class="orders">
          <orders-component
              v-for="order in orders"
              :key="order.orderId"
              :order="order"
          />
        </section>
        <section class="orders_void" v-else>
          <h1>Заказов нет</h1>
        </section>
      </article>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import Button from "../components/Base/Button";
import Modal from "../components/Base/Modal";
import ordersComponent from "@/components/ordersComponent";
import OrderService from '@/services/orders.service'
import UserService from '@/services/user.service'
import {eventBus} from "@/main";

export default {
  name: 'PersonalArea',
  components: {
    Modal,
    Button,
    Header,
    Footer,
    ordersComponent
  },
  data() {
    return {
      isPersonModalVisible: false,
      user: {
        name: 'Укажите имя',
        surname: 'Укажите фамилию',
        phoneNumber: 'Укажите телефон',
        email: '',
        address: 'Укажите адрес доставки'
      },
      orders: '',
      statuses: ['Возврат', 'Отмена'],
      status: '',
      orderDTO: {
        orderId: '',
        orderStatus: ''
      }
    }
  },
  methods: {
    showPersonModal(){
      this.isPersonModalVisible = true
    },
    closePersonModal(){
      this.isPersonModalVisible = false
    },
    modifyOrderEvent() {
      this.$bvModal.show('modify-order-modal');
    },
    async modifyOrder() {
      this.orderDTO.orderStatus = this.status;
      await OrderService.modifyOrderStatus(this.orderDTO)
      this.$bvModal.hide('modify-order-modal');
      this.getOrders();
    },
    selectStatus(event) {
      this.status = event.target.value;
    },
    async modifyUser() {
      await UserService.modifyUser(this.user);
      await this.closePersonModal();
    },
    getOrders() {
      OrderService.getOrders().then(
          response => {
            this.orders = response.data;
          }
      )
    },
    getUserProfile() {
      UserService.getUser().then(
          response => {
            if (response.data.name !== null) {
              this.user.name = response.data.name;
            }
            if (response.data.surname !== null) {
              this.user.surname = response.data.surname;
            }
            if (response.data.phoneNumber !== null) {
              this.user.phone = response.data.phoneNumber;
            }
            if (response.data.address !== null) {
              this.user.address = response.data.address;
            }
            this.user.email = response.data.email;
            this.user.id = response.data.id;
          }
      )
    }
  },
  created() {
    this.getUserProfile();
    this.getOrders();
    eventBus.$on('modifyOrderEvent', order => {
      this.orderDTO.orderId = order;
      this.modifyOrderEvent();
    })
  },
}
</script>

<style lang="scss">
.personal-area{
  .personal-area__modal{
    display: grid;
    justify-items: center;
    .modal-form{
      display: grid;
      gap: 10px;
      .info-el{
        label{
          display: inline-grid;
          input{
            outline: none;
            -moz-appearance: none;
            border: 1px solid #ccc;
            border-radius: 15px;
            padding: 10px;
          }
        }
      }
    }
  }
  .row{
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .profile{
    .wrapper{
      display: grid;
      gap: 15px;
      p{
        span{
          font-weight: bold;
        }
      }
      .edit{
        margin-top: 15px;
      }
    }
  }
  .orders_void{
    h1{
      color: #1BB0CE;
    }
  }
  .orders{
    display: grid;
    .orders-component{
      border: 1px solid #ccc;
    }
    .orders-component:first-child{
      border-radius: 15px 15px 1px 1px;
    }
    .orders-component:last-child{
      border-radius: 1px 1px 15px 15px;

    }
  }
}
</style>
