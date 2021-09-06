<template>
  <div class="deals-tool">
    <h2>Работа с пользователями</h2>

    <button class="btn btn-primary">Модерация комментариев</button>

    <button class="btn btn-success" @click="$bvModal.show('add-modal')">Добавить администратора</button>
    <b-modal id="add-modal" hide-footer title="Добавить товар">
      <div class="d-block text-left">
        <p>Введите название товара: <input type="text" v-model="product.name"/></p>
        <p>Введите описание товара: <input type="text" v-model="product.description"/></p>
        <p>Введите стоимость товара: <input type="text" v-model="product.price"/></p>
        <p>Добавьте фотографию товара: <input type="text" v-model="product.photo"/></p>
        <p>Введите количество товара: <input type="text" v-model="product.quantity"/></p>
        <p>Введите тип животного: <input type="text" v-model="product.animal"/></p>
        <p>Введите категорию товара: <input type="text" v-model="product.category"/></p>
      </div>
      <button class="btn btn-success" @click="addNewProductToCatalog">Добавить товар</button>
      <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-modal')">Закрыть</button>
    </b-modal>

    <button type="button" class="btn btn-danger">Заблокировать пользователя</button>
    <button type="button" class="btn btn-warning">Удалить администратора</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      product: {
        'name': '',
        'description': '',
        'price': '',
        'photo': '',
        'quantity': '',
        'animal': '',
        'category': '',
      }
    }
  },
}
</script>