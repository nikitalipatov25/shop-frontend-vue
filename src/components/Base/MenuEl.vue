<template>
  <div class="menu__menu-el">
    <a :href="link">
      <img :src="ico">
      <p>{{ label }}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: "MenuEl",
  props: {
      label: String,
      ico: String,
      link: String,
  }
}
</script>

<style lang="scss" scoped>
a{
  display: flex;
p{
  font-weight: bold;
  color: #000;
  padding-top: 2px;
  margin: 0;
}
}
a:hover{
  p{
    color: #FCDC4C;
    transition: 0.3s;
  }
}
img{
  height: 25px;
  padding-right: 10px;
}

</style>
