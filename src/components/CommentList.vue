<template>
  <div class="comment-list" >
    <CommentEl v-for="(comment, index) in comments" :key="index" :comment="comment"/>
  </div>
</template>

<script>
import CommentEl from "../components/CommentEl";

export default {
  name: "CommentList",
  components: {
    CommentEl
  },
  props: [
    'comments'
  ]
}
</script>

<style scoped>

</style>
