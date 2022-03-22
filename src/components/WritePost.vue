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
    <el-row>
      <div>
        Send to:
        <el-select v-model="value1" placeholder="Select" style="width: 200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-row>
    <el-row>
      <button @click="click1">choose photo</button>
      <input
        type="file"
        ref="input1"
        style="display: none"
        @change="previewImage"
        accept="image/*"
      />
      <el-button class="ml-3" type="success" @click="onUpload">
        Upload to server
      </el-button>
      <!-- send button -->
      <el-button plain @click="create">Post</el-button>
    </el-row>
  </div>
</template>

<script>
import { auth, db, storage, uploadBytes } from "../firebase.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref } from "vue";

const value1 = ref([]);

export default {
  name: "WritePost",

  data() {
    return {
      caption: "",
      img1: "",
      imageData: null,
      time: "",
      options: [],
      value1,
    };
  },

  methods: {
    create() {
      const post = {
        photo: this.img1,
        caption: this.caption,
        uid: auth.currentUser.uid,
        time: new Date(),
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

    onUpload() {
      // this.img1 = null;
      // //const imgDataObj = Object.assign({}, this.imageData);
      // console.log(storage)
      // const storageRef = storage
      //   .ref(this.imageData.name)
      //   .put(this.imageData);
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
      const storageRef = ref(storage, this.imageData.name);
      const storageImageRef = ref(storage, this.imageData)

      // const metadata = {
      //   contentType: 'image/jpeg',
      // }
      const uploadTask=uploadBytes(storageRef,this.imageData);
      uploadTask.on('state_changed',
      )

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
</style>

