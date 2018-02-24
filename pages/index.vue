<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
  import PostList from "@/components/Posts/PostList"

  export default {
    components: {
      PostList
    },
    asyncData(context, callback) {
      setTimeout(()=> {
        callback(null, { 
          loadedPosts: [
            { id:'1' , title: 'Title 1st', previewText: 'Preview Text 1', thumbnail: 'https://images.techhive.com/images/article/2016/11/computerworld_tech_forecast_2017_hottest-tech-skills-for-2017-100692085-large.jpg' },
            { id:'2' , title: 'Title 2nd', previewText: 'Preview Text 2', thumbnail: 'http://techtrends.tech/wp-content/uploads/2017/02/tech.jpg' },
            { id:'3' , title: 'Title 3rd', previewText: 'Preview Text 3', thumbnail: 'https://www.visioncritical.com/wp-content/uploads/2015/12/tech-companies-resources-950x700.jpg' }
          ]
        });
      },1500)
    }
  }
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/main-page-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

</style>
