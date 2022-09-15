<template>
  <div class="about">
    <Header/>
    <main class="container">
      <section class="heading">
        <h1>{{text}}</h1>
      </section>
      <section class="project-info">
        <p>Интернет-магазин "Hand-made магазин "Любый питомец" реализует товары ручного производства для собак, кошек, рыбок и гызунов и является проектом, выданным
        во время производственной практики на предприятии ООО "Рексофт".</p>
        <h3>Стек технологий</h3>
        <ul>
          <li>ЯП Java</li>
          <li>Spring Framework</li>
          <li>СУБД PostgreSQL</li>
          <li>Vue.js</li>
        </ul>
        <p>Автор проекта: Липатов Никита Николаевич, студент группы 4-15ПКС</p>
        <p>Соавтор: Байков Станислав Эдуардович, студент группы 4-15ПКС (c 12.07.21)</p>
        <p>Под руководством gitHub проекта:
          <a href="https://github.com/nikitalipatov25/shop-app">https://github.com/nikitalipatov25/shop-app</a>
        </p>
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
