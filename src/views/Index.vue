<template>
    <div class="index">
      <Header/>
        <div class="body">
          <h2>Наши акции</h2>
          <index-corusel/>
          <h2>Наш каталог</h2>
          <IndexCatalog/>
          <h2>Новинки</h2>
          Work in progress...
          <h2>Популярные товары</h2>
          Work in progress...
        </div>
      <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Foter'
import IndexCatalog from "@/components/IndexCatalog"
import IndexCorusel from '@/components/IndexCorusel'

export default {
    name: 'Index',
  components: {
    IndexCorusel,
    Header,
    Footer,
    IndexCatalog,
  }
}
</script>