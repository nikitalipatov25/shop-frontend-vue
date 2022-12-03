<template>
  <div class="star-rating__item">
    <img v-if="type === 'none'" class="star" src="../../../assets/star-none.png" alt="">
    <img v-else class="star" src="../../../assets/star.png" alt="">
  </div>
</template>

<script>

export default {
  name: "StarRatingItem",
  props:{
    type: String
  }
}
</script>

<style scoped>

</style>
