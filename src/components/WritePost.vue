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
        v-model="recipient"
        placeholder="Select a recipient"
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
    
     <div v-if="image!=null">                     
          <img class="preview" height="268" width="356" :src="preview">
      </div>
    <!-- send button -->
    <el-button plain @click="create" style="float: right;" 
      >Post</el-button>

    </el-row>
      
  </div>
  
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { db, storage } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import { ref } from "vue";
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
// const store = useStore()
export default {
  name: "WritePost",
  data() {
    return {
      caption: "",
      preview: "",
      image: null,
      options: [
        {
          options: [{ label: "All Students", value: "All" }],
        },
      ],
      recipient: ref("All"),
    };
  },
//   computed: {
// ...mapState({userModel: state => state.userModel}),
//   },
  methods: {
    
    ...mapActions({createPost: "createPost", getPosts: "getPosts"}),
    
    async create() {
      // i do not know what this is for so i will not touch it
      var today = new Date();
      
      const details = {
        location: "post",
        caption: this.caption,
        image: this.image,
        date: today,
        poster: this.$store.state.userModel.email,
        recipient: this.recipient
      }
      await this.createPost(details)    
    },
    typing() {
      this.$refs.type.value = this.caption;
    },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.preview = null;
      this.image = event.target.files[0];
    
    },
    async onUpload() {
      this.preview = null;
      const details = {location: "post", image: this.image}
      this.imageUrl = await this.uploadImage(details)
    },
    async getOptions() {
      let value = await getDocs(collection(db, "students"));
      let tempOptions = [];
      value.forEach((d) => {
        tempOptions.push({
          value: d.id,
          label: d.data().Name,
        });
      });
      this.options.push({
        label: "Students",
        options: tempOptions,
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