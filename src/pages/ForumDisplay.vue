<template>
    <div>
        <div class ="forumtopbar">
            <ForumTopBar></ForumTopBar>
        </div>

        <div>
            <h1 style="margin-left:1%">Discussion Threads</h1>
        </div> <br>
        <el-card
            v-for="forumpost in forumposts"
            :key="forumpost.id"
            :body-style="{ padding: '0px', width: auto}">
            <GetForumPost :forumpost = "forumpost"/>
        </el-card>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
import { getDocs, doc, collection } from "firebase/firestore";
import ForumTopBar from '@/components/ForumTopBar.vue'
import GetForumPost from '@/components/GetForumPost.vue'
export default {
    name: "ForumDisplay",
    components: {
        ForumTopBar,
        GetForumPost
    },
    data() {
        return {
        forumposts: [],
        imgsrc: null,
        };
    },
    methods: {
      ...mapActions({getReplies: "getReplies",getChildClass: "getChildClass", getForumPosts: "getForumPosts"}),
     
      

      async display(){
        if (this.$store.state.userModel.type == "teacher"){
          this.forumposts = await this.getForumPosts(this.$store.state.userModel.teacherClass)        
        } else if (this.$store.state.userModel.type == "parent"){
          const pEmail = this.$store.state.userModel.email  
          var childClass = await this.getChildClass(pEmail);
          this.forumposts = await this.getForumPosts(childClass)
        }
      },
    },
    created: function() {
        this.display();
    },
}
</script>

<style>
</style>