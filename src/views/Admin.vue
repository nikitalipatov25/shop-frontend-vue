<template>
  <div class="admin">
    <h1>Admins page</h1>
    <p><input v-model="name" placeholder="название"></p>
    <p><input v-model="discount" placeholder="скидка"></p>
    <p><input v-model="date" placeholder="дата"></p>
    <p><input v-model="expirationDate" placeholder="data2"></p>
    <p><input v-model="description" placeholder="desc"></p>
    <p><input v-model="type" placeholder="тип"></p>
    <p><input type="file" ref="file" @change="selectFile"></p>
    <button @click="createPromotion">Добавить акцию</button>
  </div>
</template>

<script>
import PromotionService from '@/services/promotion.service'
import FileService from '@/services/files.service'
export default {
  data() {
    return {
      name: '',
      discount: '',
      date:'',
      expirationDate:'',
      description: '',
      type: '',
      src: 'http://localhost:8080/files/',
      selectedFiles: undefined,
      currentFile: undefined,
      fileInfos: []
    }
  },
  methods: {
    createPromotion() {

      this.currentFile = this.selectedFiles.item(0);
      FileService.uploadImage(this.currentFile)
          .then(response => {
            console.log(response.data)
          })

      let payload = {
        'description': this.description,
        'expirationDate': this.expirationDate,
        'date': this.date,
        'name': this.name,
        'type': this.type,
        'discount': this.discount,
        'image': this.currentFile.name
      }

      PromotionService.generatePromotion(payload).then(
          response => {
            console.log(response);
          }
      )
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      console.log(this.selectedFiles)
    },
    upload() {
      this.currentFile = this.selectedFiles.item(0);
      FileService.uploadImage(this.currentFile)
          .then(response => {
            console.log(response.data)
          })
    }
  }
}
</script>