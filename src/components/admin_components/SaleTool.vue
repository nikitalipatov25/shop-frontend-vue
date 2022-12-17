<template>
  <div class="sale-tool">
    <div class="heading">
      <h2>Акции</h2>
    </div>


    <div class="admin__button">
      <Button
          :label="'Добавить акцию'"
          :size="'small'"
          :color="'color'"
          :click="showModal"
      />
    </div>

    <Modal
        v-show="isModalVisible"
        @close="closeModal"
        :sale="sale"
    />

    <section>
      <table>
        <tr>
          <td><h4>Изображение</h4></td>
          <td><h4>Название</h4></td>
          <td><h4>Начало</h4></td>
          <td><h4>Окончание</h4></td>
          <td><h4>Скидка</h4></td>
          <td><h4>Опции</h4></td>
        </tr>
        <admin-sale-desk
            v-for="sale in sales"
            :key="sale.id"
            :sale="sale"
        />
      </table>

    </section>
  </div>
</template>

<script>
import SaleService from "@/services/sale.service";
import AdminSaleDesk from "@/components/admin_components/AdminSaleDesk";
import Modal from "@/components/admin_components/AdminSaleModal";
import Button from "@/components/Base/Button";
import {eventBus} from "@/main";
export default {
  components: {
    AdminSaleDesk,
    Modal,
    Button
  },
  data() {
    return {
      sale: {
        id: '',
        name: '',
        image: null,
        date: '',
        expirationDate: '',
        discount: ''
      },
      sales: undefined,
      isModalVisible: false
    }
  },
  methods: {
    getSales() {
      SaleService.getSales().then(
          response => {
            this.sales = response.data.content
          }
      )
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  created() {
    this.getSales()
    eventBus.$on('reload', () => this.getSales())
  }
}
</script>

<style scoped>

</style>