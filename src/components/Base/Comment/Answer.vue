<template>
  <div class="wrapper">
    <div class="answer__modal">
      <transition name="fade">
        <Modal :title="'Удаление'" @closeModal="closeAnswerDelModal" v-if="isAnswerDelModalVisible">
          <template v-slot:content>
            <p>Вы действительно хотите удалить ответ?</p>
          </template>
          <template v-slot:footer>
            <div class="">
              <Button
                  :label="'Удалить'"
                  :size="'small'"
                  :color="'color'"
                  :click="() => deleteAnswer(answer.id)"
              />
            </div>
          </template>
        </Modal>
      </transition>
    </div>
    <div class="answer">
      <div class="answer__body">
        <div class="answer__head">
          <div class="head__el answer__info">
            <h3>
              {{answer.userName}}
            </h3>
            <p>
              {{ answer.date }}
            </p>
          </div>
          <div class="head__el answer__drop">
            <DropDown
                v-if="$store.state.auth.user.username === answer.userName"
                :type="'drop'"
                :list="listAnswer"
                :title="'. . .'"
            />
          </div>
        </div>
        <div class="answer__text">
          <p>
            {{isButtonVisible === true && fullText.length >= 100 ? shortText + '...' : fullText   }}
            <span v-if="fullText.length >= 100" @click="isButtonVisible = !isButtonVisible">
              {{ isButtonVisible ? 'Показать' : 'Скрыть' }}
            </span>
          </p>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import DropDown from "../DropDown";
import Modal from "../Modal";
import Button from "../Button";

export default {
  name: "Answer",
  components:{
    DropDown,
    Modal,
    Button
  },
  props:{
    answer: Object,
  },
  data(){
    return{
      isAnswerDelModalVisible: false,
      isAppear: false,
      isButtonVisible: false,
      fullText: this.answer.text,
      shortText: '',
      listAnswer: [
        {
          label: 'Редактировать',
          click: this.modifyAnswer
        },
        {
          label: 'Удалить',
          // click: () => this.deleteAnswer(this.answer.id)
          click: this.showAnswerDelModal
        }
      ]
    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
  },
  methods: {
    visibleButton(){
      if(this.answer.text.length > 100){
        return this.isButtonVisible = true
      }
    },
    sliceText(){
      if(this.answer.text.length > 100) {
        this.shortText = this.fullText.slice(0, 100)
      }
    },
    showAnswerDelModal(){
      this.isAnswerDelModalVisible = true
    },
    closeAnswerDelModal(){
      this.isAnswerDelModalVisible = false
    },
    modifyAnswer(answerId) {
      console.log(answerId);
    },
    deleteAnswer(answerId) {
      console.log(answerId);
      this.isAnswerDelModalVisible = false
    },
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  width: 100%;
  position: relative;
  .answer__modal{
    display: grid;
    justify-items: center;
    margin-left: -10px;
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

  }
}
.answer{
  min-height: 100px;
  width: 60vw;
  max-width: 500px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  .answer__body{
    padding: 20px;
    display: grid;
    gap: 10px;
    .answer__head{
      width: 100%;
      display: inline-grid;
      grid-template-columns: 7rem auto;
      align-items: center;
      .head__el{
        display: inline-grid;
        position: relative;
      }
      .answer__info{
        display: grid;
        gap: 5px;
        h3, p{
          display: inline-block;
        }
      }
      .answer__drop{
        display: inline-grid;
        justify-self: end;
        align-self: start;
      }
    }
    .answer__text{
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
