
<template>
    <div class ="forumtopbar">
        <ForumTopBar></ForumTopBar>
    </div>

    <div>
        <h1 style="margin-left:1%">Discussion Threads</h1>
    </div> <br>

    <div v-for = "post in posts" :key= "post" >

        <ForumThread :post="post"></ForumThread>
    </div>
    <!-- fetch documents of forumposts from db -->
</template>

<script>
import ForumTopBar from '@/components/ForumTopBar.vue'
import ForumThread from '@/components/ForumThread.vue'
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"


export default {

    name: "ForumDisplay",
    components: {
        ForumTopBar,
        ForumThread
    },
    data(){
        return{
            posts: []
        }
    },
    async beforeMount(){
        this.posts = await this.getForumPosts(this.$store.state.userModel.childClass || this.$store.state.userModel.teacherClass)
    },
    // mounted(){
    //     this.display()
    // },
    
    // methods: {
    //     ...mapActions({getForumPosts: "getForumPosts"}),
    //     async display(){
    //         let forumpostids = await this.getForumPosts(this.$store.state.userModel.childClass || this.$store.state.userModel.teacherClass)
    //         forumpostids.forEach(postId => {
    //             displaythread(postId)
    //         });
    //     }
    // },
    
}
</script>

<style>

</style>