<template>
<!--          <li class="list-group-item" @click="openCatalogCategory('empty')">Все товары</li>-->
<!--          <li class="list-group-item" v-for="animal in animals" :key="animal">{{animal.name}}</li>-->
<!--          <li class="list-group-item" @click="$router.push({name: 'questions'})">Информация покупателям(ЧаВо)</li>-->
<!--          <li class="list-group-item" @click="$router.push({name: 'sale'})">Скидки и акции</li>-->
<!--          <li class="list-group-item" @click="$router.push({name: 'about'})">О магазине</li>-->
  <footer class="footer_section">
    <div class="container">
      <div class="footer">
        <div class="footer__social">
          <Logo color="dark" />
          <div class="social">
            <a href=""><img src="../../assets/instagram.png" alt=""></a>
            <a href=""><img src="../../assets/vk.png" alt=""></a>
          </div>
        </div>
        <div class="footer__link footer__el">
          <h2>Товары</h2>
          <ul class="link__list">
            <li
                class="list__el"
                v-for="(item, index) in animals"
                :key="index"
            >
              <a href="">{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div class="footer__contact footer__el">
          <h2>Свяжитесь с нами</h2>
          <ul class="link__list">
            <li
                class="list__el"
                v-for="(item, index) in contacts"
                :key="index"
            >
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
        <div class="footer__about footer__el">
          <h2>Информация для покупателя</h2>
          <ul class="link__list">
            <li class="list__el"><a href="" @click="$router.push({name: 'questions'})">F.A.Q.</a></li>
            <li class="list__el"><a href="" @click="$router.push({name: 'about'})">О магазине</a></li>
            <li class="list__el"><a href="" @click="$router.push({name: 'sale'})">Скидки</a></li>
          </ul>
        </div>
      </div>
      <div class="footer_section__copyright">
        <h3>
          Copyright © 2021 Магазин для животных “Любимый питомец”. All Rights Reserved.
        </h3>
      </div>
    </div>
  </footer>
</template>

<script>
import {eventBus} from "@/main";
import Logo from "../Base/Logo";

export default {
  components:{
    Logo
  },
  data() {
    return {
      animals: {},
      contacts:[
        'Address : Patricia C. Amedee 4401 Waldeck Street Grapevine Nashville, Tx 76051',
        'Phone: +7 (999) 999 99 99'
      ],
    }
  },
  methods: {
    openCatalogCategory(catalogParameter) {
      if (this.$route.name === 'catalog-page') {
        eventBus.$emit('openCatalogCategory', catalogParameter)
      } else {
        this.$router.push({name: 'catalog-page', params: {catalogParameter: catalogParameter}});
      }
    }
  },
}
</script>

<style scoped lang="scss">

.footer_section{
  margin-top: 15px;
  background-color: #1D1A1A;
  color: #fff;
}

.footer_section__copyright{
  height: 60px;
  display: grid;
  align-items: center;
  border-top: 1px solid #ccc;
  h3{
    font-weight: normal;
    color: #ccc;
  }
}

.footer{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  row-gap: 30px;
  align-items: start;
  justify-items: center;
  padding-top: 20px;
  .footer__social{
    display: inline-grid;
    height: 100%;
    grid-template-rows: repeat(2, 2fr);
    align-items: start;
    .social{
      display: inline-grid;
      grid-template-columns: repeat(2, 40px);
      column-gap: 20px;
      height: 100%;
      align-items: flex-end;
      img{
        height: 40px;
      }
    }
  }
  .footer__el{
    margin-top: 0px;
    h2{
      text-align: center;
      display: block;
    }
    .link__list{
      text-align: center;
      margin: 0;
      padding: 0;
      list-style: none;
      .list__el{
        margin: 15px 0px;
        p{
          margin: 0;
        }
        a{
          color: #FFFFFF;
        }
        a:hover{
          color: #61CE70;
          transition: 0.3s;
        }
      }
    }
  }
  .footer__about{
    h2{

    }
  }
}


</style>
