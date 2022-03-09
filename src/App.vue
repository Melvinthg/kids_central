<template>
<LandingTopBar/>
<div v-if = "$store.state.user">  
  <router-link to = "/Home" >Home</router-link> 
  <h1>Home [testing for git]</h1>
<button @click = "$store.dispatch('logout')">Log out</button> 
        
          
    </div >
    <div v-else> 
        <router-link to = "/">Landing</router-link> | 
         <router-link to = "/login">Login</router-link> | 
          <router-link to = "/signup">Sign up</router-link> 
          
    </div>
    <div></div>
    
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

</style>
