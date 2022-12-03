<template>
  <div class="login">
    <div class="card card-container">
      <div class="login__logo">
        <Logo color="light" />
      </div>
      <form class="login__form" name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Введите Ваш логин</label>
          <input
              id="username"
              v-model="user.username"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="username"
          />
          <div
              v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert"
          >Необходимо указать логин!</div>
        </div>
        <div class="form-group">
          <label for="password">Введите Ваш пароль</label>
          <input
              id="password"
              v-model="user.password"
              v-validate="'required'"
              type="password"
              autocomplete="on"
              class="form-control"
              name="password"
          />
          <div
              v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert"
          >Необходимо указать пароль!</div>
        </div>
        <div class="form-group form__button">
          <Button
              :label="'Войти'"
              :size="'small'"
              :color="'color'"
              :click="handleLogin"
          />
          <Button
              :label="'Зарегистрироваться'"
              :size="'small'"
              :color="'color'"
              :click="() => $router.push('/register')"
          />
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "../components/Base/Button";
import Logo from "../components/Base/Logo";
import User from '../models/user';

export default {
  name: 'Login',
  components:{
    Logo,
    Button
  },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/personalarea');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.$router.push('/personalarea');
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login{
  margin-top: 30px;
  width: 100%;
  display: grid;
  justify-items: center;
}

.login__logo{
  pointer-events: none;
}

.login__form{
  display: grid;
  gap: 15px;
}
label {
  display: grid;
}
input{
  outline: none;
  -moz-appearance: none;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px;
}

.card-container.card {
  max-width: 310px;
  padding: 20px;
  display: grid;
  gap: 10px;
}
.card{
  border-radius: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  position: relative;
  height: 400px;

}

.form__button{
  display: grid;
  gap: 10px;
}


</style>
