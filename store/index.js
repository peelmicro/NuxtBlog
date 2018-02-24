import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(()=> {
            vuexContext.commit('setPosts',
              [
                { id:'1' , title: 'Title 1st', previewText: 'Preview Text 1st', thumbnail: 'https://images.techhive.com/images/article/2016/11/computerworld_tech_forecast_2017_hottest-tech-skills-for-2017-100692085-large.jpg' },
                { id:'2' , title: 'Title 2nd', previewText: 'Preview Text 2nd', thumbnail: 'http://techtrends.tech/wp-content/uploads/2017/02/tech.jpg' },
                { id:'3' , title: 'Title 3rd', previewText: 'Preview Text 3rd', thumbnail: 'https://www.visioncritical.com/wp-content/uploads/2015/12/tech-companies-resources-950x700.jpg' }
              ]
            )
          resolve()
          },1500)
        })        
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