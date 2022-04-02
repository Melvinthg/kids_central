<template>
    <div>
        <div class ="forumtopbar">
            <ForumTopBar></ForumTopBar>
        </div>

        <div>
            <h1 style="margin-left:1%">Discussion Threads</h1>
        </div> <br>
        <GetForumPost style="margin-left:1%; margin-right:1%;"></GetForumPost>
    </div>
</template>

<script>
import ForumTopBar from '@/components/ForumTopBar.vue'
import GetForumPost from '@/components/GetForumPost.vue'
export default {
    name: "ForumDisplay",
    components: {
        ForumTopBar,
        GetForumPost
    },
}
</script>

<style>
</style>