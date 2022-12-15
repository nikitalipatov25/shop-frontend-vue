<template>
  <tr class="admin-category_desk admin_desk">
    <td class="item__el item__image">
      <img
          :src="'http://localhost:8080/files/' + category.image"
          alt="">
    </td>
    <td class="item__el item__label">
      <h4>{{ category.name }}</h4>
    </td>
    <td class="item__el item__el_option">
      <div class="wrapper">
        <div class="option-button" @click="showModal">
          <img src="../../assets/pencil_ico.png" alt="">
        </div>
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
            :category="category"
        />
        <div class="option-button" @click="deleteCategory(category.id)">
          <img src="../../assets/trash_ico.png" alt="">
        </div>
      </div>

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

</style>