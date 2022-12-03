<template>
    <tr class="admin-catalog_desk">
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
      <td class="item__el">
        <button @click="showModal">Изменить</button>
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
            :product="product"
        />
        <button @click="deleteProductFromCatalog(product.id)">Удалить</button>
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
.admin-catalog_desk{
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