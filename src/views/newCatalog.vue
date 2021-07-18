<template>
  <div class="test">
    {{content}}
    <button @click="getCatalog">sasi</button>
  </div>
</template>

<script>
import CatalogService from '../services/catalog.service'
export default {
  name: 'newCatalog',
  data() {
    return {
      content: {}
    }
  },
  methods: {
    getCatalog() {
      CatalogService.newGetCatalog().then(
          response => {
            this.content = response.data
          }
      )
    }
  }
}
</script>