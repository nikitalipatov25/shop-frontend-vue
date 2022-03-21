<template>
  <div class="modal">
    <div class="modal__header">
      <div class="heading">
        <h3 class="title">{{ title }}</h3>
      </div>
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
    z-index: 99;
    position: fixed;
    top: 50px;
    width: 70vw;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    &__header{
      display: grid;
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
      display: grid;
      justify-content: start;
      align-items: start;
    }
    &__footer{

    }
  }
</style>
