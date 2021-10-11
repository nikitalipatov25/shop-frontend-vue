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
<!--    <div class="answers">-->
<!--      <h5>Ответы</h5>-->
<!--      <hr>-->
<!--&lt;!&ndash;      <AnswerList/>&ndash;&gt;-->
<!--    </div>-->
<!--    <CommentModal :fullText="comment.text" :rating="comment.rating" :id="comment.commentId"/>-->
  </div>
</template>

<script>

// import CommentModal from "@/components/CommentModal";
import CommentService from '@/services/comment.service'
import CommentDropDown from "@/components/CommentDropDown";

export default {
  name: "CommentEl",
  components: {
    // CommentModal,
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
      }
    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
    //this.getAnswer()
  },
  methods: {
    modifyComment() {
      if (this.modalData.text !== this.fullText){
        CommentService.modifyNewComment(this.comment.productId, this.modalData)
            .then(
                response => {
                  console.log(response.data)
                }
            )
      } else {
        alert('Измените комментарий')
      }
    },
    deleteComment() {
      console.log('sdsdf')
      CommentService.deleteNewComment(this.comment.productId)
    },
    // getAnswer(){
    //   CommentService.getAnswers(this.comment.commentId)
    // },
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