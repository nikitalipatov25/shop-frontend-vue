<template>
  <div class="comment-list row" >
    <CommentEl v-for="(comment, index) in comments" :key="index" :comment="comment"/>
  </div>
</template>

<script>
import CommentEl from "../components/CommentEl";
//wdw
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