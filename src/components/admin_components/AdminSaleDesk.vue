<template>
  <tr class="admin-sale_desk admin_desk">
    <td class="item__el item__image">
      <img
          :src="'http://localhost:8080/files/' + sale.image"
          alt="">
    </td>
    <td class="item__el item__label">
      <h4>{{ sale.name }}</h4>
    </td>
    <td class="item__el">
      <h4>{{ sale.date }}</h4>
    </td>
    <td class="item__el">
      <h4>{{ sale.expirationDate }} </h4>
    </td>
    <td class="item__el item__total-price">
      <h4>{{ sale.discount }} % </h4>
    </td>
    <td class="item__el item__el_option">
      <div class="wrapper">
        <div class="option-button" @click="showModal">
          <img  src="../../assets/pencil_ico.png" alt="">
        </div>
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
            :sale="sale"
        />
        <div class="option-button" @click="deleteSale(sale.id)">
          <img src="../../assets/trash_ico.png" alt="">
        </div>
      </div>

    </td>
  </tr>


</template>

<script>
import SaleService from "@/services/sale.service";
import Modal from "@/components/admin_components/AdminSaleModal";
import {eventBus} from "@/main";

export default {
  components: {
    Modal
  },
  props: {
    sale: {
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
    async deleteSale(id) {
      await SaleService.deleteSale(id)
      eventBus.$emit('reload')
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

</style>