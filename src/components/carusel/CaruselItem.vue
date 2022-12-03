<template>
  <div class="carusel-item" @click="openCatalogDeals()">
    <img :src="'http://localhost:8080/files/' + item_data.image">
    <p>{{item_data.name}}</p>
    <p>с {{item_data.date}}  по {{item_data.expirationDate}}</p>
    <p>Скидка {{item_data.discount}}%</p>
  </div>
</template>

<script>
export default {
  props: {
    item_data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    openCatalogDeals() {
      this.$router.push({ name: 'catalog-page', params: {isDeal: 'true'} });
    }
  }
}
</script>