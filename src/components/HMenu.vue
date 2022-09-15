<template>
  <nav class="header-burger">
    <div class="hamburger-wrap">
      <div class="hamburger" type="button" @click="isOpen = !isOpen">
        <img src="../assets/list.png" alt="">
      </div>
    </div>
    <div v-if="isOpen" class="dropdown">
      <div class="cancel" @click="isOpen = !isOpen">
        <img src="../assets/cross.png" alt="">
      </div>
      <div class="body">
        <MenuEl
            v-for="(item, index) in menu"
            :key="index"
            :label="item.label"
            :ico="item.ico"
            :link="item.link"
        />
        <a class="menu__drop">
          <img src="../assets/user.png" alt="">
          <DropDown :type="'drop'" :list="dropList" :title="'Личный кабинет'"/>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import MenuEl from "./Base/MenuEl";
import DropDown from "./Base/DropDown";

export default {
  name: "HMenu",
  components:{
    MenuEl,
    DropDown
  },
  data(){
    return{
      isOpen: false,
      menu: [
        {
          ico: require('../assets/home.png'),
          label: 'Главная',
          link: '/'
        },
        {
          ico: require('../assets/list.png'),
          label: 'Каталог',
          link: '/catalog'
        },
        {
          ico: require('../assets/shopping-cart.png'),
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
  watch: {
    isOpen: function() {
      if(this.isOpen){
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
    }
  }
}
</script>

<style lang="scss">
.hamburger{
  img{
    height: 30px;
  }
}
.dropdown{
  background-color: #F3F3F3;
  z-index: 100;
  overflow: auto;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.3s;
  .cancel{
    padding: 10px 0px 0px 10px;
    img{
      height: 30px;
    }
  }
  .body{
    margin-top: 30px;
    background-color: #F3F3F3;
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 30px;
  }
  .menu__drop{
    padding-top: 5px;
    display: flex;
    position: relative;
    transition: 0.3s;
    img{
      height: 25px;
      padding-right: 10px;
    }
    &:hover{
      color: #FCDC4C;
      transition: 0.3s;
    }
  }
}

</style>
