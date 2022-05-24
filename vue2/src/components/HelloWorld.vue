/* eslint-disable */
<template>
  <div class="hello">
    <div class="poster">
      <h1>Post!</h1>
      <p>User id: <input v-model="post.userId"></p>
      <p>Title: <input v-model="post.title"></p>
      <p>Content: <input v-model="post.description"></p>
      <button v-on:click="post">POST</button>
    </div>

   <div class="posts"> 
      <section v-for="post in posts" :key="post.id" class="post">
        <p><strong>{{ users[post.userId] }}</strong></p>
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <button v-on:click="toggleLike(post.id)" v-on:hover="hoverLike(post.id)" class="like-area">
          <i v-if="likes[post.id]===0" class="fa-solid fa-heart" style="color:white"></i>
          <i v-if="likes[post.id]===2" class="fa-solid fa-heart" style="color:red"></i>
        </button>
      </section>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      posts: {},
      post: {
        userId: 0,
        title: "Titl",
        description: "description"
      },
      users: {},
      likes: []
    }
  },
  beforeMount () {
    this.getPosts();
    this.getUsers();
  },
  updated () {
    console.log('updated');

  },
  methods: {
    getPosts () {
      axios.get('https://jsonplaceholder.typicode.com/posts/').then(response => {
        this.posts = response.data,
        // create likes array
        this.likes = Array.from({length: this.posts.length}, (_, i) => 0)
      }).catch(e => console.log(e))
    },
    postPost () {
      axios.post('https://jsonplaceholder.typicode.com/posts/', {
        title: this.post.title,
        body: this.post.description,
        userId: this.post.userId,})
        .then(response => {console.log("POSTED", response.data)}).catch(e => {console.log(e)})
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
    toggleLike(id) {

      if (this.likes[id] === 0) {
        console.log(id)
        this.likes[id] = 2
        this.likes = [...this.likes]
      } else {
        this.likes[id] = 0
        this.likes = [...this.likes]

      }
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

div.posts{
  background: #b6cfc8;
}
section.post{
  background: #939a98;
}



</style>
