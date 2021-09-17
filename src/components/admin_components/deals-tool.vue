<template>
  <div class="deals-tool">
    <h2>Работа с акциями</h2>

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

    <button type="button" class="btn btn-danger" @click="$bvModal.show('delete-sale-modal')">Удалить акцию</button>

    <b-modal id="delete-sale-modal" hide-footer title="Удалить акцию">
      <div class="d-block text-left">
        <p>Введите идентификатор акции: <input type="text" v-model="saleId" @keyup.enter="findSale"/></p>
        <div class="delete-body" v-if="isDetected">
          <strong>Вы собираетесь удалить {{sale.name}} со скидкой {{sale.discount}} %</strong>
          <button class="btn btn-success" @click="deleteSale">Удалить акцию</button>
          <button type="button" class="btn btn-danger" @click="$bvModal.hide('delete-sale-modal')">Закрыть</button>
        </div>
      </div>
    </b-modal>

    <button type="button" class="btn btn-warning" @click="$bvModal.show('modify-sale-modal')">Изменить акцию</button>

    <b-modal id="modify-sale-modal" hide-footer title="Изменить акцию">
      <div class="d-block text-left">
        <p>Введите идентификатор акции: <input type="text" v-model="saleId" @keyup.enter="findSale"/></p>
        <div class="modify-body" v-if="isDetected">
          <div class="row">
            <div class="col-4">
              <img
                  :src="'http://localhost:8080/files/' + sale.image"
                  style="width: 100px; height: 100px"
              >
            </div>
            <div class="col-8">
              <p>Название<input type="text" v-model="sale.name"></p>
              <p>Добавьте фотографию:<input type="file" ref="file" @change="selectFile"></p>
              <p>Введите описание акции: <input type="text" v-model="sale.description"/></p>
              <p>Введите дату начала: <input type="text" v-model="sale.date"/></p>
              <p>Введите дату окончания акции: <input type="text" v-model="sale.expirationDate"/></p>
              <p>Введите размер скидки: <input type="text" v-model="sale.discount"/></p>
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
          </div>
          <button class="btn btn-success" @click="modifySale">Изменить акцию</button>
          <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-sale-modal')">Закрыть</button>
        </div>
      </div>
    </b-modal>

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
      saleId: '',
      isDetected: false,
    }
  },
  methods: {
    findSale() {
      SaleService.getSale(this.saleId).then(
          response => {
            this.sale.name = response.data.name;
            this.sale.description = response.data.description;
            this.sale.date = response.data.date;
            this.sale.expirationDate = response.data.expirationDate;
            this.sale.discount = response.data.discount;
            this.sale.image = response.data.image;
            this.isDetected = true;
          });
    },
    async deleteSale() {
      await SaleService.deleteSale(this.saleId);
      this.isDetected = false;
      this.saleId = '';
      this.$bvModal.hide('delete-sale-modal');
    },
    modifySale() {
      this.sale.id = this.saleId;
      SaleService.modifySale(this.sale);
    },
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