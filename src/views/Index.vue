<template>
  <div class="index">
    <Header/>
    <main class="container">
      <section class="carousel_section">
        <section class="heading">
<!--          {{testCarousel}}-->
          <h1>Акции</h1>
        </section>
        <Carousel
            :carousel_data="testCarousel"
        />
      </section>
      <section class="catalog_section">
        <IndexCatalog/>
      </section>
      <section class="new_product_section">
        <section class="heading">
          <h1>Новинки</h1>
        </section>
        <div class="card_list card_list-index">
          <product-card
              v-for="product in newProducts"
              :key="product.id"
              :product="product"
          />
        </div>
      </section>
      <section class="pop_product_section">
        <section class="heading">
          <h1>Популярные товары</h1>
        </section>
        <div class="card_list card_list-index">
          <product-card
              v-for="product in popularProducts"
              :key="product.id"
              :product="product"
          />
        </div>
      </section>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import ProductCard from "../components/ProductCard";
import IndexCatalog from "../components/Sections/IndexCatalog";
import Carousel from "../components/Base/Carousel/Carousel";

import '../assets/Style.scss'

import CatalogService from '../services/catalog.service'
import saleService from "@/services/sale.service";

export default {
    name: 'Index',
  components: {
    Header,
    Footer,
    ProductCard,
    IndexCatalog,
    Carousel,

  },
  data() {
      return {
        popularProducts: [],
        newProducts: [],
        testCarousel: undefined
        // testCarousel: [
        //   {name: 'img1', img: 'cats.jpg'},
        //   {name: 'img2', img: 'fish.jpg'},
        //   {name: 'img3', img: 'humsters.jpg'},
        //   {name: 'img4', img: 'humsters.jpg'},
        //   {name: 'img5', img: 'humsters.jpg'},
        //   {name: 'img6', img: 'humsters.jpg'},
        // ]
      }
  },
  methods: {
      testCor() {
        saleService.getSales().then(
            response => {
              this.testCarousel = response.data.content
            })
      },
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
      this.testCor()
      this.getPopularProducts();
      this.getNewProducts();
  }
}
</script>
