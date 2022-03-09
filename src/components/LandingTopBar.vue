<template>
<nav>
  <ul>
  <li id = "KidsCentral"><router-link to = "/">Kids Central</router-link></li>
  <!-- need more things before i can edit the back like the if else conditions to see which page to back to-->
  <li id = "Back"><router-link to = "/empty">Back</router-link></li>
  <li id = "Logout" style="float:right"><router-link to = "/Home" ><u>Log Out</u></router-link> </li>
</ul>
</nav>
</template>

<script>
    export default {
        name: 'LandingTopBar'
    }
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: lightskyblue;
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