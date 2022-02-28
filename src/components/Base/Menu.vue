<template>
  <nav class="header-menu">
    <MenuEl
        v-for="(item, index) in menu"
        :key="index"
        :label="item.label"
        :ico="item.ico"
    />
    <DropDown :type="'drop'" :list="dropList" :title="'Личный кабинет'"/>
  </nav>
</template>

<script>
import MenuEl from "./MenuEl";
import DropDown from "./DropDown";

function test() {
  this.$store.dispatch('auth/logout');
  this.$router.push('/login');
}

export default {
  name: "Menu",
  components: {
    MenuEl,
    DropDown
  },
  data() {
    return {
      menu: [
        {
          ico: 'https://yt3.ggpht.com/ytc/AKedOLSl9gucL6qlUL8ocyolLte6pPU2CvjTPOOScyKg=s900-c-k-c0x00ffffff-no-rj',
          label: 'Главная'
        },
        {
          ico: 'https://yt3.ggpht.com/ytc/AKedOLSl9gucL6qlUL8ocyolLte6pPU2CvjTPOOScyKg=s900-c-k-c0x00ffffff-no-rj',
          label: 'Каталог'
        },
        {
          ico: 'https://yt3.ggpht.com/ytc/AKedOLSl9gucL6qlUL8ocyolLte6pPU2CvjTPOOScyKg=s900-c-k-c0x00ffffff-no-rj',
          label: 'Корзина'
        },
      ],
      dropList: [
        {
          label: "Войти",
          link: "/login"
        },
        {
          label: "Выйти",
          click: test
        },
        {
          label: "Регистрация",
          link: "/register"
        },
      ],
    }
  },
  methods:{
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
}
</script>

<style scoped>

</style>
