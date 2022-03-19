<template>
  <div>
    <!-- write a post -->
    <el-input
      id="caption"
      ref="type"
      v-model="caption"
      :rows="2"
      v-on:keydown="typing()"
      type="textarea"
      placeholder="Write something here..."
    />
    <el-row class="sendRow">

    <div>Send to:
      <el-select
        v-model="value1"
        placeholder="Select"
        style="width: 200px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <!-- upload image -->

    <input
      type="file"
      name="image"
      @change="this.previewImage"
      style="margin: auto"
    />

    <!-- send button -->
    <el-button plain @click="create" style="float: right;"
      >Post</el-button>

    </el-row>
  </div>
</template>

<script>
import { db, storage } from "../firebase.js";
import {uploadBytes, getDownloadURL, ref as reference} from "firebase/storage"
import { addDoc, collection, getDocs, } from "firebase/firestore";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
const auth = getAuth();


export default {
  name: "WritePost",

  data() {
    return {
      caption: "",
      img1: "",
      imageData: null,
      options: [],
      value1: ref('selects')
    };
  },

  methods: {
    // uploadImage(event) {
    //    if(event.target.files[0]){
        
    //       let file = event.target.files[0];
    
    //       var storageRef = imagesRef.ref(Math.random() + '_'  + file.name);
    
    //       let uploadTask  = storageRef.put(file);
    
    //       uploadTask.on('state_changed', (snapshot) => {
            
    //       }, (error) => {
    //         // Handle unsuccessful uploads
    //       }, () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
    //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //           this.product.images.push(downloadURL);
    //         });
    //       });
    // }},
    create() {
      var today = new Date();
      const post = {
        photo: this.imageData.name,
        caption: this.caption,
        date: today,
        receiver: this.value1,
        poster: auth.currentUser.email
      };
      addDoc(collection(db, "posts"), post)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    typing() {
      this.$refs.type.value = this.caption;
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      
      this.onUpload();
    },

    async onUpload() {
      this.img1 = null;
      const tempUrl = "images/" + Math.random().toString() + this.imageData.name
      // const imgDataObj = Object.assign({}, this.imageData);
      
      const imageRef = reference(storage, tempUrl)
      //await uploadBytes(imageRef, this.imageData)
      
      //console.log(imageUrl)
      
uploadBytes(imageRef, this.imageData, )
  .then((snapshot) => {
    // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    // console.log('File metadata:', snapshot.metadata);
    // Let's get a download URL for the file.
    getDownloadURL(snapshot.ref).then((url) => {
      //set image url here --> insert into post object
      const imageUrl = url
      
      console.log('File available at', imageUrl);
      // ...
    });
  }).catch((error) => {
    console.error('Upload failed', error);
    // ...
  });
      // getimagesRef
      // const storageRef = await addDoc(
      //   collection(db, `${this.imageData.name}`),
      //   imgDataObj
      // );
      // storageRef.on(
      //   `state_changed`,
      //   (snapshot) => {
      //     this.uploadValue =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   },
      //   (error) => {
      //     console.log(error.message);
      //   },
      //   () => {
      //     this.uploadValue = 100;
      //     storageRef.snapshot.ref.getDownloadURL().then((url) => {
      //       this.img1 = url;
      //       console.log(this.img1);
      //     });
      //   }
      // );
    },

    async getOptions() {
      let value = await getDocs(collection(db, "students"));
      console.log("hello");
      value.forEach((d) => {
        this.options.push({
          value: d.id,
          label: d.data().Name,
        });
      });
    },
  },
  created: function () {
    this.getOptions();
  },
};
</script>

<style scoped>
#topNav {
  float: top;
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

#btn {
  margin-left: auto;
}
</style>
