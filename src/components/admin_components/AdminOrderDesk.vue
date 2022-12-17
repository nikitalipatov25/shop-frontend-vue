<template>
  <tr class="admin-order_desk admin_desk" v-if="order.orderStatus !== 'Завершен'">
    <td class="item__el item__label">
      <h4>{{ order.orderId }}</h4>
    </td>
    <td class="item__el">
      <h4>{{ order.date }}</h4>
    </td>
    <td class="item__el">
      <h4>{{ order.productsInfo }}</h4>
    </td>
    <td class="item__el item__total-price">
      <h4>{{ order.summary }} &#x20bd; </h4>
    </td>
    <td class="item__el">
      <h4>{{ order.orderType }}</h4>
    </td>
    <td class="item__el">
      <h4>{{ order.orderStatus }}</h4>
    </td>
    <td class="item__el item__el_option">
      <div class="wrapper">
        <div class="option-button" @click="showOrderModal">
          <img src="../../assets/pencil_ico.png" alt="">
        </div>
      </div>
      <div class="order-admin__modal">
        <Modal :title="'Изменение'" @closeModal="closeOrderModal" v-if="isOrderModalVisible">
          <template v-slot:content>
            <form class="modal-form">
              <div class="info-el">
                <label>
                  <span>Измените статус заказа:</span>
                  <select class="" v-model="defaultOrderStatus">
                    <option
                        v-for="status in orderStatuses"
                        :value="status.value"
                        :key="status.value"
                    >
                      {{status.value}}
                    </option>
                  </select>
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
                  :click="modifyOrder"
              />
            </div>
          </template>
        </Modal>
      </div>
    </td>
  </tr>
</template>

<script>
import Modal from "@/components/Base/Modal";
import Button from "@/components/Base/Button";
import OrdersService from "@/services/orders.service";
import {eventBus} from "@/main";

export default {
  components: {
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
      orderStatuses: [{value: "Готов к выдаче"}, {value: "Осуществляется доставка"},
        {value: "Выдан"}, {value: "Доставлен"}],
      defaultOrderStatus: 'В обработке',
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
      let orderStatusDTO = {
        "orderId": this.order.orderId,
        "orderStatus": this.defaultOrderStatus
      }
      await OrdersService.modifyOrderStatus(orderStatusDTO)
      eventBus.$emit('reload')
    }
  }
}
</script>


<style lang="scss">
.order-admin__modal{

}

</style>