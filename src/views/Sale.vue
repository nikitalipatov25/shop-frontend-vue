<template>
  <div class="deals">
    <Header/>
    <main class="container">
      <section class="heading">
        <h1>{{text}}</h1>
      </section>
      <section class="sale">
        <sale-list
            v-for="sale in sales"
            :key="sale.id"
            :sale="sale"
        />
      </section>
    </main>
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

<style lang="scss">
.sale{
  min-width: 304px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 20px 10px;
  align-items: center;
  justify-items: start;
}
</style>
