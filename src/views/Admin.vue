<template>
  <div class="admin">
    <Header/>
      <div class="body">
        <h1>Admins page</h1>
        <CatalogTool/>
        <DealsTool/>
        <UserTool/>
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
export default {
  components: {
    Header,
    Footer,
    CatalogTool,
    DealsTool,
    UserTool
  },
}
</script>