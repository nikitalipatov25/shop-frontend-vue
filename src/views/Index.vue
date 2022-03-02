<template>
    <div class="index">
      <Header/>
        <div class="body">
<!--          <h2>Наши акции</h2>-->
<!--          <index-corusel/>-->
          <!--          -->
          <h2>Наш каталог</h2>
          <IndexCatalog/>
          <!--          -->
          <h2>Новинки</h2>
          <div v-for="product in newProducts" :key="product.id" >
            Товар {{product.name}} добавлен {{product.creationDate}}
          </div>
          <h2>Популярные товары</h2>
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
// import IndexCorusel from '@/components/IndexCorusel'

import CatalogService from '../services/catalog.service'

export default {
    name: 'Index',
  components: {
    // IndexCorusel,
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
