<template>
  <div class="deals">
    <Header/>
    <div class="body">
      <h1>{{text}}</h1>
      <sale-list
          v-for="sale in sales"
          :key="sale.id"
          :sale="sale"
      />
    </div>
    <Footer/>
  </div>

</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import SaleService from '@/services/sale.service'
import SaleList from "@/components/SaleList";

export default {
  name: 'Deals',
  components: {
    SaleList,
    Header,
    Footer
  },
  data() {
    return {
      text: 'Скидки и акции',
      sales: {},
    }
  },
  methods: {
    getSales() {
      SaleService.getSales().then(
          response => {
            this.sales = response.data.content
            console.log(this.sales)
          }
      )
    },
  },
   created() {
     this.getSales()
  }
}
</script>
