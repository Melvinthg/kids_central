<template>
<nav>
  <ul>
  <li id = "KidsCentral"><router-link to = "/">Kids Central</router-link></li>
  <!-- <li id = "KidsCentral">
    <button >Kids Central</button>
    </li> -->
  <!-- need more things before i can edit the back like the if else conditions to see which page to back to-->
  <li id = "login"><router-link to = "/login">Login</router-link></li>
   <li id = "signup"><router-link to = "/signup">Register</router-link></li>
  <!-- <li v-if= "$store.state.user"
  id = "Logout" style="float:right"><router-link to = "/" v-slot = "$store.dispatch('logout')" ><u>Log Out</u></router-link> </li> -->

  <button  v-if= "$store.state.user" @click = "$store.dispatch('logout')" id = "logout" >Log out</button> 
  
</ul>
</nav>
</template>

<script>
import { useStore } from "vuex";
import {onBeforeMount} from "vue"
    export default {
        name: 'LandingTopBar',
        setup() {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch("fetchUser")
    })
  }
    }
</script>

<style scoped>
nav {margin: 0;
 padding: 0; }
ul {
  margin: 0;
 padding: 0;
  overflow: hidden;
  background-color: lightskyblue;
  list-style-type: none;
  
 
}

#logout {
  background-color: lightskyblue;
  border: none;
  padding: 16px 16px;
  font-size: 20px;
  float: right;
  /*optional*/
  
  
  color:  white;
  
  
}

#logout:hover {
  background-color: black;
  
}


li {
  
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: black;
}

.active {
  background-color: lightblue;
}
</style>