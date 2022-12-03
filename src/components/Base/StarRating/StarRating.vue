<template>
  <div class="star-rating">
    <div class="position__wrapper">
      <div class="star-rating__wrapper">
        <div class="star-rating__items">
          <StarRatingItem
              v-for="(index) in rating"
              :key="index"
          />
        </div>
      </div>
      <div class="star-rating__wrapper">
        <div class="star-rating__items star-rating__items_none">
          <StarRatingItem
              v-for="(index) in 5"
              :key="index"
              :type="'none'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRatingItem from './StarRatingItem'

export default {
  name: "StarRating",
  components:{
    StarRatingItem
  },
  props:{
    rating: Number
  }
}
</script>

<style lang="scss">
  .star-rating{
    width: 175px;
    height: 34px;
    .position__wrapper{
      position: relative;
      .star-rating__wrapper{
        position: absolute;
        top: 0;
        .star-rating__items{

        }
        .star-rating__items_none{

        }
      }

    }
    .star-rating__item{
      display: inline-block;
      margin-right: 5px;
      .star{
        height: 30px;
      }
    }

  }
  @media (max-width: 426px) {
    .star-rating{
      width: 100px;
      .star-rating__item{
        .star{
          height: 15px;
        }
      }
    }
  }
  @media (max-width: 376px) {
    .star-rating{
      width: 94px;
      .star-rating__item{
        .star{
          height: 13px;
        }
      }
    }
  }

</style>
