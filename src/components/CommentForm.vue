<template>
  <div class="comment-form">
    <div class="row">
      <div class="form__text-area col-12">
        <textarea resize="none" placeholder="Оставьте первый комментарий!" ></textarea>
      </div>
    </div>
    <div class="row">
      <div class="form__stars col-6">
        <div>stars</div>
      </div>
      <div class="form__button col-6">
        <button class="comment-button btn btn-primary">Оставить комментарий</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentForm"
}
</script>

<style scoped>
  .comment-form{
    margin-top: 15px;
    width: 100%;
  }
  textarea{
    outline: none;
    -moz-appearance: none;
    resize: none;
    border: 1px solid #ccc;
    width: 100%;
    height: 150px;
    font-size: 16px;
  }
  .comment-button{
    display: block;
    margin-top: 15px;
    margin-left: auto;
  }
</style>