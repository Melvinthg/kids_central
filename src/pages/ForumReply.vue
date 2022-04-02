<template>
<div>
  <div class="forumtopbar">
      <ForumCreatePostTopBar></ForumCreatePostTopBar>
  </div>

  <div>
      <h1 style="margin-left:1%">dfdsfsdfsdf</h1>
  </div> <br>

  <div>
      <GetForumReplies></GetForumReplies>
  </div> <br>
</div>
</template>

<script>
import ForumCreatePostTopBar from '@/components/ForumCreatePostTopBar.vue'
import GetForumReplies from '@/components/GetForumReplies.vue'
export default {
    name: "ForumReply",
    components: {
    ForumCreatePostTopBar,
    GetForumReplies,
    },
}
</script>

<style>
</style>