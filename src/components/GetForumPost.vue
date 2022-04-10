<template>
  <el-row>
    <el-col>
      <div>
        <div style="padding: 15px">
          <span class="poster">{{ forumpost.poster }}</span>
          <time class="time">{{ forumpost.date }}</time>
        </div>
        <el-divider />
        <img v-bind:src="forumpost.imageUrl" class="image" />

        <div class="title">
          <span>{{ forumpost.title }}</span>
        </div>

        <div class="text">
          <p style="white-space: pre-line">{{ forumpost.text }}</p>
        </div>
      </div>
      <router-link
        to="/forumreply"
        @click="nav"
        class="replies"
        style="float: right"
        >{{ forumpost.replies.length }} Replies</router-link
      >
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "GetForumPost",
  props: {
    forumpost: Object,
  },
  methods: {
    nav() {
      this.$router.push({
        name: "ForumReply",
        params: {
          replies: this.forumpost.replies,
          fpid: this.forumpost.fpid,
          title: this.forumpost.title,
        },
      });
    },
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
  font-weight: 600;
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
