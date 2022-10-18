<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__header">
        <h2 class="title">{{ title }}</h2>
        <span class="cross" @click="closeModal">
        <img src="../../assets/cross.png" alt="">
      </span>
      </div>
      <div class="modal__content">
        <slot name="content">

        </slot>
      </div>
      <div class="modal__footer">
        <slot name="footer">

        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  components:{
  },
  props:{
    title: String
  },
  data(){
    return{

    }
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
      document.documentElement.style.overflow = 'auto'
    },
    q(){
      document.documentElement.style.overflow = 'hidden'
    }
  },
  created() {
    this.q()
  },
}
</script>

<style lang="scss">
.overlay{
  user-select: none;
  position: fixed;
  display: grid;
  justify-content: center;
  align-content: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 100;
  &:target {
    /* анимация и время задержки */
    -webkit-animation: fade .6s;
    -moz-animation: fade .6s;
    animation: fade .6s;
  }
}
.modal{
  max-height: 550px;
  overflow-y: auto;
  width: 70vw;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  row-gap: 20px;
  &__header{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    .cross{
      cursor: pointer;
      position: absolute;
      right: 4px;
      img{
        height: 20px;
      }
    }
  }
  &__content{

  }
  &__footer{
    margin-top: 30px;
    display: grid;
    justify-items: center;
  }
}
</style>
