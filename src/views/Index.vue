<template>
    <div class="index">
      <Header/>
        <div class="body">
          <h1 class="heading">Наши акции</h1>
          <Carousel
            :carousel_data="testCarousel"

          />
          <!--          -->
          <IndexCatalog/>
          <!--          -->
          <h1 class="heading">Новинки</h1>
          <div v-for="product in newProducts" :key="product.id" >
            Товар {{product.name}} добавлен {{product.creationDate}}
          </div>
          <h1 class="heading">Популярные товары</h1>
          <div v-for="product in popularProducts" :key="product.id" >
            Товар {{product.name}} с рейтингом {{product.rating}} и {{product.reviews}} отзывами
          </div>
        </div>
      <Footer/>
    </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Foter'
import IndexCatalog from "../components/Sections/IndexCatalog";
import Carousel from "../components/Base/Carousel/Carousel";

import '../assets/Style.scss'

import CatalogService from '../services/catalog.service'

export default {
    name: 'Index',
  components: {
    Header,
    Footer,
    IndexCatalog,
    Carousel

  },
  data() {
      return {
        popularProducts: [],
        newProducts: [],
        testCarousel: [
          {name: 'img1', img: 'cats.jpg'},
          {name: 'img2', img: 'fish.jpg'},
          {name: 'img3', img: 'humsters.jpg'},
          {name: 'img4', img: 'humsters.jpg'},
          {name: 'img5', img: 'humsters.jpg'},
          {name: 'img6', img: 'humsters.jpg'},
        ]
      }
  },
  methods: {
    getPopularProducts() {
      CatalogService.getPopularProducts().then(
          response => {
            this.popularProducts = response.data;
          })
  },
    getNewProducts() {
      CatalogService.getNewProducts().then(
          response => {
            this.newProducts =response.data
          })
    }
  },
  created() {
      this.getPopularProducts();
      this.getNewProducts();
  }
}
</script>
