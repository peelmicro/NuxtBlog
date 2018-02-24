<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm"

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: 'Juan',
        title: 'My awesome post',
        content: 'Super cool!',
        thumbnailLink: 'https://investorplace.com/wp-content/uploads/2017/06/techmsn4.jpg'
      }
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>


