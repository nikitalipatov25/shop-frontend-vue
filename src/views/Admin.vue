<template>
  <div class="admin">
    <Header/>
      <div class="body">
        <h1>Панель администратора</h1>
        <CatalogTool/>
        <DealsTool/>
        <UserTool/>
        <Animal_categoryTool/>
        <Answer_commentTool/>
        <OrdersTool/>
      </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Foter'
import CatalogTool from '@/components/admin_components/catalog-tool'
import DealsTool from '@/components/admin_components/deals-tool'
import UserTool from '@/components/admin_components/user-tool'
import Animal_categoryTool from "@/components/admin_components/animal_category-tool";
import Answer_commentTool from "@/components/admin_components/answer_comment-tool";
import OrdersTool from "@/components/admin_components/orders-tool";

export default {
  components: {
    OrdersTool,
    Answer_commentTool,
    Animal_categoryTool,
    Header,
    Footer,
    CatalogTool,
    DealsTool,
    UserTool
  },
}
</script>