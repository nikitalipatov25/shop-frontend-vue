<template>
    <div class="category">
      <div class="heading">
        <h2>Категории</h2>
      </div>
      <button @click="showModal">Добавить категорию</button>

      <Modal
          v-show="isModalVisible"
          @close="closeModal"
          :category="category"
      />

      <section>
        <tr>
          <td><h4>Изображение</h4></td>
          <td><h4>Название</h4></td>
        </tr>
        <admin-category-desk
            v-for="category in categories"
            :key="category.id"
            :category="category"
        />
      </section>

  </div>
</template>

<script>
import {eventBus} from "@/main";
import CategoryService from "@/services/category.service";
import AdminCategoryDesk from "@/components/admin_components/AdminCategoryDesk";
import Modal from "@/components/admin_components/AdminCategoryModal";
export default {
  components: {
    AdminCategoryDesk,
    Modal
  },
  data() {
    return {
      category: {
        id: '',
        name: '',
        image: null
      },
      categories: undefined,
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
    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categories = response.data;
          })
    }
  },
  created() {
    this.getCategories();
    eventBus.$on('reload', () => this.getCategories())
  }
}
</script>