import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-b3292.firebaseio.com/posts.json')
          .then(response => {
            const postsArray = [];
            for(const key in response.data) {
              postsArray.push({ ...response.data[key], id: key})
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch( error => context.error(error))
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post, 
          updatedDate: new Date() 
        }
        return axios
          .post('https://nuxt-blog-b3292.firebaseio.com/posts.json', createdPost)
          .then(result => {
            vuexContext.commit('addPost', { ...createdPost, id: result.data.name })          
          })
          .catch(error => context.error(error))        
      },
      editPost(vuexContext, editedPost) {
        return axios.put('https://nuxt-blog-b3292.firebaseio.com/posts/'
          + editedPost.id 
          + ".json", 
        editedPost)
        .then( response => {
          vuexContext.commit('editPost', editedPost)
        })
        .catch( error => context.error(error))             
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore