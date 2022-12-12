<template>
  <header>
    <div class="header__line" v-if="test === true">
      <div class="header__find">
        <input type="text" class="find__input" placeholder="Поиск товаров" v-model="searchText"/>
        <div class="find__line" />
        <div class="find__btn" title="найти" @click="searchProducts">
          <img src="../../assets/loupe.png" alt="найти">
        </div>
      </div>
    </div>
    <div class="header__container container">
      <div class="header__logo">
        <Logo/>
      </div>
      <div class="header__menu">
        <HMenu />
      </div>
    </div>
  </header>
</template>

<script>
import HMenu from "../HMenu";
import { eventBus } from '../../main'
import Logo from "../Base/Logo";

export default {
  props: {
    test: {
      type: Boolean,
      value: false
    }
  },
  name: "Header",
  components:{
    HMenu,
    Logo
  },
  data() {
    return {
      searchText: '',
      itemsInCart: '',
      user: ''
    }
  },
  methods : {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    async searchProducts() {
      eventBus.$emit('searchProducts', this.searchText)
    },
    addCountedItemsToBadge(itemsInCart) {
      this.itemsInCart = itemsInCart;
    }
  },
  created() {
    this.user = this.$store.state.auth.user;
    eventBus.$on('addCountedItemsToBadge', this.addCountedItemsToBadge)
  }
}
</script>

<style lang="scss">
  header{
    .header__line{
      background-color: #F3F3F3;
    }
    .header__find{
      width: 95%;
      margin: 0 auto;
      height: 30px;
      display: grid;
      grid-template-columns: 200px 1px 20px;
      column-gap: 15px;
      align-items: center;
      justify-items: center;
      .find__input{
        background: none;
        height: 20px;
        width: 100%;
      }
      .find__line{
        padding-top: 5px;
        display: inline-block;
        height: 20px;
        width: 1px;
        border-right: 1px solid #000;
      }
      .find__btn{
        display: grid;
        align-items: center;
        justify-items: center;
        height: 20px;
        cursor: pointer;
        img{
          height: 15px;
        }
      }
    }
    .header__container{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      align-items: center;
      padding: 10px 0;
      .header__menu{
        display: grid;
        justify-content: end;
      }
    }
  }

</style>
