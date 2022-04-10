<template>
  <el-row>
    <el-col>
      <el-card>
        <!-- forum thread  -->
        <el-card
          v-for="forumpost in forumposts"
          :key="forumpost.id"
          :body-style="{ padding: '0px', width: auto }"
        >
          <GetForumPost :forumpost="forumpost" />
        </el-card>

        <!-- current replies to that forum thread -->
        <hr />
        <el-card
          id="replyCard"
          v-for="reply in replies"
          :key="reply.id"
          :body-style="{ padding: '5px', width: auto }"
        >
          <div>
            <div style="padding: 15px; padding-bottom: 0px;">
              <span class="replier">{{ reply.replier }}</span>
              <time class="time">{{ reply.date }}</time>
            </div>
            <el-divider />

            <div class="repliedcontent">
              <span>{{ reply.replycontent }}</span>
            </div>
          </div> </el-card
        ><br />

        <!-- reply box with user's name and textbox -->

        <div style="padding: 0px">
          <h2 class="replier">{{ replier }}</h2>
        </div>
        <el-divider />
        <div id="replyCol">
          <textarea
            id="text"
            v-model="replycontent"
            placeholder="Type your reply here..."
          >
          </textarea>
          <!-- <button @click="this.create()" id="replyButton">Reply</button> -->
          <el-button id="replyButton" type="primary" @click="this.create()"
            >Reply</el-button
          >
        </div>
        <br />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { collection, getDoc, doc } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
// eslint-disable-next-line no-unused-vars
import { useStore, mapActions, mapState } from "vuex";
import GetForumPost from "@/components/GetForumPost.vue";
export default {
  name: "GetForumReplies",
  components: {
    GetForumPost,
  },
  data() {
    return {
      replycontent: "",
      replier:
        this.$store.state.userModel.first +
        " " +
        this.$store.state.userModel.last,
      forumposts: [],
      replies: [],
      fpid: "",
      title: this.$route.params.title,
    };
  },
  // props: {
  //     fpid: String,
  // },
  methods: {
    ...mapActions({
      createReply: "createReply",
      getReplies: "getReplies",
      getChildClass: "getChildClass",
      getForumPosts: "getForumPosts",
    }),

    //create the reply document to store in firebase
    async create() {
      const details = {
        replycontent: this.replycontent,
        time: new Date().toString().slice(4, 21),
        uid: auth.currentUser.uid,
        fpid: this.fpid,
        replier:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
      };
      await this.createReply(details);
      this.replies = await this.getReplies(this.fpid);
      this.replycontent="";
    },
    async display() {
      if (this.$store.state.userModel.type == "teacher") {
        this.forumposts = await this.getForumPosts(
          this.$store.state.userModel.teacherClass,
        );
        var s = this.title;
        this.forumposts = this.forumposts.filter(function (post) {
          return post.title == s;
        });
      } else if (this.$store.state.userModel.type == "parent") {
        const pEmail = this.$store.state.userModel.email;
        var childClass = await this.getChildClass(pEmail);
        this.forumposts = await this.getForumPosts(childClass);
        var t = this.title;
        this.forumposts = this.forumposts.filter(function (post) {
          return post.title == t;
        });
      }
    },
  },
  async mounted() {
    this.fpid = this.$route.params.fpid;
    this.replies = await this.getReplies(this.fpid);
  },

  created: function () {
    this.display();
  },
};
</script>

<style>
#replyCard {
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid lightskyblue;
}
#text {
  margin-left: 0px;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

#text:focus {
  outline: none;
  border: 1.8px solid rgb(7, 119, 172);
}
#replyButton {
  /* color: white; */
  /* background-color: rgb(7, 119, 172); */
  margin-top: 12px;
  width: 10%;
  /* padding: 8px; */
  border-radius: 8px;
  /* border-width: 0px; */
}
#replyCol {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}
.replies2 {
  float: right;
  margin-right: 2%;
  text-decoration: none;
  color: black;
}
.replier {
  font-weight: bold;
}
.repliedcontent {
  margin-left: 2%;
  margin-bottom: 2%;
}
</style>
