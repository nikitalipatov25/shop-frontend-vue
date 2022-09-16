<template>
  <div class="comment">
    <div class="comment__modal">
      <transition name="fade">
        <Modal :title="'Редактирование'" @closeModal="closeCommentAddModal" v-if="isCommentAddModalVisible">
          <template v-slot:content>
            <div class="wrapper">
              <label class="text">
                <textarea v-model="modalData.text" v-text="fullText" resize="none" class=""></textarea>
              </label>
              <div class="rating">
                <DropDown
                    :type="'filter'"
                    :list="listRating"
                    :title="'Оценка'"
                />
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <div class="">
              <Button
                  :label="'Отправить'"
                  :size="'small'"
                  :color="'color'"
                  :click="modifyComment"
              />
            </div>
          </template>
        </Modal>
        <Modal :title="'Удаление'" @closeModal="closeCommentDelModal" v-if="isCommentDelModalVisible">
          <template v-slot:content>
            <p>Вы действительно хотите удалить комментарий?</p>
          </template>
          <template v-slot:footer>
            <div class="">
              <Button
                  :label="'Удалить'"
                  :size="'small'"
                  :color="'color'"
                  :click="deleteComment"
              />
            </div>
          </template>
        </Modal>
        <Modal :title="'Ответ'" @closeModal="closeAnswerAddModal" v-if="isAnswerAddModalVisible">
          <template v-slot:content>
            <div class="wrapper">
              <h3>{{ comment.userName + ':' }}</h3>
              <p v-text="fullText">{{ modalData.text }}</p>
              <h3>Ваш ответ:</h3>
              <label class="text">
                <textarea v-model="answer.text"></textarea>
              </label>
            </div>
          </template>
          <template v-slot:footer>
            <div class="">
              <Button
                  :label="'Отправить'"
                  :size="'small'"
                  :color="'color'"
                  :click="addAnswer"
              />
            </div>
          </template>
        </Modal>
      </transition>
    </div>

    <div class="comment__body">
      <div class="comment__head">
        <div class="head__el comment__info">
          <h3>
            {{ comment.userName }}
          </h3>
          <p>
            {{ comment.date }}
          </p>
        </div>
        <div class="head__el comment__rating">
          <StarRating
              :rating="comment.rating<=5 ? comment.rating : 5"
          />
        </div>
        <div class="head__el comment__drop">
          <DropDown
              v-if="$store.state.auth.user.username === comment.userName"
              :type="'drop'"
              :list="listCommentAddAuth"
              :title="'. . .'"
          />
          <DropDown
              v-else
              :type="'drop'"
              :list="listCommentAdd"
              :title="'. . .'"
          />
        </div>
      </div>
      <div class="comment__text">
        <p>
          {{isButtonVisible === true && fullText.length >= 150 ? shortText + '...' : fullText   }}
          <span v-if="fullText.length >= 150" @click="isButtonVisible = !isButtonVisible">
          {{ isButtonVisible ? 'Показать' : 'Скрыть' }}
        </span>
        </p>
      </div>
    </div>

    <div class="comment__answer" v-if="comment.answers.length !== 0">
      <div class="answer__el" v-for="answer in comment.answers" :key="answer.id">
        <Answer  :answer="answer"/>
      </div>
    </div>


<!--    -->

<!---->
<!--          -->
<!--        <b-modal id="modify-answer-modal" hide-footer title="modify">-->
<!--          <div class="d-block text-left">-->
<!--            <input type="text" v-model:="answer.text">-->
<!--            <button class="btn btn-success" @click="modifyAnswer(answer.id)">Modify</button>-->
<!--            <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-answer-modal')">Закрыть</button>-->
<!--          </div>-->
<!--        </b-modal>-->
<!---->
<!--    <div class="answers" v-if="comment.answers.length !== 0">-->
<!--      <div v-for="answer in comment.answers" :key="answer.id">-->
<!--        {{answer}}-->
<!--        <button v-if="$store.state.auth.user.username === answer.userName" type="button" class="btn btn-danger" @click="deleteAnswer(answer.id)">Удалить answer</button>-->
<!--        <button v-if="$store.state.auth.user.username === answer.userName" type="button" class="btn btn-warning" @click="$bvModal.show('modify-answer-modal')">Изменить answer</button>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>

