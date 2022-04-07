<template>
  <el-container style="height: calc(100vh - 54.5px)">
    <el-aside width="200px" style="background-color: cornflowerblue">
      <br />

      <header style="text-align:center; size=18px; color: white;">
        <strong> {{ username }} </strong>
      </header>

      <br />
      <el-menu
        text-color="#fff"
        active-text-color="steelblue"
        background-color="cornflowerblue"
      >
        <el-menu-item
          v-if="this.homeType === 'teacher'"
          index="1"
          @click="this.$router.push('/editclassdashboard')"
        >
          <el-icon><Edit /></el-icon>
          <span> Edit Class Dashboard</span>
        </el-menu-item>

        <el-menu-item
          v-if="this.homeType === 'parent'"
          index="1a"
          @click="this.$router.push('/Dashboard/child')"
        >
          <el-icon><Edit /></el-icon>
          <span>View Child Dashboard</span>
        </el-menu-item>

        <el-menu-item
          v-if="this.homeType == 'teacher'"
          index="2"
          @click="this.$router.push('/ClassInfo')"
        >
          <el-icon><Notebook /></el-icon>
          <span>Manage Class Info</span>
        </el-menu-item>

        <el-menu-item
          v-if="this.homeType === 'parent'"
          index="2a"
          @click="this.$router.push('/ChildrenInfo')"
        >
          <el-icon><Notebook /></el-icon>
          <span> View Child Info</span>
        </el-menu-item>

        <el-menu-item
          v-if="this.homeType === 'parent' || this.homeType === 'teacher'"
          index="3"
          @click="this.$router.push('/forumdisplay')"
        >
          <el-icon><ChatLineSquare /></el-icon>
          <span> Class Forum </span>
        </el-menu-item>

        <el-menu-item
          v-if="this.homeType == 'teacher'"
          @click="this.$router.push('/contactparent')"
          index="4"
        >
          <el-icon><Cellphone /></el-icon>
          <span> Contact Parents</span>
        </el-menu-item>

        <el-menu-item
          v-if="this.homeType === 'parent'"
          index="4a"
          @click="this.$router.push('/contactteacher')"
        >
          <el-icon><Cellphone /></el-icon>
          <span> Contact Teacher </span>
        </el-menu-item>

        <!-- <el-menu-item
              v-if="this.homeType != 'teacher'"
              @click="this.$router.push('/HealthAndInjuries')"
            >
              <el-icon><Edit /></el-icon>
              <span> Health And Injuries</span>
            </el-menu-item> -->

        <!-- <el-menu-item
              v-if="this.homeType != 'teacher'"
              @click="this.$router.push('/CognitiveAbilities')"
            >
              <el-icon><Edit /></el-icon>
              <span> CognitiveAbilities</span>
            </el-menu-item> -->
      </el-menu>
    </el-aside>
    <el-main class="main">
      <div v-if="this.homeType == 'teacher'">
        <WritePost />
        <el-divider />
      </div>
      <div class="feed">
        <GetPost />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import WritePost from "@/components/WritePost.vue";
import GetPost from "@/components/GetPost.vue";

import {
  Edit,
  Notebook,
  ChatLineSquare,
  Cellphone,
} from "@element-plus/icons-vue";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "Home",
  data() {
    return {
      count: 0,
      homeType: "",
      username: "",
    };
  },
  components: {
    WritePost,
    Edit,
    Notebook,
    ChatLineSquare,
    Cellphone,
    GetPost,
  },
  created() {
    const userRef = doc(db, "users", this.$store.state.user.uid);
    getDoc(userRef).then((user) => {
      this.homeType = user.data().type;
      this.username = user.data().first + " " + user.data().last;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
.sidebarLinks {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-decoration: none;
}
.main {
  background-color: #f0f2f5;
}
.feed {
  width: 100%;
  text-align: center;
}
</style>
