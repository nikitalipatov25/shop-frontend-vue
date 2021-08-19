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
            <div class="date-update">
              <p>
                {{ comment.dateUpdate !== null ? 'Изменён ' + comment.dateUpdate : '' }}
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
        <div v-if="$store.state.auth.user.username === comment.userName" class="modify">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal'+comment.commentId" data-bs-whatever="@mdo">Редактировать</button>
        </div>
        <div class="add-answer">
          <button @click="addAnswer" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-whatever="@mdo">Ответить</button>
        </div>
      </div>
    </div>
    <div class="answers">
      <h5>Ответы</h5>
      <hr>
<!--      <AnswerList/>-->
    </div>
    <CommentModal :fullText="comment.text" :rating="comment.rating" :id="comment.commentId"/>
  </div>
</template>

<script>

import CommentModal from "@/components/CommentModal";
import CommentService from '@/services/comment.service'

export default {
  name: "CommentEl",
  components: {
    CommentModal
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
      answers: null
    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
    this.getAnswer()
  },
  methods: {
    getAnswer(){
      CommentService.getAnswers(this.comment.commentId)
    },
    addAnswer(){
      CommentService.generateAnswer(this.comment.commentId, this.payload)
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