<template>
  <tr class="admin-order_desk">
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
      <button @click="showModal">Изменить</button>
      <Modal
          v-show="isModalVisible"
          @close="closeModal"
          :order="order"
      />
    </td>
  </tr>


</template>

<script>
import Modal from "@/components/admin_components/AdminCatalogModal";

export default {
  components: {
    Modal
  },
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,
      isModalVisible: false,
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    }
  }
}
</script>

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
}
</style>