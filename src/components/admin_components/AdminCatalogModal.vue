<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">Добавить товар</slot>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            {{ message }}
            <p>Введите название товара: <input v-model="product.name"></p>
            <p>Введите описание товара: <input v-model="product.description"></p>
            <p>Введите количество товара: <input v-model="product.amount"></p>
            <p>Введите цену товара: <input v-model="product.price"></p>
            <p>Выберите категорию товара:
              <select v-model="productCategory">
                <option v-for="item in categories" :key="item.id" @click="productCategory = item.name">{{item.name}}</option>
              </select>
            </p>

            <p><label class="btn btn-default p-0"><input type="file" accept="image/*" ref="file" @change="selectImage"/></label></p>
            <div v-if="previewImage === undefined">
              <p><img  :src="'http://localhost:8080/files/' + product.image" alt="" height="100" width="100"/></p>
            </div>
            <div v-else>
              <p><img  :src="previewImage" alt="" height="100" width="100"/></p>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
          <div v-if="product.id.length === 0">
            <button type="button" class="btn-green" @click="addProductToCatalog()" aria-label="Close modal">Добавить</button>
          </div>
          <div v-else>
            <button type="button" class="btn-green" @click="modifyProductInCatalog()" aria-label="Close modal">Изменить</button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import CatalogService from "@/services/catalog.service";
import CategoryService from "@/services/category.service";
import {eventBus} from "@/main";

export default {
  name: 'Modal',
  props: {
    product: {
      type: Object
    },
  },
  data() {
    return {
      categories: [],
      productCategory:undefined,
      currentImage: undefined,
      previewImage: undefined,
      message: ''
    }
  },
  methods: {
    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categories = response.data
          })
    },
    async addProductToCatalog() {
      this.message = ''
      await CatalogService.addProductToCatalog(this.product.name,
          this.product.description,
          this.product.amount,
          this.currentImage,
          this.product.price,
          this.productCategory).catch(
              () => {this.message = 'Заполните все поля!'})
      if (this.message === '') {
        this.message = 'Товар добавлен.'
      }
    },
     async modifyProductInCatalog() {
         await CatalogService.modifyProductInCatalog(this.product.id,
             this.product.name,
             this.product.description,
             this.product.amount,
             this.currentImage,
             this.product.price,
             this.productCategory).catch(
           () => {this.message = 'Заполните все поля!'})
       if (this.message === '') {
         this.message = 'Товар изменен.'
       }
     },
    selectImage() {
        this.currentImage = this.$refs.file.files.item(0);
        this.previewImage = URL.createObjectURL(this.currentImage);
    },
    close() {
      this.$emit('close');
      eventBus.$emit('reload')
      this.message = ''
    }
},
  created() {
    this.getCategories()
  }
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  display: grid;
  gap: 20px;
}
input{
  outline: none;
  -moz-appearance: none;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  cursor: pointer;
  padding: 5px 10px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>