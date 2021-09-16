<template>
  <div class="orders-component">
    <div class="order-card" v-on:click="changeVisible">
      <h2>Заказ № {{order.orderId}} на сумму {{order.summary}} руб.</h2>
      <div v-if="isVisible">
        <p>Товары:</p>
          <div v-for="productsInfo in order.productsInfo"
               :key="productsInfo"
          >
            <p>{{productsInfo}}</p>
          </div>
      </div>
      <p v-if="isVisible">Тип заказа: {{order.orderType}}</p>
      <p v-if="isVisible">Статус заказа: {{order.orderStatus}}</p>
      <p v-if="isVisible">Дата заказа: {{order.date}}</p>
      <button type="button" class="btn btn-danger" @click="modifyOrderEvent">Редактировать заказ</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main'

export default {
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    modifyOrderEvent() {
      eventBus.$emit('modifyOrderEvent', this.order.orderId)
    },
    changeVisible() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>