<template>
  <div v-if="posts.length == 0">
    <el-empty feed="No feed..." />
  </div>
  <el-row v-else>
    <el-col>
      <div v-for="post in posts.slice().reverse()" :key="post.id">
        <el-card style="margin-bottom: 20px; width: auto">
          <span class="postOp">{{ post.poster }} shared </span>
          <hr />

          <div class="bottom">
            <img
              v-if="post.imageUrl != null"
              v-bind:src="post.imageUrl"
              class="postImage"
            />
            <span class="postCaption">{{ post.caption }}</span>
            <div class="time">{{ post.date }}</div>
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
    async getPosts() {
      let q;
      q = query(collection(db, "posts"), orderBy("date"));
      if (this.$store.state.userModel) {
        const checkList = ["All", this.$store.state.userModel.email];
        const tempList = [];
        if (this.$store.state.userModel.type == "parent") {
          q = query(
            collection(db, "posts"),

            orderBy("date"),
          );
        }

        getDocs(q).then((res) => {
          res.forEach((d) => {
            if (
              d.data()["recipient"] == "All" ||
              d.data()["recipient"] == this.$store.state.userModel.email
            ) {
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
            }
          });
        });

        // console.log(tempList.filter(d => (d.recipient == 'All' || d.recipient == this.$store.state.userModel.email)))
        // this.posts = tempList.filter((d) => checkList.includes(d.recipient));
        console.log(this.tempList);
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
.postOp {
  font-weight: 500;
  color: #0777ac;
}
.postCaption {
  flex: 5;
  text-align: start;
  line-height: 1.6;
  padding-left: 12px;
}
.time {
  font-size: 13px;
  color: #999;
  float: right;
  margin-left: auto;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  flex-direction: row;

  align-items: start;
}
.postImage {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  display: block;
  border-right: solid 1px var(--el-border-color);
  padding: 20px;
}
.postImage:hover {
  position: relative;
  scale: 1.5;
  max-width: 400px;
  max-height: 400px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none !important;
  background-color: white !important;
}
</style>
