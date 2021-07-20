<template>
  <div class="orders-component">
    <div class="order-card" v-on:click="changeVisible">
      <h2>Заказ № {{order.orderId}} на сумму {{order.finalPrice}} руб.</h2>
      <p v-if="isVisible">Товары: {{order.productsInfo}}</p>
      <p v-if="isVisible">Тип заказа: {{order.orderType}}</p>
      <p v-if="isVisible">Статус заказа: {{order.orderStatus}}</p>
      <p v-if="isVisible">Дата заказа: {{order.orderDate}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    changeVisible() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>