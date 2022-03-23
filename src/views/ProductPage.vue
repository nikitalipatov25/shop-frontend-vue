<template>
  <div class="product">
    <Header/>
    <main class="container">
      <section class="product__about_section">
        <div class="about__img">
            <img
              :src="currentProduct.image"
              :alt="currentProduct.name"
              height="300px"
            >
<!--          <img src="../assets/pngkey_com-cat-food-png-3432927.png" alt="">-->
        </div>
        <div class="description">
          <nav class=" product__category_nav">
            <a href="#">{{ currentProduct.animal }}</a>
            <span> >> </span>
            <a href="#">{{ currentProduct.category }}</a>
          </nav>
          <div class=" product__heading">
            <h1>{{ currentProduct.name }}</h1>
          </div>
          <div class="product__el product__id">
            <p><span>Артикул товара:</span> {{ currentProduct.id }}</p>
          </div>
          <div class="product__el product__description">
            <p><span>Описание:</span> {{ currentProduct.description }}
<!--              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus dui non turpis placerat, vitae molestie lorem hendrerit. Praesent quam risus, luctus id elit vitae, pretium consequat neque. Fusce at tempus eros. Integer rutrum pretium justo quis cursus. Integer tincidunt, neque condimentum sagittis gravida, sem leo malesuada quam, vel aliquet dolor elit vel sem. Phasellus eget dapibus magna. Phasellus sit amet purus tempor, accumsan dolor at, commodo quam. Donec augue velit, imperdiet sit amet commodo eget, euismod egestas lectus. Fusce eu scelerisque nulla. Integer aliquam mauris et consequat dignissim. Donec tincidunt nulla turpis, et sodales nunc tempus id. Praesent luctus rutrum sollicitudin. Vestibulum vulputate dui consequat, consectetur lacus quis, malesuada tortor. Donec pretium a turpis at iaculis. Nullam massa ligula, sagittis ut dui quis, convallis vestibulum ante. Vestibulum gravida scelerisque accumsan.-->
            </p>
          </div>
          <div class="product__el product__amount">
            <p><span>В наличии:</span> {{ currentProduct.amount }} шт.</p>
          </div>
          <div class="product__el product__price">
            <h1>{{currentProduct.price}} ₽</h1>
          </div>
          <div class="product__el product__btn">
            <Button
                :label="'Добавить'"
                :size="'medium'"
                :color="'color'"
                :click="addProductToCart"
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
      CartService.addProductToCart(this.currentProduct.id);
    }
  }
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
