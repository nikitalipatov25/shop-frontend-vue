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
          <p>
            {{ comment.date }}
          </p>
        </div>
        <div class="head__el rating">
          <p>
            {{ comment.rating }} из 10
          </p>
        </div>
      </div>
      <div class="comment__body">
        <div class="text">
          <p>
            {{isButtonVisible ? shortText : fullText }}
          </p>
        </div>
        <div class="text-extension">
          <span @click="isButtonVisible = !isButtonVisible">
            {{ isButtonVisible === true ? 'Показать' : 'Скрыть' }}
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentEl",
  props: [
    "comment"
  ],
  data() {
    return {
      isAppear: false,
      isButtonVisible: false,
      fullText: this.comment.text,
      shortText: ''
    }
  },
  created() {
    this.visibleButton()
    this.sliceText()
  },
  methods: {
    visibleButton(){
      if(this.comment.text.length > 10){
        return this.isButtonVisible = true
      }
    },
    sliceText(){
      this.shortText = this.fullText.slice(0, 10)
    },
  }
}
</script>

<style scoped>
  .comment{
    margin-top: 30px;
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .comment__head{
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
    margin-right: 5px;
    width: 150px;
  }
  .date{

  }
  .rating{
    margin-left: auto;
  }

</style>