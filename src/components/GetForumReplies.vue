<template>
    <el-row>
        <el-col>
            <el-card
            v-for="forumpost in forumposts"
            :key="forumpost.id"
            :body-style="{ padding: '0px', width: auto}">
                <div>
                    <div style="padding: 15px">
                        <span class="poster">{{ forumpost.poster }}</span>
                        <time class="time">{{ forumpost.date }}</time>  
                    </div>     
                    <el-divider/>
                    <img v-bind:src="getImage(forumpost)" class="image">
                    
                    <div class="title">
                        <span>{{ forumpost.title }}</span>  
                    </div>

                    <div class="text">
                        <span>{{ forumpost.text }}</span>  
                    </div>
                </div>

                <div class="replies" style="float:right">{{numReplies}} Replies</div>
                <!-- should route to reply page -->
            </el-card>
            
        </el-col>
    </el-row>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDoc } from "firebase/firestore";
export default {
    
    name: "GetForumReplies",
    data() {

    },
    props: ['forumpost'],
    methods: {
        async getForumPost({context}, fpid){
            const postData = [];
            console.log(context);
            const postRef = collection(db, "forumposts", fpid);
            const postSnap = await getDoc(postRef);
            const x = postSnap.data();
            postData.push(x);
        }
    }
}
</script>

<style>

</style>