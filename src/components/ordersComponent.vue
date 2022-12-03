<template>
  <div class="orders-component">
    <div class="orders-component__modal">
      <Modal :title="'Изменение'" @closeModal="closeOrderModal" v-if="isOrderModalVisible">
        <template v-slot:content>
          <div class="d-block text-left">
            <p>Измените статус заказа:</p>
            <select class="form-select" @change="selectStatus($event)">
              <option selected>Выберете статус заказа</option>
              <option v-for="status in statuses" :key="status">{{status}}</option>
            </select>
          </div>
        </template>
        <template v-slot:footer>
          <div class="">
            <Button
                :label="'Изменить'"
                :size="'small'"
                :color="'color'"
                :click="modifyOrder"
            />
          </div>
        </template>
      </Modal>
    </div>

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
          <div class="edit">
            <h3 @click="showOrderModal">Редактировать заказ</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Base/Modal";
import Button from "../components/Base/Button";

import OrderService from '@/services/orders.service'

export default {
  components:{
    Modal,
    Button
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
      statuses: ['Возврат', 'Отмена'],
      status: '',
      orderDTO: {
        orderId: this.order.orderId,
        orderStatus: ''
      }
    }
  },
  computed: {
    orderType() {
      return {
        placed: this.order.orderStatus === 'Оформлен',
        cancelled: this.order.orderStatus === 'Отмена',
        refund: this.order.orderStatus === 'Возврат',
      }
    }
  },
  methods: {
    showOrderModal(){
      this.isOrderModalVisible = true
    },
    closeOrderModal(){
      this.isOrderModalVisible = false
    },
    async modifyOrder() {
      this.order.orderStatus = this.status
      this.orderDTO.orderStatus = this.status
      console.log(this.status)
      await OrderService.modifyOrderStatus(this.orderDTO)
    },
    selectStatus(event) {
      this.status = event.target.value;
    },
    getOrders() {
      OrderService.getOrders().then(
          response => {
            this.orders = response.data.content;
          }
      )
    },
    changeVisible() {
      this.isVisible = !this.isVisible
    }
  },
  updated() {
    this.getOrders()
  },
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
