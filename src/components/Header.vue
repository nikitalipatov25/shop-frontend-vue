<template>
  <div class="header">
    <div class="row">
      <div class="col-3">
        <a href="/"><strong>Hand-made магазин "Любимый питомец"</strong></a>
      </div>
      <div class="col-2">
        <a href="/catalog">Каталог</a>
      </div>
      <div class="col-2">
        <a href="/cart">Корзина</a>
        <span class="badge badge-success">{{ itemsInCart }}</span>
      </div>
      <div class="col-2">
        <p v-if="user === null">Добро пожаловать, гость</p>
        <div v-else class="not-guest">
          <p  >Добро пожаловать, {{ user.username }}</p>
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
  </div>
</template>

<script>
import { eventBus } from '../main'

export default {
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
.header {
  background-color: #92cbf8;
  margin-bottom: 30px;
}
</style>