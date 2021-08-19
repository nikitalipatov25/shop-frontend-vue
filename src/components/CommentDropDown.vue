<template>
<div class="comment__drop-down">
  <b-dropdown  variant="info" text="Оцените продукт" class="m-md-2">
    <b-dropdown-item @click="$emit('change', $event.target.value = 1)">Ужасно</b-dropdown-item>
    <b-dropdown-item @click="$emit('change', $event.target.value = 2)">Пплохо</b-dropdown-item>
    <b-dropdown-item @click="$emit('change', $event.target.value = 3)">Нормально</b-dropdown-item>
    <b-dropdown-item @click="$emit('change', $event.target.value = 4)">Хорошо</b-dropdown-item>
    <b-dropdown-item @click="$emit('change', $event.target.value = 5)">Отлично</b-dropdown-item>
  </b-dropdown>
</div>
</template>

<script>
export default {
  name: "CommentDropDown",
  props: [
      'rating'
  ],
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style scoped>

</style>