<template>
  <div class="order-tool">
    <h2>Заказы</h2>

    <section>
      <tr>
        <td><h4>Заказ №</h4></td>
        <td><h4>Дата</h4></td>
        <td><h4>Товары</h4></td>
        <td><h4>Общая стоимость</h4></td>
        <td><h4>Тип</h4></td>
        <td><h4>Статус</h4></td>
      </tr>
      <admin-order-desk
          v-for="order in orders"
          :key="order.orderId"
          :order="order"
      />
    </section>
  </div>
</template>

<script>
import AdminOrderDesk from "@/components/admin_components/AdminOrderDesk";
import OrdersService from "@/services/orders.service";
export default {
  components: {
    AdminOrderDesk
  },
  data() {
    return {
      order: {
        name: '',
        image: null,
        date: '',
        expirationDate: '',
        discount: ''
      },
      sales: undefined,
      isModalVisible: false,
      orders: undefined
    }
  },
  methods: {
   getOrders() {
     OrdersService.getOrders().then(
         response => {
           this.orders = response.data.content
         }
     )
   },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  created() {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>