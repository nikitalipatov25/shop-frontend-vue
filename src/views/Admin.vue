<template>
  <div class="admin">
    <h1>Admins page</h1>
    <input v-model="name" placeholder="название">
    <input v-model="discount" placeholder="скидка">
    <input v-model="date" placeholder="дата">
    <input v-model="type" placeholder="тип">

    <input type="file" ref="file" @change="selectFile">


    <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>


    <button @click="createPromotion">New promotion</button>
    <hr>
    <img :src="src">
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
      type: '',
      src: 'http://localhost:8080/files/1132bac2-6e9f-41c2-af9a-6619b565c9f2',
      selectedFiles: undefined,
      currentFile: undefined,
      message: "",
      fileInfos: []
    }
  },
  methods: {
    createPromotion() {
      let payload = {
        'expirationDate': this.date,
        'name': this.name,
        'type': this.type,
        'discount': this.discount
      }
      this.currentFile = this.selectedFiles.item(0);
      console.log(this.currentFile)
      PromotionService.generatePromotion(payload, this.currentFile).then(
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
      console.log(this.currentFile)
      FileService.uploadImage(this.currentFile)
          .then(response => {
            this.message = response.data.message;
            console.log(this.message)
          })
    }
  }
}
</script>