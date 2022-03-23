<template>
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
      </div>
      <div class="answer__text">
        <p>
          {{isButtonVisible === true && fullText.length >= 150 ? shortText + '...' : fullText   }}
          <span v-if="fullText.length >= 150" @click="isButtonVisible = !isButtonVisible">
            {{ isButtonVisible ? 'Показать' : 'Скрыть' }}
          </span>
        </p>
      </div>
    </div>
    {{ this.answer.text.length }}
  </div>
</template>

<script>
export default {
  name: "Answer",
  props:{
    answer: Object
  },
  data(){
    return{
      isAppear: false,
      isButtonVisible: false,
      fullText: this.answer.text,
      shortText: '',
    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
  },
  methods: {
    visibleButton(){
      if(this.answer.text.length > 150){
        return this.isButtonVisible = true
      }
    },
    sliceText(){
      if(this.answer.text.length > 150) {
        this.shortText = this.fullText.slice(0, 150)
      }
    },
  }
}
</script>

<style scoped lang="scss">
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
      .head__el{
        display: inline-grid;
      }
      .answer__info{
        display: grid;
        gap: 5px;
        h3, p{
          display: inline-block;
        }
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
