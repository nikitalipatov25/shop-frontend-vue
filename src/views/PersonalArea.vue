<template>
  <div class="personal-area">
    <Header/>
      <div class="body">
        <h1>{{ text }}</h1>

          <div class="profile">

            <p>Имя: {{user.name}}</p>
            <p>Фамилия: {{user.surname}}</p>
            <p>Отчество: {{user.secondName}}</p>
            <p>Телефон: {{user.phone}}</p>
            <p>Эл. адрес: {{user.email}}</p>
            <p>Адрес доставки: {{user.address}}</p>
            <button type="button" class="btn btn-success" @click="$bvModal.show('modify-user-modal')">Редактировать контактные данные</button>

            <b-modal id="modify-user-modal" hide-footer title="Изменить контактные данные">
              <div class="d-block text-left">
                <p>Введите Ваше имя:<input type="text" v-model="user.name"></p>
                <p>Введите Вашу фамилию:<input type="text" v-model="user.surname"></p>
                <p>Введите Ваше отчество (при наличии):<input type="text" v-model="user.secondName"></p>
                <p>Введите адрес доставки:<input type="text" v-model="user.address"></p>
                <p>Введите Ваш номер телефона:<input type="text" v-model="user.phone"></p>
              </div>
              <button class="btn btn-success" @click="modifyUser">Изменить данные</button>
              <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-user-modal')">Закрыть</button>
            </b-modal>
          </div>

          <div class="orders">
            <orders-component
              v-for="order in orders"
              :key="order.orderId"
              :order="order"
            />

            <b-modal id="modify-order-modal" hide-footer title="Изменить статус заказа">
              <div class="d-block text-left">
                <p>Измените статус заказа</p>
                <select class="form-select" @change="selectStatus($event)">
                  <option selected>Выберете статус заказа</option>
                  <option v-for="status in statuses" :key="status">{{status}}</option>
                </select>
              </div>
              <button class="btn btn-success" @click="modifyOrder">Изменить статус</button>
              <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-order-modal')">Закрыть</button>
            </b-modal>

          </div>
        </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import ordersComponent from "@/components/ordersComponent";
import OrderService from '@/services/orders.service'
import UserService from '@/services/user.service'
import {eventBus} from "@/main";

export default {
  name: 'PersonalArea',
  components: {
    Header,
    Footer,
    ordersComponent
  },
  data() {
    return {
      text: 'Личный кабинет',
      user: {
        name: 'Укажите имя',
        surname: 'Укажите фамилию',
        secondName: 'Отсутствует',
        phone: 'Укажите телефон',
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
      this.$bvModal.hide('modify-user-modal');
    },
    getOrders() {
      OrderService.getOrders().then(
          response => {
            this.orders = response.data.content;
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
            if (response.data.secondName !== null) {
              this.user.secondName = response.data.secondName;
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

<style>
.orders {
 text-align: center;
}
</style>
