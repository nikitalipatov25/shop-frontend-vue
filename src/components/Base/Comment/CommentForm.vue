<template>
  <div class="comment-form">
    <div class="form__text-area">
      <textarea resize="none" maxlength="254" placeholder="Оставьте Ваш отзыв!" v-model.trim="commentData.text" />
    </div>
    <div class="row">
      <div class="form__rating">
        <div class="rating__drop">
          <DropDown
              :type="'filter'"
              :list="this.list"
              :title="'Оценка'"
          />
        </div>
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
import DropDown from "../DropDown";
import Button from "../Button";
import {eventBus} from "@/main";

export default {
  name: "CommentForm",
  components: {
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
          click: this.setFive,
        },
        {
          label: 'Хорошо',
          click: this.setFour
        },
        {
          label: 'Нормально',
          click: this.setThree
        },
        {
          label: 'Плохо',
          click: this.setTwo
        },
        {
          label: 'Ужасно',
          click: this.setOne
        },
      ]
    }
  },
  methods: {
    setFive() {
      this.commentData.rating = 5
    },
    setFour() {
      this.commentData.rating = 4
    },
    setThree() {
      this.commentData.rating = 3
    },
    setTwo() {
      this.commentData.rating = 2
    },
    setOne() {
      this.commentData.rating = 1
    },
    async addComment() {
      if (this.commentData.text !== '' && this.commentData.rating !== null){
        await CommentService.addNewComment(this.$route.params.id, this.commentData)
        this.commentData.text = ''
        this.commentData.rating = null
        eventBus.$emit('reloadComments')
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
  .form__text-area{
    display: grid;
    justify-items: center;
    padding: 10px;
    textarea{
      outline: none;
      -moz-appearance: none;
      resize: none;
      border: 1px solid #ccc;
      border-radius: 15px;
      padding: 10px;
      width: 100%;
      height: 150px;
    }
  }
  .row{
    margin-top: 10px;
    display: grid;
    row-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    .form__rating{
      width: 100px;
      .rating__drop{
        position: relative;
      }
    }
    .form__button{
      display: grid;
      justify-self: end;
    }
    @media (max-width: 426px) {
      .form__button{
        justify-self: center;
      }
    }
  }
}




</style>
