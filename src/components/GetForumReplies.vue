<template>
  <el-row>
    <el-col>
      <el-card>
        <!-- show the forum thread main post -->
        <h1>{{ fpost }}</h1>
        <el-card
          v-for="fp in forumpost"
          :key="fp.id"
          :body-style="{ padding: '0px', width: auto }"
        >
          <div>
            <div style="padding: 15px">
              <span class="poster">{{ fp.poster }}</span>
              <time class="time">{{ fp.date }}</time>
            </div>
            <el-divider />
            <img v-bind:src="fp.imageUrl" class="image" />

            <div class="title">
              <span>{{ fp.title }}</span>
            </div>

            <div class="text">
              <span>{{ fp.text }}</span>
            </div>
          </div>
        
          <div class="replies2" style="float: right">{{ numReplies }} Replies</div><br>
        </el-card>
        <!-- current replies to that forum thread -->
        <br>
        <el-card
          v-for="reply in replies"
          :key="reply.id"
          :body-style="{ padding: '0px', width: auto }"
        >
          <div>
            <div style="padding: 15px">
              <span class="replier">{{ reply.replier }}</span>
              <time class="time">{{ reply.date }}</time>
            </div>
            <el-divider />

            <div class="repliedcontent">
              <span>{{ reply.replycontent }}</span>
            </div>
          </div>
        </el-card>

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
          <button @click="this.create()" id="replyButton">Reply</button>
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
export default {
  name: "GetForumReplies",
  data() {
    return {
      replycontent: "",
      replier:
        this.$store.state.userModel.first +
        " " +
        this.$store.state.userModel.last,
      //need to change
      numReplies: 0,
      forumpost: [],
      replies: [],
      //change
      //pass as a prop from the parent
      fpid: "HaFu0bTnZmB8PPLW1XXf",
    };
  },
  // props: {
  //     fpost
  // },
  methods: {
    ...mapActions({ createReply: "createReply", getReplies: "getReplies" }),

    //get the single forum thread that the replies are on
    async getForumPost(fpid) {
      const postData = [];
      const postRef = doc(db, "forumposts", fpid);
      const postSnap = await getDoc(postRef);
      const x = postSnap.data();
      postData.push(x);
      return postData;
    },
    //display the values on the page
    async display() {
        this.forumpost = await this.getForumPost(this.fpid);
        this.replies = await this.getReplies(this.fpid);
        console.log(this.replies);
        var replieslist = await this.getReplies("HaFu0bTnZmB8PPLW1XXf");
        this.numReplies = replieslist.length
    },
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
      this.$router.go()
    },
  },
  created: function () {
    this.display();
    this.numReplies = 0;
  },
};
</script>

<style>
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
  color: white;
  background-color: rgb(7, 119, 172);
  margin-top: 16px;
  width: 10%;
  padding: 8px;
  border-radius: 8px;
  border-width: 0px;
}
#replyButton:hover {
  opacity: 90%;
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