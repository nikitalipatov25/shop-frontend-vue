<template>
  <div class="catalog-tool">
    <div class="heading">
      <h2>Каталог</h2>
    </div>

    <div class="cart__modal">
      <Modal :title="'Оформление'" @closeModal="closeOrderModal" v-if="isOrderModalVisible">
        <template v-slot:content>

        </template>
        <template v-slot:footer>
            <Button
                :label="'Оформить'"
                :size="'small'"
                :color="'color'"
                :click="orderProducts"
            />
        </template>
      </Modal>
    </div>

    <button @click="showModal">Добавить товар</button>
    <input v-model="filter.searchText" @keyup="findProduct" placeholder="Поиск товара">

    <Modal
        v-show="isModalVisible"
        @close="closeModal"
        :product="product"
    />

     <section>
       <tr>
         <td><h4>Изображение</h4></td>
         <td><h4>Название</h4></td>
         <td><h4>Категория</h4></td>
         <td><h4>Описание</h4></td>
         <td><h4>Количество</h4></td>
         <td><h4>Цена</h4></td>
         <td><h4>Акция</h4></td>
       </tr>
       <admin-catalog-desk
           v-for="product in products"
           :key="product.id"
           :product="product"
       />
     </section>

  </div>
</template>

<script>
import CatalogService from '@/services/catalog.service'
import Modal from "@/components/admin_components/AdminCatalogModal";
import AdminCatalogDesk from "@/components/admin_components/AdminCatalogDesk";
import {eventBus} from "@/main";

export default {
  components: {
    AdminCatalogDesk,
    Modal,
  },
  data() {
    return {
      product: {
        id:'',
        name: '',
        description: '',
        price: '',
        amount: '',
        category: '',
        image: null,
        sale: ''
      },
      filter: {
        animal: null,
        categories: null,
        priceFrom: 1,
        priceTo: 99999,
        pageNumber: 0,
        pageSize: 6,
        totalPages: null,
        sortBy: 'name',
        sortDirection: 'ASC',
        searchText: null,
      },
      productSearchName: 'Введите название',
      sortBy: 'name',
      products: undefined,
      isModalVisible: false,
      message:'',
    }
  },
  methods: {
    getCatalog() {
      CatalogService.getAllProductsFromCatalog(0,Number.MAX_SAFE_INTEGER,this.sortBy).then(
          response => {
            console.log(response.data);
            this.products = response.data.content
          }
      )
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    findProduct() {
      CatalogService.getByUserFilter(this.filter).then(
          response => {
              this.products = response.data.content
          })
    },
  },
  created() {
    this.getCatalog();
    eventBus.$on('reload', () => this.getCatalog())
  }
}
</script>

