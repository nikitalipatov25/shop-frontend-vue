<template>
  <div class="custom-left-menu">
<h1>{{ selectedAnimal }} {{ selectedCategories }}</h1>
    <p><strong @click="isAnimalClicked = !isAnimalClicked">Питомец</strong></p>
    <div class="animal" v-if="isAnimalClicked">
      <div v-for="animal in animals" :key="animal.name">
        <input type="radio" v-bind:value="animal.name" v-model="selectedAnimal" @change="getAnimal"> {{animal.name}}
      </div>
    </div>

    <p><strong @click="isCategoryClicked = !isCategoryClicked">Категория</strong></p>
    <div class="category" v-if="isCategoryClicked">
      <div class="category-list" v-for="category in categories" :key="category.name" >
        <input type="checkbox" :value="category.name" v-model="selectedCategories"> {{ category.name }}
      </div>
    </div>

    <p><strong @click="isCategoryClicked = !isCategoryClicked">Акционный товар?</strong><input type="checkbox"  v-model="isDeal"></p>

    <p><strong @click="isPriceClicked = !isPriceClicked">Цена</strong></p>
    <div class="price" v-if="isPriceClicked">
      <div class="price-block" >
        <input type="text" placeholder="от руб." v-model="startPrice"> - <input type="text" placeholder="до руб." v-model="endPrice">
      </div>
    </div>

    <button class="btn-success" @click="createUserFilter">Применить фильтр</button>

  </div>
</template>

<script>
import AnimalService from '@/services/animal.service'
import CategoryService from '@/services/category.service'

import { eventBus } from '@/main'

export default {
  data() {
    return {
      selectedAnimal: null,
      filter: '?',
      selectedCategories:[],
      isDeal: false,
      animals: {},
      categories: {},
      isAnimalClicked: false,
      isCategoryClicked: false,
      isPriceClicked: false,
      startPrice: 0,
      endPrice: 999999,
    }
  },
  methods: {
    getAnimals() {
      AnimalService.getAnimals().then(
          response => {
            this.animals = response.data;
          }
      )
    },
    getAnimal() {
      AnimalService.getAnimal(this.selectedAnimal).then(
          response => {
            this.categories = response.data.categories
            this.isCategoryClicked = true;
            this.selectedCategories = [];
          }
      )
    },
    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categories = response.data;
          }
      )
    },
    createUserFilter() {
      let payload = {
        "animal": this.selectedAnimal,
        "categories": this.selectedCategories,
        "priceFrom": this.startPrice,
        "priceTo": this.endPrice
      }
      eventBus.$emit('createUserFilter', payload);

    }
  },
  created() {
    this.getAnimals();
    this.getCategories();
  },
}
</script>

<style>
.custom-left-menu {
  background-color: #92cbf8;
}
</style>