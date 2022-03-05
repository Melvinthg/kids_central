<template>
  
  <LandingTopBar></LandingTopBar>
  <img alt="Vue logo" src="@/assets/logo.png">
  
  
  
</template>

<script>

import LandingTopBar from '@/components/LandingTopBar.vue'


export default {
  name: 'App',
  components: {
    LandingTopBar,
  
    
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
