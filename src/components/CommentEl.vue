<template>
  <div class="comment">
    <div class="comment__modal">
      <Modal :title="'Редактирование'" @closeModal="closeCommentAddModal" v-if="isCommentAddModalVisible">
        <template v-slot:content>
          <div class="wrapper">
            <div class="text">
              <p class="">Текст:</p>
              <textarea v-model="modalData.text" v-text="fullText" resize="none" class=""></textarea>
            </div>
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
    </div>
<!--    -->
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
      <div v-if="$store.state.auth.user.username === comment.userName">

        <button type="button" class="btn btn-danger" @click="$bvModal.show('delete-comment-modal')">Удалить comment</button>

      </div>
    </div>


<!--    -->
<!--          <b-modal id="add-answer-modal" hide-footer title="Answer to comment">-->
<!--            <div class="d-block text-left">-->
<!--              <div class="modify-body">-->
<!--                    <label class="col-form-label">Answer to {{comment.userName}}</label>-->
<!--                    <textarea v-model="answer.text" resize="none"></textarea>-->
<!--                  </div>-->
<!--                <button class="btn btn-success" @click="addAnswer">Ответить</button>-->
<!--                <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-answer-modal')">Закрыть</button>-->
<!--              </div>-->
<!--          </b-modal>-->
<!---->
<!--          <b-modal id="modify-comment-modal" hide-footer title="Модифицировать comment">-->
<!--            <div class="d-block text-left">-->
<!--              <div class="modify-body">-->
<!--                <form>-->
<!--                  <div class="mb-3">-->
<!--                    <CommentDropDown v-model="modalData.rating" />-->
<!--                  </div>-->
<!--                  <div class="mb-3">-->
<!--                    <label class="col-form-label">Message:</label>-->
<!--                    <textarea v-model="modalData.text" v-text="fullText" resize="none" class="form-control"></textarea>-->
<!--                  </div>-->
<!--                </form>-->
<!--                <button class="btn btn-success" @click="modifyComment">Модифицировать comment</button>-->
<!--                <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-comment-modal')">Закрыть</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </b-modal>-->
<!--          -->
<!--          <b-modal id="delete-comment-modal" hide-footer title="Удалить comment">-->
<!--            <div class="d-block text-left">-->
<!--              <strong>Вы действительно хотите удалить комментарий?</strong>-->
<!--              <button class="btn btn-success" @click="deleteComment">Удалить comment</button>-->
<!--              <button type="button" class="btn btn-danger" @click="$bvModal.hide('delete-comment-modal')">Закрыть</button>-->
<!--            </div>-->
<!--          </b-modal>-->
<!--          -->
<!--        <b-modal id="modify-answer-modal" hide-footer title="modify">-->
<!--          <div class="d-block text-left">-->
<!--            <input type="text" v-model:="answer.text">-->
<!--            <button class="btn btn-success" @click="modifyAnswer(answer.id)">Modify</button>-->
<!--            <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-answer-modal')">Закрыть</button>-->
<!--          </div>-->
<!--        </b-modal>-->

<!---------------------------------------------------------------->
<!---------------------------------------------------------------->
<!---------------------------------------------------------------->
    <div class="answers" v-if="comment.answers.length !== 0">
      <h2>answers</h2>
      <div v-for="answer in comment.answers" :key="answer.id">
        {{answer}}
        <button v-if="$store.state.auth.user.username === answer.userName" type="button" class="btn btn-danger" @click="deleteAnswer(answer.id)">Удалить answer</button>
        <button v-if="$store.state.auth.user.username === answer.userName" type="button" class="btn btn-warning" @click="$bvModal.show('modify-answer-modal')">Изменить answer</button>



      </div>

    </div>
  </div>
</template>

<script>

import CommentService from '@/services/comment.service'
import AnswerService from '@/services/answer.service'
import DropDown from "./Base/DropDown";
import StarRating from "./Base/StarRating/StarRating";
import Modal from "./Base/Modal";
import Button from "./Base/Button";

export default {
  name: "CommentEl",
  components: {
    DropDown,
    StarRating,
    Modal,
    Button
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
      isCommentAddModalVisible: true,
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
          click: null
        },
        {
          label: 'Удалить',
          click: this.deleteComment
        },
      ],
      listCommentAdd: [
        {
          label: 'Ответить',
          click: null
        },
      ]
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
    showCommentAddModal(){
      this.isCommentAddModalVisible = true
    },
    closeCommentAddModal(){
      this.isCommentAddModalVisible = false
    },
    modifyComment() {
      if ((this.modalData.text !== this.fullText && this.modalData.text !== undefined) && this.modalData.rating !== undefined) {
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

<style lang="scss">
.comment__modal{
  display: grid;
  justify-items: center;
  .wrapper{
    display: grid;
  }
  .text{
    display: grid;
    justify-items: start;
    align-items: start;
    grid-template-columns: 60px auto;
    textarea{
      outline: none;
      -moz-appearance: none;
      resize: none;
      border: 1px solid #ccc;
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
    }
  }
}
</style>
