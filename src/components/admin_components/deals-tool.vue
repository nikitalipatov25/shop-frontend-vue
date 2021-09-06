<template>
  <div class="deals-tool">
    <h2>Работа с акциями</h2>

    <button class="btn btn-primary">Отчёт по продажам</button>

    <button class="btn btn-success" @click="$bvModal.show('add-sale-modal')">Добавить акцию</button>

    <b-modal id="add-sale-modal" hide-footer title="Добавить акцию">
      <div class="d-block text-left">
        <p>Введите название акции:<input type="text" v-model="sale.name"></p>
        <p>Введите описание акции:<input type="text" v-model="sale.description"></p>
        <p>Добавьте фотографию:<input type="file" ref="file" @change="selectFile"></p>
        <p>Введите начальную дату акции:<input type="text" v-model="sale.date"></p>
        <p>Введите конечную дату акции:<input type="text" v-model="sale.expirationDate"></p>
        <p>Введите размер скидки:<input type="text" v-model="sale.discount"></p>
        <select class="form-select" @change="selectSaleType($event)" v-model="selectedSaleType">
          <option selected>Выберете тип акции</option>
          <option
              v-for="type in saleTypes"
              :value="type.value"
              :key="type"
          >
            {{type.value}}
          </option>
        </select>
          <div class="animals" v-if="selectedSaleType === 'Скидка на тип животных'">
            <p>Добавьте животных</p>
              <div v-for="animal in animalsArr" :key="animal.id">
                <input type="checkbox" v-bind:value="animal.name" v-model="sale.animals"> {{animal.name}}
              </div>
          </div>
          <div class="categories" v-if="selectedSaleType === 'Скидка на категории'">
            <p>Добавьте категории</p>
              <div v-for="category in categoriesArr" :key="category.id">
                <input type="checkbox" v-bind:value="category.name" v-model="sale.categories"> {{category.name}}
              </div>
          </div>
        <div class="products" v-if="selectedSaleType === 'Скидка на продукты'">
          <p>Добавьте продукты:<input type="text" v-model="addedItem"><button type="button" class="btn btn-success" @click="addProduct">Добавить</button></p>
          <p>Вы добавили</p>
            <div v-for="(product, index) in productsArr" :key="product">
              {{product}}
              <p><button type="button" class="btn btn-danger" @click="deleteProduct(index)">Удалить</button></p>
            </div>
        </div>
      </div>
      <button class="btn btn-success" @click="addNewDeal">Добавить акцию</button>
      <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-sale-modal')">Закрыть</button>
    </b-modal>

    <button type="button" class="btn btn-danger">Удалить акцию</button>
    <button type="button" class="btn btn-warning">Изменить акцию</button>
  </div>
</template>

<script>
import FileService from '@/services/files.service'
import SaleService from '@/services/sale.service'
import CatalogService from '@/services/catalog.service'
import AnimalService from "@/services/animal.service"
import CategoryService from '@/services/category.service'

export default {
  data() {
    return {
      sale: {
        name: '',
        description: '',
        image: null,
        date:'',
        expirationDate:'',
        discount: 0,
        saleType: '',
        animals: [],
        categories: [],
        products: []
      },
      saleTypes: [
        {
          value: 'Скидка на тип животных'
        },
        {
          value: 'Скидка на категории'
        },
        {
          value: 'Скидка на продукты'
        }
      ],
      animalsArr: [],
      categoriesArr: [],
      productsArr: [],
      selectedFiles: undefined,
      currentFile: undefined,
      selectedSaleType: 'Выберете тип акции',
      addedItem: '',
    }
  },
  methods: {
    getAnimals() {
      AnimalService.getAnimals().then(
          response => {
            this.animalsArr = response.data;
          })
    },
    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categoriesArr = response.data;
          })
    },
    addProduct() {
      CatalogService.getOneProduct(this.addedItem).then(
         response => {
           let product = response.data.id + ' ' + response.data.name;
           this.sale.products.push(this.addedItem);
           this.productsArr.push(product);
           this.addedItem = '';
         })
    },
    deleteProduct(index) {
      this.sale.products.splice(index, 1);
      this.productsArr.splice(index, 1)
    },
    selectSaleType(event) {
      this.sale.saleType = event.target.value;
    },
    async addNewDeal() {
      this.currentFile = this.selectedFiles.item(0);
      await FileService.uploadImage(this.currentFile);
      this.sale.image = this.currentFile.name;
      await SaleService.createSale(this.sale);
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      console.log(this.selectedFiles)
    },
  },
  created() {
    this.getAnimals();
    this.getCategories();
  }
}
</script>