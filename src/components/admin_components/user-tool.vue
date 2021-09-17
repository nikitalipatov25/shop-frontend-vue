<template>
  <div class="deals-tool">
    <h2>Работа с пользователями</h2>

    <button class="btn btn-success" @click="$bvModal.show('promote-user-modal')">Добавить администратора</button>

    <b-modal id="promote-user-modal" hide-footer title="Добавить администратора">
      <div class="d-block text-left">
        <p>Введите идентификатор пользователя: <input type="text" v-model="userId" @keyup.enter="findUser"/></p>
        <div class="modify-body" v-if="isDetected">
          <p>Фамилия: {{user.surname}}</p>
          <p>Имя: {{user.name}}</p>
          <p>Отчество: {{user.secondname}}</p>
          <p>Роль: {{user.role}}</p>
          <button class="btn btn-success" @click="promoteToAdmin">Сделать администратором</button>
          <button type="button" class="btn btn-danger" @click="$bvModal.hide('promote-user-modal')">Закрыть</button>
        </div>
      </div>
    </b-modal>

    <button type="button" class="btn btn-warning" @click="$bvModal.show('demote-user-modal')">Удалить администратора</button>

    <b-modal id="demote-user-modal" hide-footer title="Добавить администратора">
      <div class="d-block text-left">
        <p>Введите идентификатор пользователя: <input type="text" v-model="userId" @keyup.enter="findUser"/></p>
        <div class="modify-body" v-if="isDetected">
          <p>Фамилия: {{user.surname}}</p>
          <p>Имя: {{user.name}}</p>
          <p>Отчество: {{user.secondname}}</p>
          <p>Роль: {{user.role}}</p>
          <button class="btn btn-success" @click="demoteToUser">Сделать пользователем</button>
          <button type="button" class="btn btn-danger" @click="$bvModal.hide('demote-user-modal')">Закрыть</button>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import UserService from '@/services/user.service'
export default {
  data() {
    return {
      user: {
        name: '',
        surname: '',
        secondname: '',
        role: ''
      },
      userId: '',
      isDetected: false
    }
  },
  methods: {
    findUser() {
      UserService.getUserById(this.userId).then(
          response => {
            this.user.name = response.data.name;
            this.user.surname = response.data.surname;
            this.user.secondname = response.data.secondName;
            this.user.role = response.data.roles[0].name;
            this.isDetected = true;
            console.log(response)
          })
    },
    promoteToAdmin() {
      UserService.promoteToAdmin(this.userId)
    },
    demoteToUser() {
      UserService.demoteToUser(this.userId)
    }
  }
}
</script>