<template>
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
    }
  }
}
</script>

<style lang="scss">

.modal{
  max-height: 550px;
  overflow-y: auto;
  z-index: 9;
  position: fixed;
  top: 50px;
  max-width: 70vw;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  display: grid;
  row-gap: 20px;
  &__header{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .cross{
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
      img{
        height: 20px;
      }
    }
  }
  &__content{

  }
  &__footer{
    display: grid;
    justify-items: center;
  }
}
</style>
