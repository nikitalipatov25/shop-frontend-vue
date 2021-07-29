<template>
  <div class="deals-tool">
    <h2>Работа с акциями</h2>

    <button class="btn btn-primary">Отчёт по продажам</button>

    <button class="btn btn-success" @click="$bvModal.show('add-modal')">Добавить акцию</button>
    <b-modal id="add-modal" hide-footer title="Добавить акцию">
      <div class="d-block text-left">
        <p>Введите название акции:<input type="text" v-model="deal.name"></p>
        <p>Введите описание акции:<input type="text" v-model="deal.description"></p>
        <p>Введите тип товара:<input type="text" v-model="deal.type"></p>
        <p>Введите начальную дату акции:<input type="text" v-model="deal.date"></p>
        <p>Введите конечную дату акции:<input type="text" v-model="deal.expirationDate"></p>
        <p>Введите размер скидки:<input type="text" v-model="deal.discount"></p>
        <p>Добавьте фотографию:<input type="file" ref="file" @change="selectFile"></p>
      </div>
      <button class="btn btn-success" @click="addNewDeal">Добавить акцию</button>
      <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-modal')">Закрыть</button>
    </b-modal>

    <button type="button" class="btn btn-danger">Удалить акцию</button>
    <button type="button" class="btn btn-warning">Модифицировать акцию</button>
  </div>
</template>

<script>
import AdminService from '@/services/admin.service'

export default {
  data() {
    return {
      deal: {
        name: '',
        discount: '',
        date:'',
        expirationDate:'',
        description: '',
        type: ''
      },
      selectedFiles: undefined,
      currentFile: undefined,
    }
  },
  methods: {
    addNewDeal() {
      this.currentFile = this.selectedFiles.item(0);
      AdminService.uploadImage(this.currentFile)
          .then(response => {
            console.log(response.data)
          })

      let payload = {
        'description': this.deal.description,
        'expirationDate': this.deal.expirationDate,
        'date': this.deal.date,
        'name': this.deal.name,
        'type': this.deal.type,
        'discount': this.deal.discount,
        'image': this.currentFile.name
      }

      AdminService.generatePromotion(payload).then(
          response => {
            console.log(response);
          }
      )
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      console.log(this.selectedFiles)
    },
  }
}
</script>