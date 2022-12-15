<template>
    <tr class="admin-catalog_desk admin_desk">
      <td class="item__el item__image">
        <img
            :src="'http://localhost:8080/files/' + product.image"
            alt="">
      </td>
      <td class="item__el item__label">
        <h4>{{ product.name }}</h4>
      </td>
      <td class="item__el">
        <h4>{{ product.category }}</h4>
      </td>
      <td class="item__el">
        <h4>{{ product.description }}</h4>
      </td>
      <td class="item__el">
        <h4>{{ product.amount }} шт.</h4>
      </td>
      <td class="item__el item__total-price">
        <h4>{{ product.price }} &#x20bd; </h4>
      </td>
      <td class="item__el">
        <h4>{{ product.sale }}</h4>
      </td>
      <td class="item__el item__el_option">
        <div class="wrapper">
          <div class="option-button" @click="showModal">
            <img src="../../assets/pencil_ico.png" alt="">
          </div>
          <Modal
              v-show="isModalVisible"
              @close="closeModal"
              :product="product"
          />
          <div class="option-button" @click="deleteProductFromCatalog(product.id)">
            <img src="../../assets/trash_ico.png" alt="">
          </div>
        </div>
      </td>
    </tr>


</template>

<script>
import {eventBus} from "@/main";
import CatalogService from "@/services/catalog.service";
import Modal from "@/components/admin_components/AdminCatalogModal";

export default {
  components: {
    Modal
  },
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,
      isModalVisible: false,
      products: []
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async deleteProductFromCatalog(id) {
      await CatalogService.deleteProductFromCatalog(id);
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