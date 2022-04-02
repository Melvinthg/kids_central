
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
            active-text-color="steelblue"
            background-color="dodgerblue"
            textcolor="white"
          >
            <el-menu-item v-if="this.homeType === 'teacher'" index="1">
              <el-icon><Edit /></el-icon>
              <span
                ><router-link to="/editclassdashboard" className="sidebarLinks"
                  >Edit Class Dashboard</router-link
                ></span
              >
            </el-menu-item>

            <el-menu-item v-else index="1a">
              <el-icon><Edit /></el-icon>
              <span
                ><router-link to="/Dashboard" className="sidebarLinks"
                  >View Child Dashboard</router-link
                ></span
              >
            </el-menu-item>

            <el-menu-item v-if="this.homeType == 'teacher'" index="2">
              <el-icon><Notebook /></el-icon>
              <span
                ><router-link to="/ClassInfo" className="sidebarLinks"
                  >Manage Class Info</router-link
                ></span
              >
            </el-menu-item>

            <el-menu-item v-else index="2a">
              <el-icon><Notebook /></el-icon>
              <span
                ><router-link to="/ChildrenInfo" className="sidebarLinks"
                  >View Child Info</router-link
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

            <el-menu-item v-if="this.homeType === 'teacher'" index="4">
              <el-icon><Cellphone /></el-icon>
              <span
                ><router-link to="/contactparent" className="sidebarLinks"
                  >Contact Parents</router-link
                ></span
              >
            </el-menu-item>

            <el-menu-item v-else index="4a">
              <el-icon><Cellphone /></el-icon>
              <span
                ><router-link to="/contactteacher" className="sidebarLinks"
                  >Contact Teacher</router-link
                ></span
              >
            </el-menu-item>

            <el-menu-item v-if="this.homeType != 'teacher'">
              <el-icon><Edit /></el-icon>
              <span
                ><router-link to="/HealthAndInjuries" className="sidebarLinks"
                  >Health And Injuries</router-link
                ></span
              >
            </el-menu-item>

            <el-menu-item v-if="this.homeType != 'teacher'">
              <el-icon><Edit /></el-icon>
              <span
                ><router-link to="/CognitiveAbilities" className="sidebarLinks"
                  >CognitiveAbilities</router-link
                ></span
              >
            </el-menu-item>
            <router-link to="/GradesDisplayParent" className="sidebarLinks"
              >GradesDisplayParent</router-link
            >
            <br />
            <router-link to="/GradesDisplayTeacher" className="sidebarLinks"
              >GradesDisplayTeacher</router-link
            >
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
