<template>
  <div class="comment__modal">
    <div class="modal fade" :id="'exampleModal'+id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <CommentDropDown v-model="modalData.rating" />
              </div>
              <div class="mb-3">
                <label class="col-form-label">Message:</label>
                <textarea v-model="modalData.text" v-text="fullText" resize="none" class="form-control"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="modifyComment" type="button" class="btn btn-primary">Send message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentService from "@/services/comment.service";
import CommentDropDown from "@/components/CommentDropDown";

export default {
  name: "CommentModal",
  components: {
    CommentDropDown
  },
  props: [
      'fullText',
      'rating',
      'id'
  ],
  data() {
    return {
      modalData: {
        text: this.fullText,
        rating: this.rating
      }
    }
  },
  methods: {
    modifyComment() {
      if (this.modalData.text !== this.fullText){
        CommentService.updateComment(this.id, this.modalData)
            .then(
                response => {
                  console.log(response.data)
                }
            )
      } else {
        alert('Измените комментарий')
      }
    }
  }
}
</script>

<style scoped>

</style>