<template>
  <div class="orders-c">
<!--    <h2>Заказ № {{order.orderId}} от {{order.orderDate}}</h2>-->

<!--    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">-->
<!--      Заказ № {{order.orderId}} от {{order.orderDate}}-->
<!--    </button>-->

    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Заказ № {{order.orderId}} от {{order.orderDate}}
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>Это тело аккордеона первого элемента.</strong> По умолчанию оно скрыто, пока плагин сворачивания не добавит соответствующие классы, которые мы используем для стилизации каждого элемента. Эти классы управляют общим внешним видом, а также отображением и скрытием с помощью переходов CSS. Вы можете изменить все это с помощью собственного CSS или переопределить наши переменные по умолчанию. Также стоит отметить, что практически любой HTML может быть помещен в <code>.accordion-body</code>, хотя переход ограничивает переполнение.
        </div>
      </div>
    </div>

<!--    <div class="row">-->
<!--      <div class="col-2">-->
<!--        {{order.orderId}}-->
<!--      </div>-->
<!--      <div class="col-2">-->
<!--      {{order.finalPrice}}-->
<!--      </div>-->
<!--      <div class="col-2">-->
<!--        {{order.productsInfo}}-->
<!--      </div>-->
<!--      <div class="col-2">-->
<!--        {{order.orderDate}}-->
<!--      </div>-->
<!--      <div class="col-2">-->
<!--        {{order.orderType}}-->
<!--      </div>-->
<!--      <div class="col-2">-->
<!--        {{order.orderStatus}}-->
<!--      </div>-->
<!--    </div>-->
<!--    <hr>-->

  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    }
  }
}
</script>