<template>
  <div class="admin">
    <h1>Admins page</h1>
    <input v-model="name" placeholder="название">
    <input v-model="discount" placeholder="скидка">
    <input v-model="date" placeholder="дата">
    <input v-model="type" placeholder="тип">
    <button @click="createPromotion">New promotion</button>
  </div>
</template>

<script>
import PromotionService from '@/services/promotion.service'
export default {
  data() {
    return {
      name: '',
      discount: '',
      date:'',
      type: ''
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
      PromotionService.generatePromotion(payload).then(
          response => {
            console.log(response);
          }
      )
    }
  }
}
</script>