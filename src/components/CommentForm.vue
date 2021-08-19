<template>
  <div class="comment-form">
    <div class="row">
      <div class="form__text-area col-12">
        <textarea resize="none" placeholder="Оставьте комментарий!" v-model.trim="commentData.text" />
      </div>
    </div>
    <div class="row">
      <div class="form__rating col-6">
        <CommentDropDown v-model="commentData.rating"/>
      </div>
      <div class="form__button col-6">
        <button @click="addComment" class="comment-button btn btn-primary">Оставить комментарий</button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentService from '@/services/comment.service'
import CommentDropDown from "@/components/CommentDropDown";

export default {
  name: "CommentForm",
  components: {
    CommentDropDown
  },
  data() {
    return {
      commentData: {
        text: '',
        rating: null
      },
    }
  },
  methods: {
    addComment() {
      if (this.commentData.text !== '' && this.commentData.rating !== null){
        CommentService.generateComment(this.$route.params.id, this.commentData)
            .then(
                response => {
                  console.log(response.data)
                }
            )
        this.commentData.text = ''
        this.commentData.rating = null
      } else {
        alert('Оставьте комментарий и оцените продукт')
      }
    }
  }
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