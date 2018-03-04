import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/posts.json')
          .then(data => {
            const postsArray = [];
            for(const key in data) {
              postsArray.push({ ...data[key], id: key})
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
        return this.$axios
          .$post('/posts.json'
            + "?auth="+vuexContext.state.token, 
            createdPost)
          .then(data => {
            vuexContext.commit('addPost', { ...createdPost, id: data.name })          
          })
          .catch(error => console.log(error))        
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(process.env.baseUrl + '/posts/'
            + editedPost.id 
            + ".json"
            + "?auth="+vuexContext.state.token, 
          editedPost)
        .then( response => {
          vuexContext.commit('editPost', editedPost)
        })
        .catch( error =>  console.log(error))             
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/' + 
        (authData.isLogin ? 'verifyPassword' : 'signupNewUser') + '?key=' + process.env.fbApiKey
        return this.$axios
          .$post(authUrl, {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
            }
          )
          .then(result => {
            vuexContext.commit('setToken', result.idToken)
            localStorage.setItem('token',  result.idToken)
            const expiration = new Date().getTime() +  +result.expiresIn * 1000
            localStorage.setItem('tokenExpiration', expiration )
            Cookie.set('jwt', result.idToken);
            Cookie.set('jwtExpiration', expiration);
          })
          .catch(error => {
            console.log(error)
          })        
      },
      initAuth(vuexContext, request) {
        let token
        let tokenExpiration
        if (request) { // Server
          if (!request.headers.cookie) {
            return
          }
          const jwt = request.headers.cookie
            .split(';')
            .find( c => c.trim().startsWith("jwt=") )
          if (!jwt) {
            return
          }
          const jwtExpiration = request.headers.cookie
            .split(';')
            .find( c => c.trim().startsWith("jwtExpiration=") )
          if (!jwtExpiration) {
            return
          }
          token = jwt.split('=')[1]
          tokenExpiration = jwtExpiration.split('=')[1]
          
        } else {
          token = localStorage.getItem('token')
          tokenExpiration = localStorage.getItem('tokenExpiration')
        }
        
        if (!token || !tokenExpiration || new Date().getTime() > +tokenExpiration) {
          vuexContext.dispatch('logout')  
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('jwtExpiration')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore