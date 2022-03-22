<template>
  <div class="dropdown">
  <button class="dropbtn">Registration</button>
  <div class="dropdown-content">
   <li id = "signupParent"><router-link to = "/signupparent">Register Parent</router-link></li>
    <li id = "signupTeacher"><router-link to = "/signupteacher">Register Teacher</router-link></li>
  </div>
</div>
</template>


<script>

</script>

<style scoped>
.dropbtn {
  background-color: lightskyblue;
  color: white;
  padding: 16px;
  font-size: 20px;
  border: none;
}

.dropdown {
  position: absolute;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: relative;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: black;}

</style>

