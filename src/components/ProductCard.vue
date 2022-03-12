<template>
<!--    <div class="custom-card">-->
<!--      <div class="card" style="width: 18rem; margin-bottom: 25px; margin-right: 25px">-->
<!--        <img v-if="isDevMode"-->
<!--            style="height: 286px; width: 286px"-->
<!--            class="card-img-top"-->
<!--            :src="'http://localhost:8080/files/' + product.image"-->
<!--            alt=""-->
<!--            @click="$router.push({ name: 'product-page', params: { id: product.id } })"-->
<!--        >-->
<!--        <img v-else-->
<!--             style="height: 286px; width: 286px"-->
<!--             class="card-img-top"-->
<!--             :src="'https://hand-made-shop.herokuapp.com/files/' + product.image"-->
<!--             alt=""-->
<!--             @click="$router.push({ name: 'product-page', params: { id: product.id } })"-->
<!--        >-->
<!--        <div class="card-body">-->
<!--          <h5 class="card-title">{{ product.name }}</h5>-->
<!--          <p class="card-text">Стоимость за шт. {{product.price}} руб.</p>-->
<!--          <p style="color: crimson" v-if="product.amount === 1"> Поторопитесь! Осталась одна штука</p>-->
<!--          <p v-else-if="product.amount === 0"> Товар распродан</p>-->
<!--          <p v-else> Кол-во на складе: {{product.amount}} шт.</p>-->
<!--          <div v-if="product.sale !== null">-->
<!--            <p>Скидка {{product.sale.discount}}%</p>-->
<!--            <p>Стоимость с учетом скидки {{priceWithDiscount}}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="card-footer">-->
<!--          <button v-if="product.amount === 0" class="btn btn-secondary">Добавить в корзину</button>-->
<!--          <button v-else class="btn btn-primary" @click="addProductToCart">Добавить в корзину</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


    <div class="product_card">
      <div class="product_card__preview">
        <a @click="$router.push({ name: 'product-page', params: { id: product.id } })">
          <div class="preview__status">
            <ProductCircle v-if="product.sale !== null" class="sale" :type="'sale'" :label="product.sale.discount"/>
            <ProductCircle v-if="product.rating >= 4.5" class="rating" :type="'rating'" :label="product.rating" />
          </div>
          <div class="preview__img">
            <img
                v-if="isDevMode"
                :src="'http://localhost:8080/files/' + product.image"
                alt=""
            >
            <img
                v-else
                :src="'https://hand-made-shop.herokuapp.com/files/' + product.image"
                alt=""
            >
          </div>
        </a>
      </div>
      <div class="product_card__info">
        <div class="info__title info__el">
          <a href=""><h3>{{ product.name }}</h3></a>
        </div>
        <div v-if="product.sale !== null" class="info__price info__price-sale info__el">
          <h3>{{ priceWithDiscount + ' ' + '₽' }}</h3>
        </div>
        <div v-else class="info__price info__el">
          <h3>{{ product.price + ' ' + '₽' }}</h3>
        </div>
        <div class="info__quantity info__el">
          <p>
            кол-во <span>{{ product.amount }}</span> шт
          </p>
        </div>
      </div>
      <div class="product_card__button">
        <Button
            v-if="product.amount === 0"
            :label="'Добавить'"
            :size="'small'"
            :color="'translucent'"
        />
        <Button
            v-else
            :label="'Добавить'"
            :size="'small'"
            :color="'color'"
            :click="addProductToCart"
        />
      </div>
    </div>

</template>

<script>
import CartService from '../services/cart.service'
import ProductCircle from "./Base/ProductCircle";
import Button from "./Base/Button";

export default {
  components:{
    ProductCircle,
    Button
  },
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      priceWithDiscount: 0,
      isDevMode: false
    }
  },
  methods: {
    calculateDiscount() {
      if (this.product.sale !== null) {
        this.priceWithDiscount = (this.product.price / 100) * (100 - this.product.sale.discount);
      }

    },
    addProductToCart() {
      let cartDTO = {
        "productId": this.product.id,
        "amount": 1
      }
      CartService.addProductToCart(cartDTO);
    }
  },
  created() {
    this.calculateDiscount();
    if (process.env.NODE_ENV === 'development') {
      this.isDevMode = true;
    }
  }
}
</script>

<style scoped lang="scss">

.product_card{
  width: 280px;
  .product_card__preview{
    height: 295px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    transition: 0.3s;
    border-radius: 25px;
    border: none;
    a{
      display: block;
      height: 100%;
      width: 100%;
    }
    .preview__status{
      position: relative;
      .sale{
        right: 70px;
      }
      .rating {
        right: 5px;
        }
      }
    .preview__img{
      height: 100%;
      display: grid;
      align-items: center;
      justify-items: center;
      img{
        height: 260px;
      }
    }
    &:hover{
      transition: 0.3s;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    }
  }
  .product_card__info{
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(2, auto);

    row-gap: 5px;
    .info__el{
      display: inline-block;
      h3,p{
        display: inline-block;
      }
    }
    .info__title{

      width: 180px;
    }
    .info__price{
      display: grid;
      justify-self: end;
      h3{
        color: #5740FF;
      }
    }
    .info__quantity{
      span{
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .product_card__button{
    width: 100%;
    opacity: 0;
    transition: 0.3s;
    position: relative;
    top: 10px;
  }
  &:hover{
    .product_card__button{
      opacity: 1;
      transition: 0.3s;
      top: 0;
    }
  }
}

</style>


