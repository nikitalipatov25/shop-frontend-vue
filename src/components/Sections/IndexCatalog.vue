<template>
  <div class="catalog">
    <h1 class="heading">Каталог</h1>
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
    // getAnimals() {
    //   AnimalService.getAnimals().then(
    //       response => {
    //         this.animals = response.data;
    //       })
    // },

    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categories = response.data
            console.log(response.data)

          }
      )

    },

    // РАЗОБРАТЬСЯ!
    openCatalogCategory(catalogParameter) {
      // console.log(catalogParameter)
      this.$router.push({ name: 'catalog-page', params: {catalogParameter: catalogParameter} });
    }
  },
  created() {
    // this.getAnimals()
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
