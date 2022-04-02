<template>
    <el-row>
        <el-col>
            <el-card>
                <!-- show the forum thread main post -->
                <!-- <h1>{{ fpost }}</h1> -->
                <el-card 
                v-for="fp in forumpost"
                :key="fp.id"
                :body-style="{ padding: '0px', width: auto}">
                <div>
                    <div style="padding: 15px">
                        <span class="poster">{{ fp.poster }}</span>
                        <time class="time">{{ fp.date }}</time>  
                    </div>     
                    <el-divider/>
                    <img v-bind:src="fp.imageUrl" class="image">
                    
                    <div class="title">
                        <span>{{ fp.title }}</span>  
                    </div>

                    <div class="text">
                        <span>{{ fp.text }}</span>  
                    </div>
                </div>
                </el-card>
                <div class="replies" style="float:right">{{numReplies}} Replies</div>
                
                <!-- current replies to that forum thread -->
                <el-card
                v-for="reply in replies"
                :key="reply.id"
                :body-style="{ padding: '0px', width: auto}">
                <div>
                    <div style="padding: 15px">
                        <span class="replier">{{ reply.replier }}</span>
                        <time class="time">{{ reply.date }}</time>  
                    </div>     
                    <el-divider/>
                    
                    <div class="repliedcontent">
                        <span>{{ reply.reply }}</span>  
                    </div>
                </div>
                </el-card>


                <!-- reply box with user's name and textbox -->
                
                <div style="padding: 15px">
                    <span class="replier">{{ replier }}</span>
                </div>     
                <el-divider/>
                <div>
                    <textarea
                    id = "text"
                    v-model= "replycontent"
                    placeholder="Type your reply here..."
                    cols="90"
                    rows="5">
                    </textarea>
                </div> <br>
                

                <div>
                    <button @click="create" style="margin-left:1%">Reply</button>
                </div>
            </el-card>
            
        </el-col>
    </el-row>
</template>

<script>
import { collection, getDoc, doc } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
export default {
    
    name: "GetForumReplies",
    data() {
        return {
            replycontent: '',
            replier: this.$store.state.userModel.first + " " + this.$store.state.userModel.last,
            //need to change
            numReplies: 0,
            forumpost: [],
            replies: [],
            //change
            fpid: "wphiPcPtMS1SjoRSxkBb" 
        }
    },
    // props: {
    //     fpost
    // },
    methods: {
        ...mapActions({createReply: "createReply"}),
        ...mapActions({getReplies: "getReplies"}),

        //get the single forum thread that the replies are on
        async getForumPost({context}, fpid){
            const postData = [];
            console.log(context);
            const postRef = doc(db, "forumposts", fpid);
            const postSnap = await getDoc(postRef);
            const x = postSnap.data();
            postData.push(x);
            return postData;
        },
        //display the values on the page
        async display(){
            this.forumpost = await this.getForumPost(this.fpid)
            this.replies = await this.getReplies(this.fpid)
            console.log(this.replies)
        },
        //create the reply document to store in firebase
        async create() {
            const details = {
                replycontent: this.replycontent,
                time: new Date().toString().slice(4,21),
                uid: auth.currentUser.uid,
                replier: this.$store.state.userModel.first + " " + this.$store.state.userModel.last,
            }
            await this.createReply(this.fpid, details)
            this.goBack()
        },
        goBack(){
            this.$router.push('/forumdisplay'); 
        },

        
    },
    created: function() {
        this.display();
        this.numReplies = 1;
    },
}
</script>

<style>

</style>