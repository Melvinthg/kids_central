<template>
  <!-- <button @click = "test1">asdasd</button> -->
  <div class="common-layout" style="background-color: ">
    <el-container>
      <el-container>
        <el-aside width="200px" style="background-color: cornflowerblue">
          <br />

          <header style="text-align:center; size=18px">
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
              <span> Edit Class Dashboard ></span>
            </el-menu-item>

            <el-menu-item
              v-else
              index="1a"
              @click="this.$router.push('/editclassdashboard')"
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
              <span> >Manage Class Info</span>
            </el-menu-item>

            <el-menu-item
              v-else
              index="2a"
              @click="this.$router.push('/ChildrenInfo')"
            >
              <el-icon><Notebook /></el-icon>
              <span> View Child Info</span>
            </el-menu-item>

            <el-menu-item index="3" @click="this.$router.push('/forumdisplay')">
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
              v-else
              index="4a"
              @click="this.$router.push('/contactteacher')"
            >
              <el-icon><Cellphone /></el-icon>
              <span> Contact Teacher </span>
            </el-menu-item>

            <el-menu-item
              v-if="this.homeType != 'teacher'"
              @click="this.$router.push('/HealthAndInjuries')"
            >
              <el-icon><Edit /></el-icon>
              <span> Health And Injuries</span>
            </el-menu-item>

            <el-menu-item
              v-if="this.homeType != 'teacher'"
              @click="this.$router.push('/CognitiveAbilities')"
            >
              <el-icon><Edit /></el-icon>
              <span> CognitiveAbilities</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div v-if="this.homeType == 'teacher'" class="writepost">
            <WritePost></WritePost>
          </div>
          <br /><br />
          <div class="feed">
            <h1>feed</h1>
            <GetPost></GetPost>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import WritePost from "@/components/WritePost.vue";
import GetPost from "@/components/GetPost.vue";
import { store } from "@/store";

import {
  Edit,
  Notebook,
  ChatLineSquare,
  Cellphone,
} from "@element-plus/icons-vue";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.js";
import { mapGetters } from "vuex";
import { doc, getDoc } from "firebase/firestore";
const auth = getAuth();

export default {
  name: "Home",
  data() {
    return {
      user: auth.currentUser,
      count: 0,
      username: "",
      homeType: "",
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

  async mounted() {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const user = await getDoc(userRef);
    this.homeType = user.data().type;
    this.username = user.data().first + " " + user.data().last;
  },

  // created(){
  //   this.test()
  //   console.log("beforeMount")
  // },
  // beforeMount(){
  //   this.test()
  //   console.log("beforeMount")
  // },

  //  mounted() {
  //   this.reload()
  // },
  // mounted:  function () {
  //   (this.homeType = this.$store.state.userModel.type),
  //     console.log(this.homeType);
  // },
  methods: {
    // test(){
    //   this.homeType = this.$store.getters.getType;
    // },
    // test1(){
    //   console.log(this.$store.state.userModel.type)
    // }
    // ,reload(){
    //   if (this.count > 0) {
    //     this.$forceUpdate()
    //     this.count++
    //   }
    // }
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
.text-link:hover {
  padding-left: 5px;
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
  height: 100%;
  background: #eeeeee;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;
}
</style>
