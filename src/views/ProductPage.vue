<template>
  <div class="product-page">
    <Header/>
    <div class="body">
      <div class="category-nav">
        <a href="#">{{ currentProduct.animal }}</a>
        <a href="#">{{ currentProduct.category }}</a>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-5">
            <img
              :src="currentProduct.photo"
              :alt="currentProduct.name"
              height="300px"
            >
          </div>
          <div class="col-7">
            <h1>{{ currentProduct.name }}</h1>
            <p>Артикул товара: {{ currentProduct.id }}</p>
            <hr>
            <p>Описание: {{ currentProduct.description }}</p>
            <hr>
            <p>В наличии: {{ currentProduct.quantity }} шт.</p>
            <p><button class="btn btn-primary" @click="addProductToCart">Добавить в корзину: {{currentProduct.price}} руб.</button></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CatalogService from '../services/catalog.service'
import CartService from "@/services/cart.service";

export default {
  name: 'ProductPage',
  components: {
    Header
  },
  data() {
    return {
      currentProduct: {
        id: '',
        name: '',
        price: '',
        photo: '',
        description: '',
        quantity: '',
        animal: '',
        category: ''
      }
    }
  },
  created() {
    this.currentProduct.id = this.$route.params.id;
    this.getProductFromCatalog();
  },
  methods: {
    getProductFromCatalog() {
      CatalogService.getProductFromCatalog(this.currentProduct.id).then(
        response => {
          this.currentProduct.name = response.data.name;
          this.currentProduct.price = response.data.price;
          this.currentProduct.photo = response.data.photo;
          this.currentProduct.description = response.data.description;
          this.currentProduct.quantity = response.data.quantity;
          this.currentProduct.animal = response.data.animal;
          this.currentProduct.category = response.data.category;
        }
      )
  },
    addProductToCart() {
      //Этот метот взят с компонента "productList". Там была использована шина событий (Не помню зачем).
      CartService.addToCart(this.currentProduct.id);
    }
  }
}
</script>

<style>
.container h1 {
  text-align: left;
}
.col-7 {
  text-align: left;
}
.category-nav {
  text-align: left;
}
.category-nav a {
  margin-right: 25px;
}
</style>