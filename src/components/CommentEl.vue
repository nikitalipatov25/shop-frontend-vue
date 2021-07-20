<template>
  <div class="comment-el col-12">
    <div class="comment">
      <div class="comment__head">
        <div class="user-name">
          NewUser
        </div>
        <div class="date">
          20.07.2021
        </div>
        <div class="rating">
          9 из 10
        </div>
      </div>
      <div class="comment__body">
        <div class="text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex explicabo fuga iste, laborum minima molestiae nesciunt nihil officiis porro praesentium, quod sed, vel veniam voluptate voluptatibus. Illum maxime pariatur vitae?
        </div>
        <div class="text-extension">
          Показать/скрыть
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "CommentEl"
}
</script>

<style scoped>
  .comment{
    margin-top: 30px;
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
</style>