<template>
  <div class="admin">
    <Header/>
      <div class="body">
        <h1>Admins page</h1>
        <input type="text" placeholder="Animal" v-model="av">
        <input type="text" placeholder="Category" v-model="item" @keyup.enter="add">
        {{cv}}
        <button @click="test">Test</button>
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
import AdminService from '@/services/admin.service'
export default {
  components: {
    Header,
    Footer,
    CatalogTool,
    DealsTool,
    UserTool
  },
  data() {
    return {
      item: '',
      av:'',
      cv:[],

    }
  },
  methods: {
    add() {
      this.cv.push(this.item)
    },
    test() {
      AdminService.addAnimals(this.av, this.cv)
    },
    created() {
      AdminService.getAnimals().then(
          response => {
            console.log(response.data)
          }
      );
      AdminService.getCategories().then(
          response => {
            console.log(response.data)
          }
      );
    }
  }
}
</script>