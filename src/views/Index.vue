<template>
  <div class="index">
    <Header/>
    <main class="container">
      <section class="carousel_section">
        <section class="heading">
          <h1>Наши акции</h1>
        </section>
        <Carousel
            :carousel_data="sliderItems"
            :interval="5000"
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
              :productUUID="productsUUID"
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
              :productUUID="productsUUID"
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
import Carousel from "../components/carusel/Carusel"
import '../assets/Style.scss'
import CatalogService from '../services/catalog.service'
import saleService from "@/services/sale.service";
import CartService from "@/services/cart.service";
import {eventBus} from "@/main";


export default {
    name: 'Index',
  components: {
    Header,
    Footer,
    ProductCard,
    IndexCatalog,
    Carousel

  },
  data() {
      return {
        productsUUID: [],
        popularProducts: [],
        newProducts: [],
        testCarousel: undefined,
        sliderItems: []
      }
  },
  methods: {
    getUserProducts() {
      CartService.getUserProducts().then(
          response => {
            this.productsUUID = response.data
          }
      )
    },
      testCor() {
        saleService.getSales().then(
            response => {
              this.sliderItems = response.data.content
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
      this.getUserProducts();
      eventBus.$on('reloadCard', this.getUserProducts)
  },
  computed: {

  }
}
</script>
