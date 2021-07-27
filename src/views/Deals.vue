<template>
  <div class="deals">
    <Header/>
    <div class="body">
      <h1>{{text}}</h1>
        <deals-list
        v-for="deal in deals"
        :key="deal.id"
        :deal="deal"
        />
    </div>
    <Footer/>
  </div>

</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Foter'
import PromotionService from '@/services/promotion.service'
import DealsList from "@/components/DealsList";

export default {
  name: 'Deals',
  components: {
    DealsList,
    Header,
    Footer
  },
  data() {
    return {
      text: 'Скидки и акции',
      deals: {},
    }
  },
  methods: {
    getDeals() {
      PromotionService.getPromotions().then(
          response => {
            this.deals = response.data.content
            console.log(this.deals)
          }
      )
    },
  },
   created() {
     this.getDeals()
  }
}
</script>