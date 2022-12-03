<template>
  <a :href="link">
    <button @click="click" class="button" :class="[size, color]">
      <p>{{ label }}</p>
    </button>
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
  label: String,
    size: String,
    color: String,
    link: String,
    click: Function
  },
  data(){
    return{

    }
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">

//main
  .button{
    border: none;
    border-radius: 25px;
    cursor: pointer;
    padding: 10px;
    &:hover{
      transition: all 0.3s ease-in-out;
    }
    &:active {
      transform: scale(0.9);
      transition: all 0.01s ease-in-out;
    }
    a{
      display: flex;
      height: 100%;
    }
    p{
      font-size: 16px;
    }
  }

//colors
  .color {
    background: #5D34FF;
    font-size: 18px;
    color: #fff;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #000000;
      -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
  }

  .translucent{
    //?
  }

//sizes
  .medium{
    min-width: 200px;
    height: 50px;
  }

  .small{
    min-width: 145px;
    height: 45px;
  }

</style>
