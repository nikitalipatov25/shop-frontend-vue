<template>
  <div class="catalog">
    <Header/>
    <div class="body">
      <div class="row">
        <div class="col-2">
          <newMenuInCatalog/>
        </div>
        <div class="col-10">
          <div class="catalog-nav">
            <div class="row">
              <div class="col-3">
                <h1>Каталог</h1>
              </div>
              <div class="col-4">
              </div>
              <div class="col-3">
                <select class="form-select" aria-label="Default select example" @change="sortProducts($event)">
                  <option selected value="name,ASC">По умолчанию</option>
                  <option value="price,ASC">Сначала дешевле</option>
                  <option value="price,DESC">Сначала дороже</option>
                  <option value="rating,DESC">Сначала с высоким рейтингом</option>
                </select>
              </div>
            </div>
          </div>
            <product-card
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>
      </div>
      <hr>
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li @click="changePageNoIndex('first')" class="page-item"><a class="page-link" >&laquo;</a></li>
          <li @click="changePageNoIndex('previous')" class="page-item"><a class="page-link" >Предыдущая</a></li>
          <li @click="changePage(pageIndex)" class="page-item" v-for="pageIndex in filter.totalPages" :key="pageIndex"><a class="page-link">{{ pageIndex }}</a></li>
          <li @click="changePageNoIndex('next')" class="page-item"><a class="page-link" >Следующая</a></li>
          <li @click="changePageNoIndex('last')" class="page-item"><a class="page-link" >&raquo;</a></li>
        </ul>
      </nav>
    </div>
    <Footer/>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import newMenuInCatalog from "@/components/newMenuInCatalog";
import Header from '../components/Sections/Header'
import Footer from '../components/Foter'
import { eventBus } from '@/main'
import CatalogService from '../services/catalog.service'

export default {
  name: 'Catalog',
  components: {
    ProductCard,
    Header,
    Footer,
    newMenuInCatalog
  },
  data() {
    return {
      content: {},
      products: [],
      productsFromServer: {},
      text: 'Все товары',
      filter: {
        animal: null,
        categories: null,
        priceFrom: 1,
        priceTo: 99999,
        pageNumber: 0,
        pageSize: 4,
        totalPages: null,
        sortBy: 'name',
        sortDirection: 'ASC',
        searchText: null,
      }

    }
  },
methods: {
  getFilteredProducts() {
    CatalogService.getByUserFilter(this.filter).then(
        response => {
          this.productsFromServer = response;
          console.log(this.productsFromServer);
          this.products = this.productsFromServer.data.content;
          this.filter.totalPages = this.productsFromServer.data.totalPages;
        }
    )
  },
  sortProducts(event) {
    let value = event.target.value;
    let values = value.split(",",2);
    this.filter.sortBy = values[0];
    this.filter.sortDirection = values[1];
    this.getFilteredProducts();
  },
  changePage(pageIndex) {
    this.filter.pageNumber = pageIndex - 1;
    this.getFilteredProducts()
    window.scrollTo(0, 0);
  },
  async changePageNoIndex(parameter) {
    switch (parameter) {
      case 'first':
        this.filter.pageNumber = 0;
        break;
      case 'previous':
        if (this.filter.pageNumber > 0) {
          this.filter.pageNumber = this.filter.pageNumber - 1;
        }
        break;
      case 'next':
        if (this.filter.pageNumber !== this.filter.totalPages - 1) {
          this.filter.pageNumber = this.filter.pageNumber + 1;
        }
        break;
      case 'last':
        this.filter.pageNumber = this.filter.pageNumber - 1;
        break;
    }
    await this.getFilteredProducts()
    window.scrollTo(0, 0);
  },
},
  created() {
    this.getFilteredProducts()
    eventBus.$on('createUserFilter', payload => {
      this.filter.animal = payload.animal;
      this.filter.categories = payload.categories;
      this.filter.priceFrom = payload.priceFrom;
      this.filter.priceTo = payload.priceTo;
      this.getFilteredProducts();
    });
    eventBus.$on('searchProducts', data => {
      this.filter.searchText = data;
      this.getFilteredProducts()
    });
    eventBus.$on('changePage', data => {
      this.filter.pageNumber = data
      this.getFilteredProducts()
    });
    eventBus.$on('sortProducts', data => {
      this.filter.pageNumber = data;
      this.getFilteredProducts()
    });
  }
}
</script>
