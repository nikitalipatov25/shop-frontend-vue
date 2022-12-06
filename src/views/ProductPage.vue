<template>
  <div class="product">
    <Header/>
    <main class="container">
      <section class="product__about_section">
        <div class="about__img">
            <img
              :src="'http://localhost:8080/files/' + currentProduct.image"
              :alt="currentProduct.name"
              height="300px"
            >
        </div>
        <div class="description">
          <nav class=" product__category_nav" @click="openCatalogCategory(currentProduct.category)">
            <span> > </span>
            <a>{{ currentProduct.category }}</a>
          </nav>
          <div class=" product__heading">
            <h1>{{ currentProduct.name }}</h1>
          </div>
          <div class="product__el product__id">
            <p><span>Артикул товара:</span> {{ currentProduct.id }}</p>
          </div>
          <div class="product__el product__description">
            <p><span>Описание:</span> {{ currentProduct.description }}
            </p>
          </div>
          <div class="product__el product__amount">
            <p><span>В наличии:</span> {{ currentProduct.amount }} шт.</p>
          </div>
          <div class="product__el product__price" v-if="currentProduct.discountPrice <= 0">
            <h1>{{currentProduct.price}} ₽</h1>
          </div>
          <div class="product__el product__price" v-else>
            <h1>{{currentProduct.discountPrice}} ₽</h1>
          </div>
          <div class="product__el product__btn">
            <Button v-if="!currentProduct.isInCart"
                :label="'Добавить'"
                :size="'medium'"
                :color="'color'"
                :click="addProductToCart"
            />
            <Button v-else
                    :label="'Товар в корзине'"
                    :size="'medium'"
                    :color="'color'"
            />
          </div>
        </div>
      </section>
      <section class="comment_section">
        <div class="heading">
          <h1 class="title">Отзывы</h1>
        </div>
        <CommentForm />
        <CommentList :comments="comments"/>
      </section>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from "../components/Sections/Footer";
import CommentForm from "../components/Base/Comment/CommentForm";
import CommentList from "../components/Base/Comment/CommentList";
import Button from "../components/Base/Button";
import CatalogService from '../services/catalog.service'
import CartService from '../services/cart.service'
import CommentService from '../services/comment.service'
import {eventBus} from "@/main";

export default {
  name: 'ProductPage',
  components: {
    Header,
    Footer,
    Button,
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
        discountPrice: '',
        category: '',
        isInCart: false
      },
      comments: null,
      products: []
    }
  },
  created() {
    this.currentProduct.id = this.$route.params.id;
    this.getProductFromCatalog();
    this.getUserProducts();
    this.getComments()
    eventBus.$on('reloadComments', this.getComments)
  },
  methods: {
    openCatalogCategory(catalogParameter) {
      this.$router.push({ name: 'catalog-page', params: {catalogParameter: catalogParameter} });
    },
    async getUserProducts() {
      await CartService.getUserProducts().then(
          response => this.products = response.data
      )
      this.isInCart()
    },
    isInCart() {
      for (let i = 0; i < this.products.length; i++) {
        if (this.currentProduct.id === this.products[i]) {
          this.currentProduct.isInCart = true
        }
      }
    },
    async getComments() {
      await CommentService.getNewComments(this.currentProduct.id)
          .then(
              response => {
                this.comments = response.data
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
          this.currentProduct.discountPrice = response.data.discountPrice
          this.currentProduct.category = response.data.category;
        }
      )
  },
    async addProductToCart() {
      let cartDTO = {
        "productId": this.currentProduct.id,
        "amount": 1
      }
      await CartService.addProductToCart(cartDTO);
      await this.getUserProducts()
    }
  },
}
</script>

<style lang="scss">
  .product{
    .product__about_section{
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      .about__img{
        display: grid;
        justify-items: center;
        align-items: center;
        img{
          height: 400px;
        }
      }
      .description{
        .product__el{
          padding: 10px 0px;
          span{
            font-weight: bold;
          }
        }
        .product__category_nav{
          a,span{
            color: #cccccc;
          }
        }
        .product__heading{
        }
        .product__id{

        }
        .product__description{

        }
        .product__amount{
        }
        .product__price{

        }
        .product__btn{

        }
      }
    }
    @media (max-width: 768px) {
      .product__btn{
        display: grid;
        justify-items: center;
      }
      .product__about_section{
        .about__img {
          img {
            height: 300px;
          }
        }
      }

    }
  }

</style>
