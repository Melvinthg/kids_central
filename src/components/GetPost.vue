<template>
  <div v-if="posts.length == 0">
    <el-empty feed="No feed..." />
  </div>
  <el-row v-else>
    <el-card style="width: 100%; margin-bottom: 20px">
      <h4><b>Feed</b></h4>
    </el-card>
    <el-col>
      <div v-for="post in posts" :key="post.id">
        <el-card style="padding: 14px; margin-bottom: 20px; width: auto">
          <span>{{ post.poster }} shared </span>
          <time class="time">{{ post.date }}</time>
          <div class="bottom">
            <img
              v-if="post.imageUrl != null"
              v-bind:src="post.imageUrl"
              class="image"
            />
            <span style="margin-right: auto">{{ post.caption }}</span>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { mapState } from "vuex";

export default {
  name: "GetPost",
  data() {
    return {
      posts: [],
      type: "",
    };
  },
  computed: mapState(["userModel"]),
  methods: {
    getPosts() {
      let q;
      if (this.$store.state.userModel) {
        if (this.$store.state.userModel.type == "parent") {
          q = query(
            collection(db, "posts"),
            where("recipient", "==", this.$store.state.userModel.email),
            orderBy("date")
          );
        } else {
          q = query(collection(db, "posts"), orderBy("date", "desc"));
        }

        getDocs(q).then((res) => {
          res.forEach((d) => {
            this.posts.push({
              id: d.id,
              caption: d.data().caption,
              //date: new Date(d.data().date.seconds*1000),
              date: d.data().date.toDate().toString().slice(4, 21),
              imageUrl: d.data().imageUrl,
              location: d.data().location,
              poster: d.data().poster,
              recipient: d.data().recipient,
            });
          });
        });
      }
    },
  },
  watch: {
    userModel() {
      this.getPosts();
    },
  },
  created() {
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
.image {
  /* width: 100%; */
  display: block;
  border-right: solid 1px var(--el-border-color);
  margin-right: 20px;
  padding-right: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none !important;
  background-color: white !important;
}
</style>
