<template>
  <tr class="admin-order_desk" v-if="order.orderStatus !== 'Завершен'">

    <div class="order__modal">
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
    </td><td class="item__el">
      <h4>{{ order.orderStatus }}</h4>
  </td>
    <td class="item__el">
      <button @click="showOrderModal">Изменить</button>
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

<!--<style lang="scss">-->
<!--.admin-order_desk{-->
<!--  width: 280px;-->

<!--  .order__modal{-->
<!--    display: grid;-->
<!--    justify-items: center;-->
<!--    .modal-form{-->
<!--      display: grid;-->
<!--      gap: 10px;-->
<!--      .cart__modal-sec{-->
<!--        display: grid;-->
<!--        gap: 5px;-->
<!--        .info-el{-->
<!--          label{-->
<!--            display: inline-grid;-->
<!--            input{-->
<!--              outline: none;-->
<!--              -moz-appearance: none;-->
<!--              border: 1px solid #ccc;-->
<!--              border-radius: 15px;-->
<!--              padding: 5px;-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--  }-->



<!--  .row_del{-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--  }-->
<!--  .item__el{-->
<!--    text-align: center;-->
<!--  }-->
<!--  .item__image{-->
<!--    img{-->
<!--      //max-height: 150px;-->
<!--      //max-width: 150px;-->
<!--      height: 80px;-->
<!--      width: 80px;-->
<!--    }-->
<!--  }-->
<!--  .item__label{-->
<!--    h4{-->
<!--      color: #1BB0CE;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

<style lang="scss">
.admin-order_desk{
  width: 280px;
  .row_del{
    width: 100%;
    height: 100%;
  }
  .item__el{
    text-align: center;
  }
  .item__image{
    img{
      //max-height: 150px;
      //max-width: 150px;
      height: 80px;
      width: 80px;
    }
  }
  .item__label{
    h4{
      color: #1BB0CE;
    }
  }
  .item__counter{
    display: grid;
    grid-template-columns: 20px 70px 20px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    button{
      color: #1BB0CE;
      font-size: 30px;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      background: none;
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
    }
  }
  .item__del{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    img{
      cursor: pointer;
      height: 15px;
    }
  }
}
</style>