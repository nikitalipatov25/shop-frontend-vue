<template>
  <section class="catalog container">
    <h1 class="heading">Наш каталог</h1>
    <div class="catalog__card-list">
      <Card v-for="(item, index) in animals"
            :key="index"
            :name="item.name"
            :img="item.imageURL"
      />
    </div>
  </section>
</template>

<script>
import AnimalService from '@/services/animal.service'
import Card from "../Card";

export default {
  components:{
    Card
  },
  data() {
    return {
      animals: {},
      param: '',
    }
  },
  methods: {
    getAnimals() {
      AnimalService.getAnimals().then(
          response => {
            this.animals = response.data;
          })
    },
    // РАЗОБРАТЬСЯ!
    openCatalogCategory(catalogParameter) {
      // console.log(catalogParameter)
      this.$router.push({ name: 'catalog-page', params: {catalogParameter: catalogParameter} });
    }
  },
  created() {
    this.getAnimals()
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
