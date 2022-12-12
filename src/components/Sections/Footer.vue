<template>
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
                v-for="(item, index) in category"
                :key="index"

            >
              <a @click="openCatalogCategory(item.name)">{{ item.name }}</a>
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
import Logo from "../Base/Logo";
import CategoryService from "@/services/category.service";

export default {
  components:{
    Logo
  },
  data() {
    return {
      category: {},
      contacts:[
        'Санкт-Петербург,\n' +
        '190103, 10-я Красноармейская, 22,\n' +
        'литер А, пом. 1-Н, 6-й этаж',
        '8-800-301-76-27, с 7:00 до 24:00 по мск.\n' +
        'Звонок по России бесплатный',
        'help@favouritepet.ru'
      ],
    }
  },
  methods: {
    openCatalogCategory(catalogParameter) {
      this.$router.push({ name: 'catalog-page', params: {catalogParameter: catalogParameter} });
    },
    getCategories() {
      CategoryService.getCategoriesSet().then(
          response => {
            this.category = response.data
          }
      )
    }
  },
  created() {
    this.getCategories()
  }
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
