<template>
  <div class="comment-list row">
    <CommentEl />
  </div>
</template>

<script>
import CommentEl from "../components/CommentEl";

export default {
  name: "CommentList",
  components: {
    CommentEl
  }
}
</script>

<style scoped>

</style>