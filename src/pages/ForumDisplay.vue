<template>
  <div>
    <div class="forumtopbar">
      <ForumTopBar :className = value></ForumTopBar>
    </div>

    <div style="margin: 20px" >
      <h1 style="margin: 1%">Discussion Threads</h1>
    
      <span style="margin-left: 1%">Select Class: </span>
      <el-select
        v-model="value"
        placeholder="Choose class"
        style="width: 175px; margin-right: 10px"
      >
        <el-option
          @click="display"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <br />
    <div v-if="boo">
      <el-card
        v-for="forumpost in forumposts"
        :key="forumpost.id"
        style="margin:10px 10px 10px 10px"
        :body-style="{ padding: '0px', width: auto }"
      >
        <GetForumPost :forumpost="forumpost" />
      </el-card>
    </div>
  </div>
  
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { useStore, mapActions, mapState } from "vuex";
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
import { getDocs, doc, collection } from "firebase/firestore";
import ForumTopBar from "@/components/ForumTopBar.vue";
import GetForumPost from "@/components/GetForumPost.vue";
import { ref } from 'vue'
export default {
  name: "ForumDisplay",
  components: {
    ForumTopBar,
    GetForumPost,
  },
  data() {
    return {
      forumposts: [],
      imgsrc: null,
      options: [],
      boo: false,
      classBoo: false,
      value: ref('')
    };
  },
  methods: {
    ...mapActions({
      getReplies: "getReplies",
      getChildClass: "getChildClass",
      getForumPosts: "getForumPosts",
      getChildClasses: "getChildClasses",
    }),
    test() {},

    async display() {
      // if (this.$store.state.userModel.type == "teacher"){
      //   this.forumposts = await this.getForumPosts(this.$store.state.userModel.teacherClass)
      // } else if (this.$store.state.userModel.type == "parent"){
      //   const pEmail = this.$store.state.userModel.email
      //   var childClass = await this.getChildClass(pEmail);
      //   this.forumposts = await this.getForumPosts(childClass)
      //   console.log(await this.getChildClasses(pEmail))
      // }
      this.classBoo = false;
      let className = this.value;
    //   console.log(className);

      this.boo = true;
      this.classBoo = true;
      this.forumposts = (await this.getForumPosts(className));
    },

    async getOptions() {
      if (this.$store.state.userModel.type == "parent") {
        const pEmail = this.$store.state.userModel.email;
        let value = await this.getChildClasses(pEmail);
        value.forEach((d) => {
          this.options.push({
            value: d,
            label: d,
          });
        });
      } else if (this.$store.state.userModel.type == "teacher") {
        this.options.push({
          value: this.$store.state.userModel.teacherClass,
          label: this.$store.state.userModel.teacherClass,
        });
      }
    },
  },

  created() {
    // this.display();
    this.getOptions();
    this.display()
  },
};
</script>

<style>
</style>
