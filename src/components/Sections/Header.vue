<template>
  <header>
    <div class="header__find">
      <input type="text" class="find__input" placeholder="Поиск товаров в каталоге" v-model="searchText"/>
      <div class="find__line" />
      <div class="find__btn" title="найти" @click="searchProducts">
        <img src="https://yt3.ggpht.com/ytc/AKedOLSl9gucL6qlUL8ocyolLte6pPU2CvjTPOOScyKg=s900-c-k-c0x00ffffff-no-rj" alt="найти">
      </div>
    </div>
    <div class="header__menu">
      <Menu/>
    </div>
    <div>
      <span class="badge badge-success">{{ itemsInCart }}</span>
    </div>
  </header>
</template>

<script>
import { eventBus } from '../../main'
import '../../assets/Style.scss'
import Menu from "../Base/Menu";

export default {
  name: "Header",
  components:{
    Menu
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
    console.log(this.user.username);
    eventBus.$on('addCountedItemsToBadge', this.addCountedItemsToBadge)
  }
}
</script>

<style>
  header{
    border: 1px solid red;
    display: grid;
    grid-template-columns: repeat(3,1fr);
  }
  img{
    height: 25px;
  }
</style>
