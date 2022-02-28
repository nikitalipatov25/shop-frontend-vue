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
              :src="currentProduct.image"
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
            <p>В наличии: {{ currentProduct.amount }} шт.</p>
            <p><button class="btn btn-primary" @click="addProductToCart">Добавить в корзину: {{currentProduct.price}} руб.</button></p>
          </div>
        </div>


        <section class="comment">
          <div class="row">
            <div class="col-12">
              <h1 class="title">
                Комментарии
              </h1>
            </div>
          </div>
          <CommentForm />
          <CommentList :comments="comments"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Sections/Header'
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

import CatalogService from '../services/catalog.service'
import CartService from "@/services/cart.service";
import CommentService from '../services/comment.service'

export default {
  name: 'ProductPage',
  components: {
    Header,
    CommentForm,
    CommentList
  },
  data() {
    return {
      currentProduct: {
        id: '',
        name: '',
        price: '',
        image: '',
        description: '',
        amount: '',
        animal: '',
        category: ''
      },
      comments: null,
      answers: null
    }
  },
  created() {
    this.currentProduct.id = this.$route.params.id;
    this.getProductFromCatalog();
    this.getComments()
  },
  methods: {
    getComments() {
      CommentService.getNewComments(this.currentProduct.id)
          .then(
              response => {
                this.comments = response.data.content
                // this.answers = response.data.content
                console.log(this.comments)
              }
          )
    },
    getProductFromCatalog() {
      CatalogService.getProductFromCatalog(this.currentProduct.id).then(
        response => {
          this.currentProduct.name = response.data.name;
          this.currentProduct.price = response.data.price;
          this.currentProduct.image = response.data.image;
          this.currentProduct.description = response.data.description;
          this.currentProduct.amount = response.data.amount;
          this.currentProduct.animal = response.data.animal;
          this.currentProduct.category = response.data.category;
          // this.comments = response.data.comments;
          // this.answers = response.data.answers;
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
.comment{
  margin-top: 50px;
}
.comment h1{
  text-align: center;
}
</style>
