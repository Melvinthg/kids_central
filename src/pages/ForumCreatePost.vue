<template>
  <div class="forumtopbar">
    <ForumCreatePostTopBar></ForumCreatePostTopBar>
  </div>

  <div>
    <h1>Create a new Discussion Thread</h1>
  </div>

  <div>
    <input type="text" v-model="title" placeholder="Enter Title of Post..." />
  </div>

  <div>
    <input
      type="text"
      v-model="text"
      placeholder="Type your post here..."
      size="100"
      style="white-space: pre-line"
    />
  </div>

  <div>
    <button @click="click1" style="margin-left: 1%">choose photo</button>
    <input
      type="file"
      ref="input1"
      style="display: none"
      @change="previewImage"
      accept="image/*"
    />
  </div>

  <div>
    <img
      class="preview"
      style="margin-left: 1%"
      height="200"
      width="300"
      src="img1"
    /><br />
  </div>

  <div>
    <button @click="onUpload" style="margin-left: 1%">upload</button>
  </div>

  <div>
    <button @click="create" style="margin-left: 1%">post</button>
  </div>
</template>


<script>
import firebase from "firebase/compat/app";
import ForumCreatePostTopBar from "@/components/ForumCreatePostTopBar.vue";
import { auth, db } from "../firebase.js";
import { addDoc, collection } from "firebase/firestore";

export default {
  name: "ForumCreatePost",
  components: {
    ForumCreatePostTopBar,
  },

  data() {
    return {
      title: "",
      text: "",
      img1: "",
      imageData: null,
      uid: "",
      time: null,
    };
  },
  methods: {
    create() {
      const post = {
        photo: this.img1,
        title: this.title,
        text: this.text,
        uid: auth.currentUser.uid,
        time: new Date(),
      };
      //   firebaseApp.database().ref('forumposts').push(post)
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      addDoc(collection(db, "forumposts"), post);
      location.href = "/forumdisplay";
    },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      // this.onUpload()
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    },
  },
};
</script>
<style>
</style>
