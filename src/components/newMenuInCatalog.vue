<template>
  <div class="custom-left-menu">

    <p><strong @click="isAnimalClicked = !isAnimalClicked">Питомец</strong></p>
    <div class="animal" v-if="isAnimalClicked">
      <div class="animal-list"  v-for="animal in animals" :key="animal" >
        <input type="checkbox" :value="animal.name" v-model="userAnimalsFilter"> {{animal.name}}
      </div>
    </div>

    <p><strong @click="isCategoryClicked = !isCategoryClicked">Категория</strong></p>
    <div class="category" v-if="isCategoryClicked">
      <div class="category-list" v-for="category in categories" :key="category" >
        <input type="checkbox" :value="category.name" v-model="userCategoriesFilter"> {{ category.name }}
      </div>
    </div>

    <p><strong @click="isCategoryClicked = !isCategoryClicked">Акционный товар?</strong><input type="checkbox"  v-model="isDeal"></p>


    <p><strong @click="isPriceClicked = !isPriceClicked">Цена</strong></p>
    <div class="price" v-if="isPriceClicked">
      <div class="price-block" >
        <input type="text" placeholder="от руб." v-model="startPrice"> - <input type="text" placeholder="до руб." v-model="endPrice">
      </div>
    </div>

    <button class="btn-success" @click="getCatalogByUserFilter">Применить фильтр</button>

  </div>
</template>

<script>
import CatalogService from '../services/catalog.service'
import AnimalService from '@/services/animal.service'
import CategoryService from '@/services/category.service'

export default {
  data() {
    return {
      isDeal: false,
      animals: {},
      userAnimalsFilter: [],
      categories: {},
      userCategoriesFilter: [],
      isAnimalClicked: false,
      isCategoryClicked: false,
      isPriceClicked: false,
      startPrice: 0,
      endPrice: 999999,
    }
  },
  methods: {
    getAnimals() {
      AnimalService.getAnimalsList().then(
          response => {
            this.animals = response.data;
            console.log(this.animals)
          }
      )
    },
      getCategories() {
        CategoryService.getCategoriesList().then(
            response => {
              this.categories = response.data;
              console.log(this.categories)
            }
        )
    },
    getCatalogByUserFilter() {
      console.log(this.userAnimalsFilter)
      CatalogService.getCatalogByUserFilter(this.userAnimalsFilter)
    }
  },
  created() {
    this.getAnimals();
    this.getCategories();
  }
}
</script>

<style>
.custom-left-menu {
  background-color: #92cbf8;
}
</style>