<template>
  <div class="admin" v-if="isAdmin">
    <Header/>
      <main class="container">
        <section class="heading">
          <h1>Панель администратора</h1>
        </section>
        <CatalogTool/>
        <Animal_categoryTool/>
        <SaleTool></SaleTool>
        <OrderTool></OrderTool>
      </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Sections/Header'
import Footer from '../components/Sections/Footer'
import CatalogTool from '@/components/admin_components/CatalogTool'
import Animal_categoryTool from "@/components/admin_components/CategoryTool";
import SaleTool from "@/components/admin_components/SaleTool";
import OrderTool from "@/components/admin_components/OrderTool";

export default {
  components: {
    Animal_categoryTool,
    Header,
    Footer,
    CatalogTool,
    SaleTool,
    OrderTool
  },
  data() {
    return {
      isAdmin: false
    }
  },
  methods: {
    isAdminCheck() {
      if (this.$store.state.auth.user.roles[0] === 'ROLE_ADMIN') {
        this.isAdmin = true
      }
    }
  },
  computed: {

  },
  created() {
    this.isAdminCheck()
  }
}
</script>
