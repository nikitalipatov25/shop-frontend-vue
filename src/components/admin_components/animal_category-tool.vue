<template>
  <div class="animal-category-tool">
    <div class="category">
      <h2>Работа с категориями</h2>

      <button type="button" class="btn btn-success" @click="$bvModal.show('add-category-modal')">Добавить категории</button>

      <b-modal id="add-category-modal" hide-footer title="Добавить категории">
        <div class="d-block text-left">
          <p>Введите название категории:<input type="text" v-model="category.categoryName"></p>
          <p>Добавьте фотографию:<input type="file" ref="file" @change="selectFile"></p>
        </div>
        <button class="btn btn-success" @click="addCategory">Добавить категорию</button>
        <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-category-modal')">Закрыть</button>
      </b-modal>

      <button type="button" class="btn btn-danger" @click="$bvModal.show('delete-category-modal')">Удалить категории</button>

      <b-modal id="delete-category-modal" hide-footer title="Удалить категории">
        <div class="d-block text-left">
          <p>Введите идентификатор категории, которую хотите удалить: <input type="text" v-model="categoryUUID" @keyup.enter="findCategory"/></p>
          <div class="modify-body" v-if="isDetected">
            <img :src="'http://localhost:8080/files/' + category.imageURL" style="width: 100px; height: 100px">
            <strong>Вы собираетесь удалить {{category.categoryName}}</strong>
            <button class="btn btn-success" @click="deleteCategory">Удалить категорию</button>
            <button type="button" class="btn btn-danger" @click="$bvModal.hide('delete-category-modal')">Закрыть</button>
          </div>
        </div>
      </b-modal>

      <button type="button" class="btn btn-warning" @click="$bvModal.show('modify-category-modal')">Изменить категории</button>

      <b-modal id="modify-category-modal" hide-footer title="Изменить категори">
        <div class="d-block text-left">
          <p>Введите идентификатор категории, которую хотите изменить : <input type="text" v-model="categoryUUID" @keyup.enter="findCategory"/></p>
          <div class="modify-body" v-if="isDetected">
            <img :src="'http://localhost:8080/files/' + category.imageURL" style="width: 100px; height: 100px">
            <p>Измените название<input type="text" v-model="category.categoryName"></p>
            <p>Измените фотографию:<input type="file" ref="file" @change="selectFile"></p>
            <button class="btn btn-success" @click="modifyCategory">Изменить категорию</button>
            <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-category-modal')">Закрыть</button>
              </div>
            </div>
      </b-modal>

    </div>

    <div class="animal">
      <h2>Работа с животными</h2>

      <button type="button" class="btn btn-success" @click="$bvModal.show('add-animal-modal')">Добавить животных</button>

      <b-modal id="add-animal-modal" hide-footer title="Добавить животных">
        <div class="d-block text-left">
          <p>Введите название животного:<input type="text" v-model="animal.animalName"></p>
          <p>Добавьте фотографию:<input type="file" ref="file" @change="selectFile"></p>
          <p>Добавьте категории</p>
          <div v-for="category in categoriesArr" :key="category.id">
            <input type="checkbox" v-bind:value="category.name" v-model="animal.categories"> {{category.name}}
          </div>
        </div>
        <button class="btn btn-success" @click="addAnimal">Добавить животного</button>
        <button type="button" class="btn btn-danger" @click="$bvModal.hide('add-animal-modal')">Закрыть</button>
      </b-modal>

      <button type="button" class="btn btn-danger" @click="$bvModal.show('delete-animal-modal')">Удалить животных</button>

      <b-modal id="delete-animal-modal" hide-footer title="Удалить животных">
        <div class="d-block text-left">
          <p>Введите идентификатор животного, которое хотите удалить: <input type="text" v-model="animalUUID" @keyup.enter="findAnimal"/></p>
          <div class="delete-body" v-if="isDetected">
            <img :src="'http://localhost:8080/files/' + category.imageURL" style="width: 100px; height: 100px">
            <strong>Вы собираетесь удалить {{animal.animalName}}</strong>
            <button class="btn btn-success" @click="deleteAnimal">Удалить животное</button>
            <button type="button" class="btn btn-danger" @click="$bvModal.hide('delete-animal-modal')">Закрыть</button>
          </div>
        </div>
      </b-modal>

      <button type="button" class="btn btn-warning" @click="$bvModal.show('modify-animal-modal')">Изменить животных</button>

      <b-modal id="modify-animal-modal" hide-footer title="Изменить животных">
        <div class="d-block text-left">
          <p>Введите идентификатор животного, которое хотите изменить : <input type="text" v-model="animalUUID" @keyup.enter="findAnimal"/></p>
          <div class="modify-body" v-if="isDetected">
            <img :src="'http://localhost:8080/files/' + animal.imageURL" style="width: 100px; height: 100px">
            <p>Измените название<input type="text" v-model="animal.animalName"></p>
            <p>Измените фотографию:<input type="file" ref="file" @change="selectFile"></p>
            <p>Добавьте категории</p>
            <div v-for="category in categoriesArr" :key="category.id">
              <input type="checkbox" v-bind:value="category.name" v-model="newCategories"> {{category.name}}
            </div>
            <button class="btn btn-success" @click="modifyAnimal">Изменить животное</button>
            <button type="button" class="btn btn-danger" @click="$bvModal.hide('modify-animal-modal')">Закрыть</button>
          </div>
        </div>
      </b-modal>

    </div>
  </div>
