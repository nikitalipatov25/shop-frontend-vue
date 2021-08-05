<template>
  <div class="custom-left-menu">

    <strong @click="isAnimalClicked = !isAnimalClicked">Питомец</strong>
    <div class="animal" v-if="isAnimalClicked">
      <div class="animal-list" v-for="animalValue in animalsValues" :key="animalValue" >
        {{animalValue}}
      </div>
    </div>

    <strong @click="isCategoryClicked = !isCategoryClicked">Категория</strong>
    <div class="category" v-if="isCategoryClicked">
      <div class="category-list" v-for="categoryValue in categoriesValues" :key="categoryValue">
        {{categoryValue}}
      </div>
    </div>

    <p>Категория:</p>
    <div class="c-list" v-for="item in dynamicArray" :key="item">
      <input type="checkbox" v-bind:value="item" v-model="checkboxesArray"> <label>{{ item }}</label>
    </div>
    <p>Цена:</p>
    <input type="text" placeholder="от руб." v-model="startPrice"> - <input type="text" placeholder="до руб." v-model="endPrice">
    <button @click="getCategory">Применить</button>

  </div>
</template>

<script>
import {eventBus} from "@/main";
import CatalogService from '../services/catalog.service'

export default {
  data() {
    return {
      animalsKeys: {},
      animalsValues: {},
      categoriesKeys: {},
      categoriesValues: {},
      isAnimalClicked: false,
      isCategoryClicked: false,

      category: {},
      startPrice: 0,
      endPrice: 999999,
      checkboxesArray: [],
      dynamicArrayParameter: '',
      dynamicArray: [],
      dogs: ['Ошейники', 'Поводки', 'Шлейки', 'Одежда', 'Игрушки', 'Миски'],
      cats: ['Домики', 'Лежанки', 'Когтеточки','Игрушки', 'Миски'],
      fish: ['Гроты, аксессуары', 'Уборка аквариума'],
      hamsters: ['Клетки', 'Поилки', 'Прогулочные сферы'],
    }
  },
  methods: {
    getAnimals() {
      CatalogService.getAnimalsList().then(
          response => {
            let animals = response.data;
            this.animalsKeys = Object.keys(animals);
            this.animalsValues = Object.values(animals)
          }
      )
    },
    getCategories() {
      CatalogService.getCategoriesList().then(
          response => {
            let categories = response.data;
            this.categoriesKeys = Object.keys(categories);
            this.categoriesValues = Object.values(categories)
          }
      )
    },
    async getCategory() {
      let arr = [this.dynamicArrayParameter, this.checkboxesArray, this.startPrice, this.endPrice];
      eventBus.$emit('getCategory', arr)
    },
    changeCheckBoxes(dynamicArrayParameter) {
      switch (dynamicArrayParameter) {
        case 'Товары для собак': this.dynamicArray = this.dogs;
          break;
        case 'Товары для кошек': this.dynamicArray = this.cats;
          break;
        case 'Товары для рыбок': this.dynamicArray = this.fish;
          break;
        case 'Товары для грызунов': this.dynamicArray = this.hamsters;
          break;
        default: this.dynamicArrayParameter = 'empty'
      }
      eventBus.$emit('changeCheckBoxes', this.dynamicArrayParameter)
    }
  },
  created() {
    this.getAnimals()
    this.getCategories()
    this.dynamicArrayParameter = this.$route.params.catalogParameter;
    this.changeCheckBoxes(this.dynamicArrayParameter);
  }
}
</script>

<style>
.custom-left-menu {
  background-color: #92cbf8;
}
</style>