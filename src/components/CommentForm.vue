<template>
  <div class="comment-form">
    <div class="form__text-area">
      <textarea resize="none" placeholder="Оставьте Ваш отзыв!" v-model.trim="commentData.text" />
    </div>
    <div class="row">
      <div class="form__rating">
<!--        <CommentDropDown v-model="commentData.rating"/>-->
        <DropDown
            :type="'filter'"
            :list="this.list"
            :title="'Оценка'"
        />
      </div>
      <div class="form__button">
        <Button
            :label="'Отправить'"
            :size="'medium'"
            :color="'color'"
            :click="addComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommentService from '@/services/comment.service'
// import CommentDropDown from "@/components/CommentDropDown";
import DropDown from "./Base/DropDown";
import Button from "./Base/Button";

export default {
  name: "CommentForm",
  components: {
    // CommentDropDown,
    DropDown,
    Button
  },
  data() {
    return {
      commentData: {
        text: '',
        rating: null,
        click: null
      },
      list: [
        {
          label: 'Отлично',
          click: this.someTest,
        },
        {
          label: 'Хорошо',
          click: this.someTest
        },
        {
          label: 'Нормально',
          click: this.someTest
        },
        {
          label: 'Плохо',
          click: this.someTest
        },
      ]
    }
  },
  methods: {
    someTest() {
      console.log(1)
    },
    addComment() {
      if (this.commentData.text !== '' && this.commentData.rating !== null){
        CommentService.addNewComment(this.$route.params.id, this.commentData)
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

<style lang="scss">
  .comment-form{
    margin-top: 15px;
    width: 100%;
    .row{
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      .form__button{
        display: grid;
        justify-self: end;
      }
    }
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

</style>
