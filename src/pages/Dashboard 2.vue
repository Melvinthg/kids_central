<template>
    <div id="parentView">
     
     <div id="secondgroup">
         <h1>Tom's Profile</h1>
      </div>
     
 </div>
<div class="row">
  <div class="column">
    <div class="card" @click ="select($event)">
      <h4>Injuries and health</h4><br><br>
      <!-- should be a list item here later -->
      <p>No health assessment yet</p>
      
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h4>Gradebook</h4><br><br>
      <p>No academic records yet</p>
      
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h4>Cognitive abilities</h4><br><br>
      <p>No reviews yet</p>
     
    </div>
  </div>
  
  
  
</div>
    <!-- fetch documents of forumposts from db -->
</template>

<script>
// import ForumTopBar from '@/components/ForumTopBar.vue'
export default {
    name: "Dashboard",
    components: {
    //ForumTopBar
  },
  methods : {
      
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 33.3%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 720px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

.card:hover{
     box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin: 100px;
  text-align: center;
  background-color: #FAF9F6;
  height: 400px;
  color: #36454F
}
#parentView {
    overflow: hidden;
    background-color: rgb(7, 119, 172);
    display: block;
    margin: 0%;
    padding: 5px;
    width: 100%;
    text-align: center;
}

#firstgroup {
  float: left;
  width: 25%;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  font-size: 20px;
  line-height: 80px;
}

#secondgroup {
  
    
    text-align: center;
    color: white;
    padding: 10px;
}

#thirdgroup {
    text-align: center;
  float: right;
  width: 25%;
  padding: 10px 10px;
  font-size: 20px;
  text-align: center;
  color: white;
  line-height: 80px;
}

#firstgroup:hover {
  background-color: black;
}

#thirdgroup:hover {
  background-color: black; 
}
</style>