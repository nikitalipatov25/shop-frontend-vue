<template>
  <div class="dealsComponent">
    <hr>
    <div class="row">
      <div class="col-2">
      </div>
      <div class="col-3">
        <img
            :src="'http://localhost:8080/files/' + deal.image"
            style="width: 300px; height: 300px"
        >
      </div>
      <div class="col-5">
        <h2>{{deal.name}}</h2>
        <p>{{deal.description}}</p>
        <p>Время проведения акции с {{ deal.date }} по {{ deal.expirationDate }}.</p>
        <p>Скидка на: {{deal.type}} в размере {{deal.discount}}%</p>
      </div>
      <div class="col-2">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deal: {
      type: Object
    }
  }
}
</script>