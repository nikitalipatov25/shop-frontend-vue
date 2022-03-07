<template>
  <a href="/" class="logo" :class="[color === 'dark' ? darkTheme : '']">
    <img src="../../assets/logo.png" alt="">
    <div class="logo__title" >
      <h2 class="title__regular">{{ titleRegular }}</h2>
      <h2 class="title__bold">{{ titleBold }}</h2>
    </div>
  </a>
</template>

<script>

export default {
  name: "Logo",
  props: [
    'color'
  ],
  data(){
    return{
      titleRegular: 'Магазин для животных',
      titleBold: 'Любимый питомец',
      darkTheme: 'logo-dark'
    }
  }
}
</script>

<style scoped lang="scss">
.logo{
  display: inline-grid;
  grid-template-columns: 82px auto;
  align-items: center;
  img{
    height: 82px;
  }
  .logo__title{
    display: inline-grid;
    margin-left: 10px;
    .title__regular{
      font-weight: normal;
      }
  }
}

.logo-dark{
  .logo__title{
    color: #fff;
  }
}



</style>
