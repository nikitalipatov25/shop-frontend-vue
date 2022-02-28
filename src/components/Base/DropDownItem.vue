<template>
  <li @click="func(), getActive(label)" class="drop-down__item">
    <a :href="link" >
      {{ label }}
    </a>
  </li>
</template>

<script>

export default {
  name: "DropDownItem",
  props:{
    link: String,
    label: String,
    click: Function,
    getActive: Function
  },
  data(){
    return{
      func: this.click
    }
  }
}
</script>

<style scoped lang="scss">
  .drop-down__item{
    padding: 5px 10px;
    transition: 0.3s;
    &:hover{
      transition: 0.3s;
      background-color: darken(#fff, 7%);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    &:hover:first-child{
      transition: 0.3s;
      background-color: darken(#fff, 7%);
      border-radius: 5px 5px 0 0;
      //border-top-right-radius: 5px;
      //border-top-left-radius: 5px;
    }
    &:hover:last-child{
      border-radius: 0 0 5px 5px;
    }
  }
</style>
