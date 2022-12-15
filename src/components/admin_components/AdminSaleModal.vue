<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">Добавить акцию</slot>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            {{message}}
            <p>Введите название акции: <input v-model="sale.name"></p>
            <p>Введите дату начала акции: <input v-model="sale.date"></p>
            <p>Введите дату окончания акции: <input v-model="sale.expirationDate"></p>
            <p>Введите скидку: <input v-model="sale.discount"></p>
            <p>Выберете продукты: <span>{{ saleProducts.length === 0 ? "Не один из товаров не выбран" : saleProducts  }}</span></p>
            <div v-for="item in products" :key="item.id">
              <input type="checkbox" v-model="saleProducts" :value="item.id"> {{item.name}}
            </div>
            <p><label class="btn btn-default p-0"><input type="file" accept="image/*" ref="file" @change="selectImage"/></label></p>
            <div v-if="previewImage === undefined">
              <p><img  :src="'http://localhost:8080/files/' + sale.image" alt="" height="100" width="100"/></p>
            </div>
            <div v-else>
              <p><img  :src="previewImage" alt="" height="100" width="100"/></p>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
          <div v-if="sale.id.length === 0">
            <button type="button" class="btn-green" @click="addSale()" aria-label="Close modal">Добавить</button>
          </div>
          <div v-else>
            <button type="button" class="btn-green" @click="editSale()" aria-label="Close modal">Изменить</button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import CatalogService from "@/services/catalog.service";
import SaleService from "@/services/sale.service";
import {eventBus} from "@/main";

export default {
  name: 'Modal',
  props: {
    sale: {
      type: Object
    },
  },
  data() {
    return {
      message: '',
      products: undefined,
      productCategory:undefined,
      currentImage: undefined,
      previewImage: undefined,
      saleProducts: []
    }
  },
  methods: {
    addSale() {
      this.message = ''
      SaleService.createSale(this.sale.name,
          this.currentImage,
          this.sale.date,
          this.sale.expirationDate,
          this.sale.discount,
          this.saleProducts).catch(
          () => {this.message = 'Заполните все поля!'})
      if (this.message === '') {
        this.message = 'Акция добавлена.'
      }
    },
    async editSale() {
      await SaleService.modifySale(this.sale.id,
          this.sale.name,
          this.currentImage,
          this.sale.date,
          this.sale.expirationDate,
          this.sale.discount,
          this.saleProducts).catch(
          () => {this.message = 'Заполните все поля!'})
      if (this.message === '') {
        this.message = 'Акция изменена.'
      }
    },
    getProducts() {
      CatalogService.getAllProductsFromCatalog(0, Number.MAX_SAFE_INTEGER, 'name').then(
          response => {
            this.products = response.data.content
          }
      )
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
    this.getProducts()
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