<template>
  <div class="personal-area">
    <Header/>
      <div class="body">
        <h1>{{ text }}</h1>

          <div class="profile">
            <p>Не забыть фото</p>
            <p>Имя: {{user.name}}</p>
            <p>Телефон: {{user.phone}}</p>
            <p>Почта: {{user.email}}</p>
            <p>Адрес: {{user.address}}</p>
            <p>Редактировать профиль</p>
            <p>Изменить почту/логин</p>
          </div>

          <div class="orders">
            <orders-component
              v-for="order in orders"
              :key="order.orderId"
              :order="order"
            />
          </div>
        </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Foter'
import ordersComponent from "@/components/ordersComponent";
import OrderService from '@/services/orders.service'
import UserService from '@/services/user.service'

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
        name: '',
        phone: '',
        email: '',
        address: ''
      },
      orders: '',
    }
  },
  methods: {
    geUserOrders() {
      OrderService.getUserOrders().then(
          response => {
            this.orders = response.data.content;
            console.log(response.data);
          }
      )
    },
    getUserProfile() {
      UserService.getUser().then(
          response => {
            this.user.name = response.data.fullName;
            this.user.phone = response.data.phoneNumber;
            this.user.email = response.data.email;
            this.user.address = response.data.address;
            console.log(response)
          }
      )
    }
  },
  created() {
    this.getUserProfile();
    this.geUserOrders();
  },
}
</script>

<style>
.orders {
 text-align: center;
}
</style>