import CommentService from '@/services/comment.service'
import AnswerService from '@/services/answer.service'
import DropDown from "../DropDown";
import StarRating from "../StarRating/StarRating";
import Modal from "../Modal";
import Button from "../Button";
import Answer from "./Answer";

export default {
  name: "CommentEl",
  components: {
    DropDown,
    StarRating,
    Modal,
    Button,
    Answer
  },
  props: {
    comment: Object
  },
  data() {
    return {
      listRating: [
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
      ],
      isCommentAddModalVisible: false,
      isCommentDelModalVisible: false,
      isAnswerAddModalVisible: false,
      isAnswerDelModalVisible: false,
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
      },
      listCommentAddAuth: [
        {
          label: 'Редактировать',
          click: this.showCommentAddModal,
        },
        {
          label: 'Ответить',
          click: this.showAnswerAddModal
        },
        {
          label: 'Удалить',
          click: this.showCommentDelModal
        },
      ],
      listCommentAdd: [
        {
          label: 'Ответить',
          click: this.showAnswerAddModal
        },
      ],

    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
  },
  methods: {
    setOne(){
      this.modalData.rating = 1
    },
    setTwo(){
      this.modalData.rating = 2
    },
    setThree(){
      this.modalData.rating = 3
    },
    setFour(){
      this.modalData.rating = 4
    },
    setFive(){
      this.modalData.rating = 5
    },
    closeAllModal(){
      this.isCommentAddModalVisible = false
      this.isCommentDelModalVisible = false
      this.isAnswerAddModalVisible = false
      this.isAnswerDelModalVisible = false
    },
    showCommentAddModal(){
      this.closeAllModal()
      this.isCommentAddModalVisible = true
    },
    closeCommentAddModal(){
      this.isCommentAddModalVisible = false
    },
    showCommentDelModal(){
      this.closeAllModal()
      this.isCommentDelModalVisible = true
    },
    closeCommentDelModal(){
      this.isCommentDelModalVisible = false
    },
    showAnswerAddModal(){
      this.closeAllModal()
      this.isAnswerAddModalVisible = true
    },
    closeAnswerAddModal(){
      this.isAnswerAddModalVisible = false
    },
    modifyComment() {
      if ((this.modalData.text !== this.fullText && this.modalData.text !== undefined) && this.modalData.rating !== undefined) {
        CommentService.modifyNewComment(this.comment.productId, this.modalData)
        this.isCommentAddModalVisible = false
      } else {
        alert('Измените комментарий')
      }
    },
    deleteComment() {
      CommentService.deleteNewComment(this.comment.productId)
      this.isCommentDelModalVisible = false
    },
    addAnswer(){
      this.answer.answerToUser = this.comment.userName;
      this.answer.productId = this.comment.productId;
      AnswerService.addAnswer(this.answer)
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

<style lang="scss">

.comment__answer{
  border-left: 1px dashed #000000;
  margin-top: 20px;
  margin-left: 30px;
  padding: 10px 0;
  display: grid;
  row-gap: 20px;
  .answer__el{
    display: grid;
    justify-items: start;
    margin-left: 30px;
    position: relative;
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}



.comment__modal{
  display: grid;
  justify-items: center;
  .wrapper{
    display: grid;
    gap: 10px;
  }
  .text{
    display: grid;
    justify-items: start;
    align-items: start;
    textarea{
      outline: none;
      -moz-appearance: none;
      resize: none;
      border: 1px solid #ccc;
      border-radius: 15px;
      padding: 10px;
      height: 80px;
      width: 90%;
    }
  }
  .rating{
    width: 100px;
    position: relative;
  }
}

.comment{
  width: 100%;

  .comment__body{
    min-height: 100px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    padding: 20px;
    display: grid;
    gap: 10px;
    .comment__head{
      width: 100%;
      display: inline-grid;
      grid-template-columns: 7rem auto auto;
      align-items: center;
      gap: 20px;
      .head__el{
        display: inline-grid;
      }
      .comment__info{
        display: grid;
        gap: 5px;
        h3, p{
          display: inline-block;
        }
      }
      .comment__rating{

      }

      .comment__drop{
        display: inline-grid;
        justify-self: end;
        align-self: start;
      }
    }
    .comment__text{
      span{
        cursor: pointer;
        display: block;
        font-weight: bold;
      }
      p{
        font-style: italic;

      }
    }
  }
}
</style>
