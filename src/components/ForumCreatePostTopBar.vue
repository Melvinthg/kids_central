<template>
 <div id="wholegroup">
     <div id="firstgroup">
        <router-link to = "/forumdisplay" className='text-link' style='color:white'>Back</router-link>
     </div>
     <div id="secondgroup">
         <h1>CLASS K FORUM</h1><br>
         <!-- query number of parents in the class -->
         <h4>25 members</h4>
     </div>
     <!-- <div id="thirdgroup">
         
     </div> -->
 </div>
</template>

<script>

</script>

<style scoped>

#wholegroup {
    overflow: hidden;
    background-color: rgb(7, 119, 172);
    display: block;
    margin: 0%;
    padding: 5px;
    width: 100%;
}

#firstgroup {
  float: left;
  width: 25%;
  color: white;
  text-align: center;
  padding: 20px 20px;
  text-decoration: none;
  font-size: 20px;
  line-height:100px;
}

#secondgroup {
    float: left;
    width: 50%;
    text-align: center;
    color: white;
    padding: 10px;
}

/* #thirdgroup {
  float: right;
  width: 25%;
  padding: 10px 10px;
  font-size: 20px;
  text-align: center;
  color: white;
  line-height: 80px;
} */

#firstgroup:hover {
  background-color: black;
}

#thirdgroup:hover {
  background-color: black; 
}

</style>