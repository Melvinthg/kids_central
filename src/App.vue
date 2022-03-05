<template>
<div >
        <router-link to = "/">Home</router-link> | 
         <router-link to = "/login">Login</router-link> | 
          <router-link to = "/signup">Sign up</router-link> 
    </div>
    
   <router-view></router-view>
  
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>

</style>
