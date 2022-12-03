<template>
  <div class="about">
    <Header/>
    <main class="container">
      <section class="heading">
        <h1>{{text}}</h1>
      </section>
      <section class="project-info">
        <p>Интернет-магазин "Hand-made магазин "Любый питомец" реализует товары ручного производства сделанные с любовью для ваших питомцев.</p>
        <p>Сюда бы еще фотки и адрес магазина</p>
      </section>
    </main>
    <Footer/>
  </div>

</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'

export default {
  name: 'About',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      text: 'О магазине'
    }
  }
}
</script>

<style lang="scss">
.project-info{
  display: grid;
  gap: 5px;
  ul{
    list-style: circle;
    margin: 10px 0;
    padding-left: 25px;
  }
}
</style>
