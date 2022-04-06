<template>
<div>
  <div class="forumtopbar">
      <ForumCreatePostTopBar></ForumCreatePostTopBar>
  </div>

  <div>
      <GetForumReplies></GetForumReplies>
  </div>
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