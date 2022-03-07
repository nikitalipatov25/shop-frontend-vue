<template>
    <div class="index">
      <Header/>
        <div class="body">
          <h1 class="heading">Наши акции</h1>
          <index-corusel/>
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
import IndexCatalog from "@/components/IndexCatalog"
import IndexCorusel from '@/components/IndexCorusel'

import '../assets/Style.scss'

import CatalogService from '../services/catalog.service'

export default {
    name: 'Index',
  components: {
    IndexCorusel,
    Header,
    Footer,
    IndexCatalog,

  },
  data() {
      return {
        popularProducts: [],
        newProducts: []
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
