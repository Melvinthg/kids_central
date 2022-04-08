<template>
<div>
  <div class="forumtopbar">
    <ForumCreatePostTopBar></ForumCreatePostTopBar>
  </div>

  <div>
      <h1 style="margin-left:1%">Create a new Discussion Thread</h1>
  </div> <br>

  <div>
      <input
      type= "text"
      v-model= "title"
      placeholder="Enter Title of Post..."
      style="margin-left:1%">
  </div> <br>

  <div>
      <textarea
      id = "text"
      v-model= "text"
      placeholder="Type your post here..."
      cols="90"
      rows="10"
      style="margin-left:1%; width:95%">
      </textarea>
  </div> <br>

  <div>
      <input
        type="file"
        name="image"
        @change="this.loadFile"
        style="margin-left:1%"><br>
        <img id="output" width="350" height="200" style="margin-left:1%">           
  </div> <br>

  <!-- <div v-if="image!=null">                     
      <img class="preview" style="margin-left:1%" height="200" width="300" :src="preview"><br>
  </div> -->

  <div>
      <el-button id="forumpostButton" type="primary" style="margin-left:1%; margin-bottom:1%" @click="create">Post</el-button>
  </div>
</div>
</template>


<script>
// eslint-disable-next-line no-unused-vars
import ForumCreatePostTopBar from '@/components/ForumCreatePostTopBar.vue'
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
export default {
  name: "ForumCreatePost",
  components: {
    ForumCreatePostTopBar,
  },
  data() {
    return {
      title: '',
      text: '',
      image: null,
    }
  },
  methods: {
    ...mapActions({createForumPost: "createForumPost"}),
    ...mapActions({getChildClass: "getChildClass"}),
    async create() {
      if (this.$store.state.userModel.type == "parent"){
        const pEmail = this.$store.state.userModel.email  
        var childClass = await this.getChildClass(pEmail);
      }
      const details = {
        location: "forumpost",
        image: this.image,
        title: this.title,
        text: this.text,
        uid: auth.currentUser.uid,
        poster: this.$store.state.userModel.first + " " + this.$store.state.userModel.last,
        time: new Date().toString().slice(4,21),
        class: childClass || this.$store.state.userModel.teacherClass
      }
      await this.createForumPost(details)
      this.goBack()
    },
    click1() {
        this.$refs.input1.click()   
    },
    loadFile(event) {
      var reader = new FileReader();
      reader.onload = function(){
        var output = document.getElementById('output');
        output.src = reader.result;
      };
      reader.readAsDataURL(this.image = event.target.files[0]);
    },
    async onUpload(){
        this.preview = null;
        const details = {location: "forumpost", image: this.image}
        this.imageUrl = await this.uploadImage(details)
    },
    goBack(){
        this.$router.push('/forumdisplay'); 
    }
  }
}
</script>
<style>
#text {
  white-space: pre-wrap;
}
#forumpostButton {
  margin-top: 12px;
  width: 5%;
  padding: 15px;
  border-radius: 8px;
}
</style>