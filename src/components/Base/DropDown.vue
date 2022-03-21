<template>
<!--  <div @mouseleave="isOpen = false" class="drop-down">-->
  <div  class="drop-down">
    <div @click="isOpen = !isOpen" class="drop-down__selected">
      <span v-if="type === 'filter'">
        {{ activeEl }}
      </span>
      <span v-else-if="type === 'drop'">
        {{ title }}
      </span>
    </div>
    <transition name="fade">
      <div  v-if="isOpen" class="drop-down__body">
        <ul class="list">
          <DropDownItem
              v-for="(item, index) in list"
              :key="index"
              :click="item.click"
              :label="item.label"
              :link="item.link"
              :getActive="getActive"
          />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import DropDownItem from "./DropDownItem";

export default {
  name: "DropDown",
  components:{
    DropDownItem
  },
  props:{
    type: String,
    title: String,
    list: Array
  },
  data(){
    return{
      isOpen: false,
      activeEl: this.title
    }
  },
  methods:{
    getActive(label){
      this.activeEl = label
    }
  }
}
</script>

<style scoped lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

  .drop-down{
    display: inline-block;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    .drop-down__selected{
      height: 100%;
      width: 100%;
      span{
        font-weight: bold;
      }
      img{
        height: 15px;
      }
    }
    .drop-down__body{
      position: absolute;
      right: 5px;
      padding-top: 5px;
      transition: 0.3s;
      .list{
        border-radius: 5px;
        display: inline-grid;
        grid-template-rows: auto;
        //row-gap: 10px;
        padding: 0px;
        background-color: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
      }
    }

  }

</style>
