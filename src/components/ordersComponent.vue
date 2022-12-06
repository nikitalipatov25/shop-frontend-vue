<template>
  <div class="orders-component">

    <div class="accordion" >
      <div class="accordion__header" v-on:click="changeVisible">
        <div class="col">
          <p>Заказ от {{ order.date }}</p>
        </div>
        <div class="col">
          <p>
            {{order.summary}} руб.
            <span :class="orderType">{{ order.orderStatus }}</span>
          </p>
        </div>
      </div>
      <div class="accordion__item" v-if="isVisible">
        <div class="item__wrapper">
          <p>Тип заказа: {{order.orderType}}</p>
          <p>Статус заказа: {{order.orderStatus}}</p>
          <p>Дата заказа: {{order.date}}</p>
          <p>Товары:</p>
          <div v-for="productsInfo in order.productsInfo"
               :key="productsInfo"
          >
            <p>{{productsInfo}}</p>
          </div>
          <div class="edit" v-if="order.orderStatus !== 'Завершен'">
            <h3 @click="cancelOrder">Отменить заказ</h3>
            <h3 @click="confirmReceipt">Подтвердить полуение</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from '@/services/orders.service'
import {eventBus} from "@/main";

export default {
  components:{
  },
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
      isOrderModalVisible: false,
      isVisible: false,
    }
  },
  computed: {
    orderType() {
      return {
        placed: this.order.orderStatus === 'Завершен',
        cancelled: this.order.orderStatus === 'Отмена',
        refund: this.order.orderStatus === 'Возврат',
      }
    }
  },
  methods: {
    async cancelOrder() {
      await OrderService.cancelOrder(this.order.orderId)
      eventBus.$emit('reloadOrders')
    },
    async confirmReceipt() {
      await OrderService.confirmReceipt(this.order.orderId)
      eventBus.$emit('reloadOrders')
    },
    changeVisible() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>

<style lang="scss">

.orders-component{
  .orders-component__modal{
    display: grid;
    justify-items: center;
  }
  .accordion{
    .accordion__header{
      cursor: pointer;
      user-select: none;
      padding: 10px;
      border-radius: 15px 15px 1px 1px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .col{
        max-width: 100px;
      }
      .col:last-child{
        justify-self: end;
      }
      span{
        font-weight: bold;
      }
      .placed{
        color: #61CE70;
      }
      .refund{
        color: #FF1616;
      }
      .cancelled{
        color: #FCDC4C;
      }
    }
    .accordion__item{
      border-top: 1px solid #ccc;
      padding: 5px 20px 5px 20px;
      .item__wrapper{
        display: grid;
        gap: 5px;
        .edit{
          margin-top: 10px;
          cursor: pointer;
          user-select: none;
          h3{
            color: #1BB0CE;
          }
        }
      }
    }
  }
}
</style>
