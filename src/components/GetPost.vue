<template>
  <el-row>
    <el-col>
      <el-card
        v-for="post in posts"
        :key="post.id"
        :body-style="{ padding: '0px', width: auto}"

      >
        <img v-bind:src="'{{post.imageURL}}'" class="image" />
        <div style="padding: 14px">
          <span>{{post.poster}} shared with you  </span>
        <time class="time">{{ post.date }}</time>       
          <div class="bottom">
          <span>{{ post.caption }}</span>  
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
//import { getStorage, } from "firebase/storage";
export default {
  name: "GetPost",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async getPosts() {
      console.log("got the post");
      let value = await getDocs(collection(db, "posts"));
      console.log("got the post");
      value.forEach((d) => {
        this.posts.push({
          id: d.id,
          caption: d.data().caption,
          //date: new Date(d.data().date.seconds*1000),
          date: d.data().date.toDate().toString().slice(4,21),
          imageUrl: d.data().imageUrl,
          location: d.data().location,
          poster: d.data().poster,
          recipient: d.data().recipient,
        });
      });
    },
  },
  created: function () {
    this.getPosts();
  },
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>