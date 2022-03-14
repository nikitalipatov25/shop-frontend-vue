<template>
    <div class="index">
      <Header/>
        <main>
          <section class="carousel_section">
            <div class="heading">
              <h1>Наши акции</h1>
            </div>
            <Carousel
                :carousel_data="testCarousel"

            />
          </section>
          <section class="catalog_section">
            <IndexCatalog/>
          </section>
          <section class="new_product_section">
            <div class="heading">
              <h1>Новинки</h1>
            </div>
            <div v-for="(product,index) in newProducts" :key="index" >
              Товар {{product.name}} добавлен {{product.creationDate}}
            </div>
          </section>
          <section class="pop_product_section">
            <div class="heading">
              <h1 class="heading">Популярные товары</h1>
            </div>
            <div v-for="product in popularProducts" :key="product.id" >
              Товар {{product.name}} с рейтингом {{product.rating}} и {{product.reviews}} отзывами
            </div>
          </section>
        </main>
      <Footer/>
    </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
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
