<template>
  <div class="q-and-a">
    <Header/>
    <main class="container">
      <section class="heading">
        <h1>{{text}}</h1>
      </section>
      <section class="q-a">
        Work in progress...
        <h2>Как зарегистрироваться?</h2>
        <h2>Как офрмить заказ?</h2>
        <h2>Как получить скидку на заказ?</h2>
        <h2>Как связатья ссотрудниками магазина?</h2>
        <h2>Как оформить возврат?</h2>
      </section>
    </main>
    <Footer/>
  </div>

</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'

export default {
  name: 'QandA',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      text: 'Частые вопросы'
    }
  }
}
</script>

<style lang="scss">
.q-a{
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
}
</style>
