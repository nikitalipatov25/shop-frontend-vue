<template>
  <div class="order-tool">
    <div class="heading">
      <h2>Заказы</h2>
    </div>



    <section class="cart-list_desk ">
      <table>
        <tr>
          <td><h4>Заказ №</h4></td>
          <td><h4>Дата</h4></td>
          <td><h4>Товары</h4></td>
          <td><h4>Общая стоимость</h4></td>
          <td><h4>Тип</h4></td>
          <td><h4>Статус</h4></td>
          <td><h4>Статус</h4></td>
        </tr>
        <admin-order-desk
            v-for="order in orders"
            :key="order.orderId"
            :order="order"
        />
      </table>

    </section>
  </div>
</template>

<script>
import AdminOrderDesk from "@/components/admin_components/AdminOrderDesk";
import OrdersService from "@/services/orders.service";
import {eventBus} from "@/main";

export default {
  components: {
    AdminOrderDesk,
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
      orders: undefined,
    }
  },
  methods: {
   getOrders() {
     OrdersService.getAllUserOrders().then(
         response => {
           this.orders = response.data
         })
   }
  },
  created() {
    this.getOrders()
    eventBus.$on('reload', () => this.getOrders())
  }
}
</script>

<style lang="scss">

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

</style>