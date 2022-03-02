<template>
  <nav class="header-menu">
    <MenuEl
        v-for="(item, index) in menu"
        :key="index"
        :label="item.label"
        :ico="item.ico"
        :link="item.link"
    />
    <a class="menu__drop">
      <img src="../../assets/user.png" alt="">
      <DropDown :type="'drop'" :list="dropList" :title="'Личный кабинет'"/>
    </a>
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
          label: 'Главная',
          link: '/'
        },
        {
          ico: 'https://yt3.ggpht.com/ytc/AKedOLSl9gucL6qlUL8ocyolLte6pPU2CvjTPOOScyKg=s900-c-k-c0x00ffffff-no-rj',
          label: 'Каталог',
          link: '/catalog'
        },
        {
          ico: 'https://yt3.ggpht.com/ytc/AKedOLSl9gucL6qlUL8ocyolLte6pPU2CvjTPOOScyKg=s900-c-k-c0x00ffffff-no-rj',
          label: 'Корзина',
          link: '/cart'
        },
      ],
      dropList: [
        {
          label: "Открыть",
          link: "/personalarea"
        },
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

<style lang="scss" scoped>
.header-menu{
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  justify-items: end;
  align-items: center;
}
.menu__drop{
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 1px;
  display: flex;
  img{
    height: 25px;
    padding-right: 10px;
  }
}
</style>
