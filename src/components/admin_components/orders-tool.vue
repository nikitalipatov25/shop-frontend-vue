<template>
  <div class="orders-tool">
    <h2>Работа с заказами</h2>
      <button type="button" class="btn btn-primary" @click="$bvModal.show('change-order-status')">Изменить статус заказа</button>

      <b-modal id="change-order-status" hide-footer title="Изменить статус заказа">
        <div class="d-block text-left">
          <p>Введите номер заказа: <input type="text" v-model="order.id" @keyup.enter="findOrder"></p>
            <div class="change-order-body" v-if="isDetected">
              <p>Заказ № {{order.orderId}} от {{order.date}} </p>
              <select class="form-select" @change="selectStatus($event)">
                <option selected>Выберете статус заказа</option>
                <option v-for="status in statuses" :key="status.id">{{status.orderStatus}}</option>
              </select>
              <button type="button" class="btn btn-primary" @click="modifyOrderStatus">Изменить статус</button>
              <button type="button" class="btn btn-danger" @click="$bvModal.hide('change-order-status')">Закрыть</button>
            </div>
        </div>
    </b-modal>

  </div>
</template>

<script>
import OrdersService from '@/services/orders.service'

export default {
  data() {
    return {
      order: {
        orderId: '',
        date: '',
        orderStatus: ''
      },
      isDetected: false,
      statuses: []
    }
  },
  methods: {
    selectStatus(event) {
      this.order.orderStatus = event.target.value;
    },
    findOrder() {
      OrdersService.getOrder(this.order.id).then(
          response => {
            this.order.orderId = response.data.orderId;
            this.order.date = response.data.date;
            this.order.orderStatus = response.data.orderStatus;
            this.isDetected = true;
          }
      )
    },
    getOrderStatusesList() {
      OrdersService.getOrderStatusesList().then(
          response => {
           this.statuses = response.data;
          }
      )
    },
    modifyOrderStatus() {
      OrdersService.modifyOrderStatus(this.order);
      this.isDetected = false;
      this.order.orderId = '';
    }
  },
  created() {
    this.getOrderStatusesList()
  }
}
</script>
