<template>
  <div class="footer">
    <div class="row">
      <div class="col-4">
        <ul class="list-group">
          <li class="list-group-item" @click="openCatalogCategory('empty')">Все товары</li>
          <li class="list-group-item" v-for="animal in animals" :key="animal">{{animal.name}}</li>
<!--          <li class="list-group-item" @click="openCatalogCategory('Товары для собак')">Товары для собак</li>-->
<!--          <li class="list-group-item" @click="openCatalogCategory('Товары для кошек')">Товары для кошек</li>-->
<!--          <li class="list-group-item" @click="openCatalogCategory('Товары для рыбок')">Товары для рыбок</li>-->
<!--          <li class="list-group-item" @click="openCatalogCategory('Товары для грызунов')">Товары для грызунов</li>-->
        </ul>
      </div>
      <div class="col-4">
        <ul class="list-group">
          <li class="list-group-item" @click="$router.push({name: 'questions'})">Информация покупателям(ЧаВо)</li>
          <li class="list-group-item" @click="$router.push({name: 'sale'})">Скидки и акции</li>
        </ul>
      </div>
      <div class="col-4">
        <ul class="list-group">
          <li class="list-group-item" @click="$router.push({name: 'about'})">О магазине</li>
        </ul>
        <div class="social">
          <div class="row">
            <div class="col-6">
              <img src="../assets/icons/vk.png" style="height: 64px; width: 64px">
            </div>
            <div class="col-6">
              <img src="../assets/icons/instagram.png" style="height: 64px; width: 64px">
            </div>
          </div>
        </div>
      </div>
    </div>
    &copy; Hand-made магазин "Любимый питомец"
  </div>
</template>

<script>
import {eventBus} from "@/main";
import AnimalService from "@/services/animal.service";

export default {
  data() {
    return {
      animals: {}
    }
  },
  methods: {
    getAnimals() {
      AnimalService.getAnimals().then(
          response => {
            this.animals = response.data;
          })
    },
    openCatalogCategory(catalogParameter) {
      if (this.$route.name === 'catalog-page') {
        eventBus.$emit('openCatalogCategory', catalogParameter)
      } else {
        this.$router.push({name: 'catalog-page', params: {catalogParameter: catalogParameter}});
      }
    }
  },
  created() {
    this.getAnimals()
  }
}
</script>

<style>
.footer {
  background-color: #92cbf8;
  text-align: center;
}
.social {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
}
</style>