<template>
  <div class="common-layout" style="background-color: ">
    <el-container>
      <el-container>
        <el-aside width="200px" style="background-color: cornflowerblue">
          <br />
          <header style="text-align:center; size=18px">{{user.email}}</header>
          <br />
          <el-menu
            active-text-color="steelblue"
            background-color="dodgerblue"
            textcolor="white"
          >
            <el-menu-item index="1">
              <el-icon><Edit /></el-icon>
              <span
                ><router-link to="/editclassdashboard" className="sidebarLinks"
                  >Edit Class Dashboard</router-link
                ></span
              >
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><Notebook /></el-icon>
              <span
                ><router-link to="/home" className="sidebarLinks"
                  >Manage Class Info</router-link
                ></span
              >
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><ChatLineSquare /></el-icon>
              <span
                ><router-link to="/forumdisplay" className="sidebarLinks"
                  >Class Forum</router-link
                ></span
              >
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><Cellphone /></el-icon>
              <span
                ><router-link to="/contactparent" className="sidebarLinks"
                  >Contact Parents</router-link
                ></span
              >
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="writepost">
            <WritePost></WritePost>
          </div>
          <br /><br />
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

import LandingTopBar from '@/components/LandingTopBar.vue'
import WritePost from '@/components/WritePost.vue'

// import firebaseApp from "../firebase.js";
// import { getFirestore } from "firebase/firestore";
// import { doc } from "firebase/firestore";
// const db = getFirestore(firebaseApp);

export default {
  name: 'Home',
  components: {
    LandingTopBar,
    WritePost
  },
  // methods: {
    


  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
#app {
  
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
  margin-top: 60px;
  /* font-weight: bold; */ 
}

.sidebar {
  position: fixed;
  width:fit-content;
  height: 100%;
  background: #2470b7;
  text-align: centre;
  color: white;
  float: left;
  line-height:40px;
  padding-left: 25px;
  padding-right: 25px
 
}
.sidebar header {
  font-size: 24px;
  color: white;
  background: #2470b7;
}

.text-link {
  color: white;
  text-decoration: none;

}

.text-link:hover{
  padding-left: 5px;
}

.content {
  position: fixed;
  margin-left: 30%;
}
.writepost {
  margin-left: 25%;
  width:100%;
  height: 100px;
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
