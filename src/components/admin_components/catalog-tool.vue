<template>
  <div class="catalog-tool">
    <h2>Работа с каталогом</h2>

    <button type="button" class="btn btn-success" @click="$bvModal.show('add-product-modal')">Добавить товар в каталог</button>
    <b-modal id="add-product-modal" hide-footer title="Добавить товар">
      <div class="d-block text-left">
        <p>Введите название товара: <input type="text" v-model="product.name"/></p>
        <p>Введите описание товара: <input type="text" v-model="product.description"/></p>
        <p>Введите стоимость товара: <input type="text" v-model="product.price"/></p>
        <p>Введите количество товара: <input type="text" v-model="product.quantity"/></p>
        <p>Введите тип животного: <input type="text" v-model="product.animal"/></p>
        <p>Введите категорию товара: <input type="text" v-model="product.category"/></p>
        <p>Добавьте фотографию:<input type="file" ref="file" @change="selectFile"></p>
      </div>
      <button class="btn btn-success" @click="addNewProductToCatalog">Добавить товар</button>
      <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-product-modal')">Закрыть</button>
    </b-modal>

    <button type="button" class="btn btn-danger" @click="$bvModal.show('delete-product-modal')">Удалить товар из каталога</button>
    <b-modal id="delete-product-modal" hide-footer title="Удалить товар">
      <div class="d-block text-left">
        <p>Введите артикул товара: <input type="text" v-model="productUUID"/></p>
      </div>
      <button class="btn btn-success" @click="deleteProductFromCatalog">Удалить товар</button>
      <button type="button" class="btn btn-danger" @click="$bvModal.hide('delete-product-modal')">Закрыть</button>
    </b-modal>

    <button type="button" class="btn btn-warning" @click="$bvModal.show('modify-product-modal')">Модифицировать существующий товар в каталоге</button>
    <b-modal id="modify-product-modal" hide-footer title="Модифицировать товар">
      <div class="d-block text-left">
        <p>Введите артикул товара: <input type="text" v-model="productUUID" @keyup.enter="findProduct"/></p>
        <div class="modify-body" v-if="isDetected">
          <div class="row">
            <div class="col-4">
              <img
                  :src="'http://localhost:8080/files/' + product.photo"
                  style="width: 100px; height: 100px"
              >
            </div>
            <div class="col-8">
              <p>Название<input type="text" v-model="product.name"></p>
              <p>Введите описание товара: <input type="text" v-model="product.description"/></p>
              <p>Введите стоимость товара: <input type="text" v-model="product.price"/></p>
              <p>Введите количество товара: <input type="text" v-model="product.quantity"/></p>
              <p>Введите тип животного: <input type="text" v-model="product.animal"/></p>
              <p>Введите категорию товара: <input type="text" v-model="product.category"/></p>
          </div>
            </div>
        </div>
      </div>
      <button class="btn btn-success" @click="modifyProductInCatalog">Модифицировать товар</button>
      <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-product-modal')">Закрыть</button>
    </b-modal>

  </div>
</template>

<script>
import AdminService from '@/services/admin.service'

export default {
  data() {
    return {
      product: {
        'name': '',
        'description': '',
        'price': '',
        'quantity': '',
        'animal': '',
        'category': '',
        'photo': ''
      },
      detectedProduct: {},
      productUUID: '',
      isDetected: false,
      selectedFiles: undefined,
      currentFile: undefined
    }
  },
  methods: {
    findProduct() {
      AdminService.getProductFromCatalog(this.productUUID).then(
          response => {
            this.product.name = response.data.name;
            this.product.description = response.data.description;
            this.product.price = response.data.price;
            this.product.quantity = response.data.quantity;
            this.product.animal = response.data.animal;
            this.product.category = response.data.category;
            this.product.photo = response.data.photo;
            this.isDetected = true;
          })
    },
    async addNewProductToCatalog() {
      this.currentFile = this.selectedFiles.item(0);
      await AdminService.uploadImage(this.currentFile);
      this.product.photo = this.currentFile.name;
      await AdminService.addProductToCatalog(this.product);
      this.$bvModal.hide('add-product-modal');
    },
    deleteProductFromCatalog() {
      AdminService.deleteProductFromCatalog(this.productUUID);
      this.$bvModal.hide('delete-product-modal');
    },
    modifyProductInCatalog() {
      AdminService.modifyProductInCatalog(this.productUUID, this.product);
      this.$bvModal.hide('modify-product-modal');
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      console.log(this.selectedFiles);
    },
  }
}
</script>