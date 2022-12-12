<template>
  <div class="catalog">
    <div class="heading">
      <h1>Каталог</h1>
    </div>
    <div class="catalog__card-list">
      <Card v-for="(item, index) in categories"
            :key="index"
            :name="item.name"
            :image="'http://localhost:8080/files/' + item.image"
      />
    </div>
  </div>
</template>

<script>
import CategoryService from "@/services/category.service";
import Card from "../Card";

export default {
  components:{
    Card
  },
  data() {
    return {
      animals: {},
      categories: {},
      param: '',
    }
  },
  methods: {

    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categories = response.data
          }
      )

    },

    // РАЗОБРАТЬСЯ!
    openCatalogCategory(catalogParameter) {
      this.$router.push({ name: 'catalog-page', params: {catalogParameter: catalogParameter} });
    }
  },
  created() {
    this.getCategories()
  }
}
</script>

<style lang="scss">
.catalog{
  .catalog__card-list{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
    grid-gap: 2rem;
  }
}
</style>
