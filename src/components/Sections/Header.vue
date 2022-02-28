<template>
  <header>
    <div class="row">
      <div class="header__find">
        <input class="find__input" placeholder="Поиск товаров в каталоге"/>
        <div class="find__line" />
        <div class="find__btn" title="найти">
          <img src="" alt="найти">
        </div>
      </div>
      <div class="header__menu">
        <Menu/>
      </div>
      <div class="col-3">
        <span class="badge badge-success">{{ itemsInCart }}</span>
      </div>
      <div class="drop">
        <p v-if="user === null">Личный кабинет</p>
        <div v-else class="not-guest">
          <p>{{ user.username }}</p>
          <a href="/personalarea">Лычный кабинет</a>
        </div>
        <div>
          <b-dropdown id="dropdown-1" variant="info" text="Выберете действие:" class="m-md-2">
            <b-dropdown-item href="/login">Log In</b-dropdown-item>
            <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
            <b-dropdown-item href="/register">Sign In</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="col-3">
        <input type="text" placeholder="Поиск товаров в каталоге" v-model="searchText">
        <button type="button" class="btn btn-primary" @click="searchProducts">Поиск</button>
      </div>
    </div>
  </header>
</template>

<script>
import { eventBus } from '../../main'
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
  }
</style>
