<template>
  <tr class="admin-category_desk">
    <td class="item__el item__image">
      <img
          :src="'http://localhost:8080/files/' + category.image"
          alt="">
    </td>
    <td class="item__el item__label">
      <h4>{{ category.name }}</h4>
    </td>
    <td class="item__el">
      <button @click="showModal">Изменить</button>
      <Modal
          v-show="isModalVisible"
          @close="closeModal"
          :category="category"
      />
      <button @click="deleteCategory(category.id)">Удалить</button>
    </td>
  </tr>


</template>

<script>
import {eventBus} from "@/main";
import CategoryService from "@/services/category.service";
import Modal from "@/components/admin_components/AdminCategoryModal";

export default {
  components: {
    Modal
  },
  props: {
    category: {
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
      console.log(this.category)
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async deleteCategory(id) {
      await CategoryService.deleteCategory(id)
      eventBus.$emit('reload')
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
    }
  }
}
</script>

<style lang="scss">
.admin-category_desk{
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