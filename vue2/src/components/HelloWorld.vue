<template>
  <div class="hello">
    <div class="poster">
      <h1>Post!</h1>
      <p>User id: <input v-model="post.userId"></p>
      <p>Title: <input v-model="post.title"></p>
      <p>Content: <input v-model="post.description"></p>
      <button v-on:click="postPost">POST</button>
    </div>

   <div class="posts"> 
      <section v-for="post in this.$store.state.posts" :key="post.id" class="post">
        <p><strong>{{ users[post.userId] }}</strong></p>
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <button v-on:click="toggleLike(post)" class="like-area">
          <i v-if="!post.like" class="fa-solid fa-heart" style="color:white"></i>
          <i v-if="post.like " class="fa-solid fa-heart" style="color:red"></i>
        </button>
      </section>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      posts: {},
      post: {
        userId: 1,
        title: "Title",
        description: "description"
      },
      users: {},
      likes: [1,2,3]
    }
  },
  beforeMount () {
    this.getPosts();
    this.getUsers();
  },
  updated () {
    console.log("updated");

  },
  methods: {
    getPosts () {
      axios.get('https://jsonplaceholder.typicode.com/posts/').then(response => {
        this.$store.commit('savePosts', response.data)
      }).catch(e => console.log(e))
    },
    postPost () {
      axios.post('https://jsonplaceholder.typicode.com/posts/', {
        title: this.post.title,
        body: this.post.description,
        userId: this.post.userId})
        .then(response => {
          this.$store.commit('newPost', response.data)
          }).catch(e => {console.log(e)})
    },
    getUsers() {
      axios.get('https://jsonplaceholder.typicode.com/users/').then(response => {
        // pair userID and username values on this.users
        for (let user in response.data) {
          this.users[response.data[user].id] = response.data[user].username
        }   
        console.log(this.users)
      }).catch(e => console.log(e))
    },
    toggleLike(post) {
        this.$store.commit('toggleLike', post.id)
        post.id = post.id+100
        post.id = post.id-100
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
