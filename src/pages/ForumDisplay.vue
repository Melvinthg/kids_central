
<template>
    <div class ="forumtopbar">
        <ForumTopBar></ForumTopBar>
    </div>

    <div>
        <h1 style="margin-left:1%">Discussion Threads</h1>
    </div> <br>

    <div>
        <ForumThread></ForumThread>
    </div>
    <!-- fetch documents of forumposts from db -->
</template>

<script>
import ForumTopBar from '@/components/ForumTopBar.vue'
import ForumThread from '@/components/ForumThread.vue'

export default {
    name: "ForumDisplay",
    components: {
    ForumTopBar,
    ForumThread
  },
}
</script>

<style>

</style>