</template>

<script>
import AnimalService from '@/services/animal.service'
import CategoryService from "@/services/category.service";
import FileService from "@/services/files.service";
export default {
  data() {
    return {
      animal: {
        animalName: '',
        imageURL: null,
        categories: []
      },
      category: {
        categoryName: '',
        imageURL: '',
        animals: []
      },
      categoryUUID: '',
      categoriesArr: [],
      newCategories: [],
      animalUUID: '',
      isDetected: false,
      selectedFiles: undefined,
      currentFile: undefined,
    }
  },
  methods: {
    async modifyCategory() {
      this.currentFile = this.selectedFiles.item(0);
      await FileService.uploadImage(this.currentFile);
      this.category.imageURL = this.currentFile.name;
      await CategoryService.modifyCategory(this.categoryUUID, this.category)
    },
    async deleteCategory() {
      await CategoryService.deleteCategory(this.categoryUUID);
      this.categoryUUID = '';
      this.isDetected = false;
    },
    findCategory() {
      CategoryService.getCategory(this.categoryUUID).then(
          response => {
            this.category.categoryName = response.data.name;
            this.category.imageURL = response.data.imageURL;
            this.isDetected = true;
          })
    },
    async addCategory() {
      this.currentFile = this.selectedFiles.item(0);
      await FileService.uploadImage(this.currentFile);
      this.category.imageURL = this.currentFile.name;
      await CategoryService.addCategory(this.category);
    },
    findAnimal() {
      AnimalService.getAnimal(this.animalUUID).then(
          response => {
            this.animal.animalName = response.data.name;
            this.animal.imageURL = response.data.imageURL;
            this.animal.categories = response.data.categories.name;
            this.isDetected = true;
          })
    },
    async addAnimal() {
      this.currentFile = this.selectedFiles.item(0);
      await FileService.uploadImage(this.currentFile);
      this.animal.imageURL = this.currentFile.name;
      await AnimalService.addAnimal(this.animal);
    },
    async deleteAnimal() {
      await AnimalService.deleteAnimal(this.animalUUID);
      this.animalUUID = '';
      this.isDetected = false;
    },
    async modifyAnimal() {
      this.currentFile = this.selectedFiles.item(0);
      await FileService.uploadImage(this.currentFile);
      this.animal.imageURL = this.currentFile.name;
      this.animal.categories = this.newCategories;
      await AnimalService.modifyAnimal(this.animalUUID, this.animal);
    },
    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.categoriesArr = response.data;
          })
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
  },
  created() {
    this.getCategories();
  }
}
</script>