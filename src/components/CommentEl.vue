<template>
  <div class="comment-el col-12">
    <div class="comment">
      <div class="comment__head">
          <div class="head__el user-name">
            <p>
              {{ comment.userName }}
            </p>
          </div>
          <div class="head__el date">
            <div class="date-create">
              <p>
                {{ 'Оставлен ' + comment.date }}
              </p>
            </div>
          </div>
        <div class="head__el rating">
          <p>
            {{ comment.rating }} из 5
          </p>
        </div>
      </div>
      <div class="comment__body">
        <div class="text">
          <p>
            {{isButtonVisible === true && fullText.length >= 150 ? shortText + '...' : fullText   }}
          </p>
        </div>
        <div class="text-extension">
          <span v-if="fullText.length >= 150" @click="isButtonVisible = !isButtonVisible">
            {{ isButtonVisible ? 'Показать' : 'Скрыть' }}
          </span>
        </div>
      </div>
      <div class="comment__footer">

        <div v-if="$store.state.auth.user.username !== comment.userName">

            <button type="button" class="btn btn-primary" @click="$bvModal.show('add-answer-modal')">Ответить</button>

          <b-modal id="add-answer-modal" hide-footer title="Answer to comment">
            <div class="d-block text-left">
              <div class="modify-body">
                    <label class="col-form-label">Answer to {{comment.userName}}</label>
                    <textarea v-model="answer.text" resize="none"></textarea>
                  </div>
                <button class="btn btn-success" @click="addAnswer">Ответить</button>
                <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-answer-modal')">Закрыть</button>
              </div>
          </b-modal>

        </div>

        <div v-if="$store.state.auth.user.username === comment.userName">
          <button type="button" class="btn btn-primary" @click="$bvModal.show('modify-comment-modal')">Редактировать</button>

          <b-modal id="modify-comment-modal" hide-footer title="Модифицировать comment">
            <div class="d-block text-left">
              <div class="modify-body">
                <form>
                  <div class="mb-3">
                    <CommentDropDown v-model="modalData.rating" />
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label">Message:</label>
                    <textarea v-model="modalData.text" v-text="fullText" resize="none" class="form-control"></textarea>
                  </div>
                </form>
                <button class="btn btn-success" @click="modifyComment">Модифицировать comment</button>
                <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-comment-modal')">Закрыть</button>
              </div>
            </div>
          </b-modal>

          <button type="button" class="btn btn-danger" @click="$bvModal.show('delete-comment-modal')">Удалить comment</button>

          <b-modal id="delete-comment-modal" hide-footer title="Удалить comment">
            <div class="d-block text-left">
              <strong>Вы действительно хотите удалить комментарий?</strong>
              <button class="btn btn-success" @click="deleteComment">Удалить comment</button>
              <button type="button" class="btn btn-danger" @click="$bvModal.hide('delete-comment-modal')">Закрыть</button>
            </div>
          </b-modal>

        </div>

      </div>
    </div>

    <div class="answers" v-if="comment.answers.length !== 0">
      <h2>answers</h2>
      <div v-for="answer in comment.answers" :key="answer.id">
        {{answer}}
        <button v-if="$store.state.auth.user.username === answer.userName" type="button" class="btn btn-danger" @click="deleteAnswer(answer.id)">Удалить answer</button>
        <button v-if="$store.state.auth.user.username === answer.userName" type="button" class="btn btn-warning" @click="$bvModal.show('modify-answer-modal')">Изменить answer</button>

        <b-modal id="modify-answer-modal" hide-footer title="modify">
          <div class="d-block text-left">
            <input type="text" v-model:="answer.text">
            <button class="btn btn-success" @click="modifyAnswer(answer.id)">Modify</button>
            <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-answer-modal')">Закрыть</button>
          </div>
        </b-modal>

      </div>

    </div>
  </div>
</template>

<script>

import CommentService from '@/services/comment.service'
import CommentDropDown from "@/components/CommentDropDown";
import AnswerService from '@/services/answer.service'

export default {
  name: "CommentEl",
  components: {
    CommentDropDown
  },
  props: [
    "comment"
  ],
  data() {
    return {
      isAppear: false,
      isButtonVisible: false,
      fullText: this.comment.text,
      shortText: '',
      payload: {
        text: 'answer'
      },
      answers: null,
      modalData: {
        text: this.fullText,
        rating: this.rating
      },
      answer: {
        productId: '',
        answerToUser: '',
        text: ''
      }
    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
  },
  methods: {
    modifyComment() {
      if (this.modalData.text !== this.fullText) {
        CommentService.modifyNewComment(this.comment.productId, this.modalData)
      } else {
        alert('Измените комментарий')
      }
    },
    deleteComment() {
      CommentService.deleteNewComment(this.comment.productId)
    },
    addAnswer(){
      this.answer.answerToUser = this.comment.userName;
      this.answer.productId = this.comment.productId;
      AnswerService.addAnswer(this.answer)
    },
    modifyAnswer(answerId) {
      console.log(answerId);
    },
    deleteAnswer(answerId) {
      console.log(answerId);
    },
    visibleButton(){
      if(this.comment.text.length > 150){
        return this.isButtonVisible = true
      }
    },
    sliceText(){
      if(this.comment.text.length > 150) {
        this.shortText = this.fullText.slice(0, 150)
      }
    },
  }
}
</script>

<style scoped>
  .comment{
    margin-top: 30px;
    width: 100%;
    min-height: 100px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .comment__head{
    display: flex;
  }
  .comment__body{
  }
  .comment__footer{
    display: flex;
  }
  .comment span{
    cursor: pointer;
  }
  .comment p, span{
    margin: 0;
    padding: 5px 10px;
  }
  .user-name{
    font-weight: bold;
    font-size: 18px;
    margin-right: 5px;
    width: 150px;
  }
  .date{
    font-size: 12px;
    margin-left: auto;
    margin-right: 1rem;
  }
  .date p{
    padding: 0;
  }
  .rating{
    font-size: 18px;
  }
  .rating p{
    text-align: right;
    font-weight: bold;
  }
  .text-extension{
    margin-bottom: 10px;
  }
  .text-extension span{
    font-style: italic;
  }
</style>