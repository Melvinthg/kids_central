<template>
<LandingTopBar/>
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
  box-sizing: border-box;
  font-family: Inter;
  }

  #app {
 
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
 
  /* font-weight: bold; */ 
}
</style>
