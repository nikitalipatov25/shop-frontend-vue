<template>
  <div class="saleComponent">
    <hr>
    <div class="row">
      <div class="col-2">
      </div>
      <div class="col-3">
        <img
            :src="'http://localhost:8080/files/' + sale.image"
            style="width: 300px; height: 300px"
        >
      </div>
      <div class="col-5">
        <h2>{{sale.name}}</h2>
        <p>{{sale.description}}</p>
        <p>Время проведения акции с {{sale.date }} по {{ sale.expirationDate }}.</p>
        <p>Скидка в размере {{sale.discount}}%</p>
      </div>
      <div class="col-2">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sale: {
      type: Object
    }
  }
}
</script>