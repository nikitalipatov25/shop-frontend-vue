<template>
  <div class="register">
    <div class="card card-container">
      <div class="reg__logo">
        <Logo color="light" />
      </div>
      <div class="reg__form">
        <div class="reg__form" v-if="!successful">
          <div class="form-group">
            <label for="username">Придумайте логин</label>
            <input
                id="username"
                v-model="user.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"
            />
            <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Приумайте пароль</label>
            <input
                id="password"
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
            />
            <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Укажите Ваш эл. адрес</label>
            <input
                id="email"
                v-model="user.email"
                v-validate="'required|email|max:50'"
                type="email"
                class="form-control"
                name="email"
            />
            <div
                v-if="submitted && errors.has('email')"
                class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="surname">Укажите Вашу фамилию</label>
            <input
                id="surname"
                v-model="user.surname"
                v-validate="'required|min:2|max:30'"
                type="text"
                class="form-control"
                name="surname"
            />
            <div
                v-if="submitted && errors.has('surname')"
                class="alert-danger"
            >{{errors.first('surname')}}</div>
          </div>
          <div class="form-group">
            <label for="name">Укажите Ваше имя</label>
            <input
                id="name"
                v-model="user.name"
                v-validate="'required|min:2|max:16'"
                type="text"
                class="form-control"
                name="name"
            />
            <div
                v-if="submitted && errors.has('name')"
                class="alert-danger"
            >{{errors.first('name')}}</div>
          </div>
          <div class="form-group form__button">
            <Button
                :label="'Зарегистрироваться'"
                :size="'small'"
                :color="'color'"
                :click="handleRegister"
            />
          </div>
        </div>
      </div>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{message}}
        <div class="form-group form__button">
          <Button
              :label="'Войти'"
              :size="'small'"
              :color="'color'"
              :click="signIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Base/Button";
import Logo from "../components/Base/Logo";
import User from '../models/user';

export default {
  name: 'Register',
  components:{
    Logo,
    Button
  },
  data() {
    return {
      user: new User('', '', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/personalarea');
    }
  },
  methods: {
    signIn() {
      this.$router.push('/login')
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
              },
              error => {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          );
        }
      });
   }
  }
};
</script>

<style scoped>

.register{
  margin-top: 30px;
  width: 100%;
  display: grid;
  justify-items: center;
}

.reg__logo{
  pointer-events: none;
}

.reg__form{
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
  max-width: 350px !important;
  padding: 40px 40px;
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
}

.form__button{
  display: grid;
  gap: 10px;
}


</style>
