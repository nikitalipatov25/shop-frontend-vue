<template>
  <div class="product_filter">
    <div class="heading">
      <h2>Расширенный поиск</h2>
    </div>
    <div class="product_filter__filter">
      <div class="filter filter__pet">
        <div @click="isAnimalClicked = !isAnimalClicked" class="heading">
          <h3>Питомец</h3>
        </div>
        <ul v-if="isAnimalClicked" class="filter__menu">
          <li v-for="animal in animals" :key="animal.name" class="menu__el">
            <span class="el__content">
              <input type="radio" v-bind:value="animal.name" v-model="selectedAnimal" @change="getAnimal"> {{animal.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="filter filter__category">
        <div @click="isCategoryClicked = !isCategoryClicked" class="heading">
          <h3>Категория</h3>
        </div>
        <ul v-if="isCategoryClicked" class="filter__menu">
          <li v-for="category in categories" :key="category.name" class="menu__el">
            <span class="el__content">
              <input type="checkbox" :value="category.name" v-model="selectedCategories"> {{ category.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="filter filter__price">
        <div @click="isPriceClicked = !isPriceClicked">
          <h3>Цена</h3>
        </div>
        <div v-if="isPriceClicked" class="filter__menu">
          <input type="number" placeholder="от руб." v-model="startPrice">
          -
          <input type="number" placeholder="до руб." v-model="endPrice">
        </div>
      </div>
    </div>
    <div class="filter__button">
      <Button
          :label="'Применить'"
          :size="'small'"
          :color="'color'"
          :click="createUserFilter"
      />
    </div>


<!--    <p><strong @click="isAnimalClicked = !isAnimalClicked">Питомец</strong></p>-->
<!--    <div class="animal" v-if="isAnimalClicked">-->
<!--      <div v-for="animal in animals" :key="animal.name">-->
<!--        <input type="radio" v-bind:value="animal.name" v-model="selectedAnimal" @change="getAnimal"> {{animal.name}}-->
<!--      </div>-->
<!--    </div>-->
<!--    <p><strong @click="isCategoryClicked = !isCategoryClicked">Категория</strong></p>-->
<!--    <div class="category" v-if="isCategoryClicked">-->
<!--      <div class="category-list" v-for="category in categories" :key="category.name" >-->
<!--        <input type="checkbox" :value="category.name" v-model="selectedCategories"> {{ category.name }}-->
<!--      </div>-->
<!--    </div>-->
<!--    <p><strong @click="isPriceClicked = !isPriceClicked">Цена</strong></p>-->
<!--    <div class="price" v-if="isPriceClicked">-->
<!--      <div class="price-block" >-->
<!--        <input type="text" placeholder="от руб." v-model="startPrice"> - <input type="text" placeholder="до руб." v-model="endPrice">-->
<!--      </div>-->
<!--    </div>-->
<!--    <button class="btn-success" @click="createUserFilter">Применить фильтр</button>-->


  </div>
</template>

<script>
import AnimalService from '@/services/animal.service'
import CategoryService from '@/services/category.service'
import Button from "./Base/Button";

import { eventBus } from '@/main'

export default {
  components:{
    Button
  },
  data() {
    return {
      selectedAnimal: null,
      selectedCategories:[],
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

<style lang="scss">
  .product_filter{
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    .product_filter__filter{
      .filter{
        cursor: pointer;
        padding: 5px 0;
        .filter__menu{
          .menu__el{
            padding: 3px 0;
            .el__content{

            }
          }
        }
      }
      .filter__price{
       .filter__menu{
         input{
           width: 50px;
         }
       }
      }
    }
    .filter__button{
      margin-top: 20px;
    }
  }
</style>
