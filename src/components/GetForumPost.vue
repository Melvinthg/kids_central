<template>
    <el-row>
        <el-col>
            <el-card
            v-for="forumpost in forumposts"
            :key="forumpost.id"
            :body-style="{ padding: '0px', width: auto}">
                <div>
                    <div style="padding: 15px">
                        <span class="poster">{{ forumpost.id }}</span>
                        <time class="time">{{ forumpost.date }}</time>  
                    </div>     
                    <el-divider/>
                    <img v-bind:src="forumpost.imageUrl" class="image">
                    
                    <div class="title">
                        <span>{{ forumpost.title }}</span>  
                    </div>

                    <div class="text">
                        <p style="white-space: pre-line">{{ forumpost.text }}</p>  
                    </div>
                </div>
              
                <router-link to = "/forumreply" class="replies" style="float:right">{{ numReplies }} Replies</router-link>
                <!-- <GetForumReplies fpost="wphiPcPtMS1SjoRSxkBb" /> -->
            </el-card>
            
        </el-col>
    </el-row>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
// import GetForumReplies from '@/components/GetForumReplies.vue'
export default {
  name: "GetForumPost",
  // components: {
  //   GetForumReplies
  // },
  data() {
    return {
      forumposts: [],
      imgsrc: null,
      numReplies: 0,
    };
  },
  methods: {
      ...mapActions({getForumPosts: "getForumPosts"}),
      ...mapActions({getReplies: "getReplies"}),
      ...mapActions({getChildClass: "getChildClass"}),
      
      async display(){
        if (this.$store.state.userModel.type == "teacher"){
          this.forumposts = await this.getForumPosts(this.$store.state.userModel.teacherClass)        
        } else if (this.$store.state.userModel.type == "parent"){
          const pEmail = this.$store.state.userModel.email  
          var childClass = await this.getChildClass(pEmail);
          this.forumposts = await this.getForumPosts(childClass)
        }
        var replieslist = await this.getReplies("HaFu0bTnZmB8PPLW1XXf");
        this.numReplies = replieslist.length
      },
  },
  created: function() {
    this.display();
  },
};
</script>

<style>
.poster {
    float: left;
    font-size: 20px;
    font-weight: bold;
}
.time {
  font-size: 13px;
  color: #999;
  float: right;
}
.title {
  margin-top: 0px;
  margin-left: 250px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight:600;
}
.text {
  margin-top: 0px;
  margin-left: 250px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  
}
.image {
  height: 150px;
  width: 200px;
  display: block;
  float: left;
  margin-left: 2%;
  margin-bottom: 2%;
}
.replies {
    float: right;
    margin-right: 2%;
    text-decoration: none;
    color: black;
}
.replies:hover {
    color: grey;
}
</style>