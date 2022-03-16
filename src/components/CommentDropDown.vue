<template>
<div class="comment__drop-down">
  <ul >
    <li @click="$emit('change', $event.target.value = 1)">Ужасно</li>
    <li @click="$emit('change', $event.target.value = 2)">Пплохо</li>
    <li @click="$emit('change', $event.target.value = 3)">Нормально</li>
    <li @click="$emit('change', $event.target.value = 4)">Хорошо</li>
    <li @click="$emit('change', $event.target.value = 5)">Отлично</li>
  </ul>
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
