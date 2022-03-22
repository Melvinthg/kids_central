<template>
  <div class="common-layout" style="background-color:">
    <el-container>
      <el-container>
        <el-aside width="200px" style="background-color: cornflowerblue">
          <br>
          <header style="text-align:center; size=18px">Tammy Yuen</header>
          <br>
          <el-menu active-text-color=steelblue background-color=dodgerblue textcolor=white>
          <el-menu-item index="1">
            <span><router-link to = "/home" className="sidebarLinks">Edit Class Dashboard</router-link></span>
          </el-menu-item>
          <el-menu-item index="2">
            <span><router-link to ="/home" className="sidebarLinks">Manage Class Info</router-link></span>
          </el-menu-item>
          <el-menu-item index="3">
            <span><router-link to = "/forumdisplay" className="sidebarLinks">Class Forum</router-link></span>
          </el-menu-item>
          <el-menu-item index="4">
            <span><router-link to = "/home" className="sidebarLinks">Contact Parents</router-link></span>
          </el-menu-item>
          </el-menu>        
      </el-aside>
    <el-main>
      <div class ="writepost">
        <WritePost></WritePost>
      </div>
      <br><br>
      <div class="feed">
    
        <h1>feed</h1>
      </div>
      </el-main>
    </el-container>
    </el-container>
    
  </div>
  <router-view></router-view>
</template>

<script>


import WritePost from '@/components/WritePost.vue'
//import {Location,Document,Menu as IconMenu,Setting} from '@element-plus/icons-vue'

// import firebaseApp from "../firebase.js";
// import { getFirestore } from "firebase/firestore";
// import { doc } from "firebase/firestore";
// const db = getFirestore(firebaseApp);

export default {
  name: 'Home',
  components: {
    
    WritePost
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.sidebarLinks {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-decoration: none;

}

.content {
  position: fixed;
  margin-left: 30%;
}
.writepost {
  padding: 10px;
  width: auto;
  height: auto;
  background: #eeeeee;
}

.feed {
  margin-left: 25%;
  width: fit-content;
  height:100%;
  background: #eeeeee;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;
}
</style>
