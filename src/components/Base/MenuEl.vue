<template>
  <div class="menu__menu-el">
    <a href="">
      <img :src="ico" :alt="label">
      <p>{{ label }}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: "MenuEl",
  props: [
      'label',
      'ico'
  ]
}
</script>

<style scoped>
a{
  display: flex;
}
p{
  font-weight: bold;
  color: #000;
  padding-top: 5px;
  padding-left: 10px;
  margin: 0;
}
a:hover p {
  color: #FCDC4C;
  transition: 0.3s;
}
img{
  height: 25px;
}

</style>
