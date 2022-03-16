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
          ico: require('../../assets/home.png'),
          label: 'Главная',
          link: '/'
        },
        {
          ico: require('../../assets/list.png'),
          label: 'Каталог',
          link: '/catalog'
        },
        {
          ico: require('../../assets/shopping-cart.png'),
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
          click: this.logOut
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

<style lang="scss">
.header-menu{
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  justify-items: end;
  align-items: center;
  gap: 20px;
}
.menu__drop{
  padding-top: 5px;
  display: flex;
  img{
    height: 25px;
    padding-right: 10px;
  }
}
</style>
