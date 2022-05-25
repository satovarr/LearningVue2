// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import './store'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    posts: {},
  },
  mutations: {
    savePosts(state, posts) {
      state.posts = posts
      // create likes array
      for (let post in state.posts) {
        state.posts[post]["like"] = false
      }
    },
    newPost(state, post) {
      post.id = state.posts.length + 1
      post.like = false
      state.posts[post.id-1] = post
      console.log(state.posts[post.id - 1].id)      
    },
    toggleLike(state, id) {
      state.posts[id - 1].like = !state.posts[id - 1].like
      console.log(state.posts[id - 1].like)
    }
  },
  actions: {

  },
  getters: {

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
