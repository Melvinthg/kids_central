<template>
<LandingTopBar/>
<!-- <div v-if = "$store.state.user">  
  <router-link to = "/Home" >Home</router-link> 
  
<button @click = "$store.dispatch('logout')">Log out</button> 
        
          
    </div >
    <div v-else> 
        <router-link to = "/">Landing</router-link> | 
         <router-link to = "/login">Login</router-link> | 
          <router-link to = "/signup">Sign up</router-link> 
          
    </div>
    <div></div> -->
    
   <router-view></router-view>
  
</template>

<script>
import {onBeforeMount} from "vue"
import { useStore} from "vuex"

export default {
  name: 'App',
  components: {
    
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch("fetchUser")
    })
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;}

  #app {
 
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
 
  /* font-weight: bold; */ 
}
</style>
