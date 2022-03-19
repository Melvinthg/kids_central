<template>

 <div id="wholegroup">
     <div id="firstgroup">
        <router-link to = "/home" className='text-link'>Back</router-link>
     </div>
     <div id="secondgroup">
         <h1>Children info page</h1><br>
     </div>
 </div>

 <div> <AccessInfo/> </div>
</template>

<script>
import AccessInfo from "../components/AccessInfo.vue"

export default {
  name: "ChildrenInfo",
  components: {
    AccessInfo
  }
}
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
  padding: 10px 10px;
  text-decoration: none;
  font-size: 20px;
  line-height: 80px;
}

#secondgroup {
    float: left;
    width: 50%;
    text-align: center;
    color: white;
    padding: 20px;
}

#firstgroup:hover {
  background-color: black;
}

</style>