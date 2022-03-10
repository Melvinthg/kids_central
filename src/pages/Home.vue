<template>
  
  <LandingTopBar></LandingTopBar>
  <div id="sideBar">
    <h1>Joshua Tan</h1>
    <router-link to = "/home">Edit Class Dashboard</router-link>
    <router-link to = "/home">Manage Class Info</router-link>
    <router-link to = "/home">Class Forum</router-link>
    <router-link to = "/home">Contact Parents</router-link>
  </div>
  <WritePost></WritePost>

  <!-- feed -->
  <div>
    <h1>feed</h1>
  </div>

  <router-view></router-view>
</template>

<script>

import LandingTopBar from '@/components/LandingTopBar.vue'
import WritePost from '@/components/WritePost.vue'

export default {
  name: 'Home',
  components: {
    LandingTopBar,
    WritePost
  
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
#app {
  
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  margin-top: 60px;
  /* font-weight: bold; */
  
}
</style>
