<template>
  <el-card class="box-card">
    <template #header class="card-header">
      <h4><b>Create Post</b></h4>
    </template>
    <el-row>
      <el-col :span="18" class="block">
        <el-input
          v-model="caption"
          :rows="8"
          type="textarea"
          placeholder="Write something here..."
        />
      </el-col>
      <el-col :span="6" style="padding-left: 20px">
        <el-upload
          action="#"
          class="avatar-uploader"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          style="margin-top: 7px"
        >
          <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-col>
    </el-row>
    <hr>
    <div style="float:right;margin:10px;">
      <span>Send to: </span>
      <el-select
        v-model="recipient"
        placeholder="Select a recipient"
        style="width: 250px; margin-right: 10px"
      >
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>
      </el-select>
      <el-button class="button" type="primary" @click="create">Post</el-button>
    </div>
  </el-card>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { mapActions } from "vuex";
import { Plus, Back } from "@element-plus/icons-vue";

export default {
  name: "WritePost",
  data() {
    return {
      caption: "",
      preview: "",
      image: null,
      imageUrl: "",
      dialogVisible: false,
      options: [
        {
          options: [{ label: "All Students", value: "All" }],
        },
      ],
      recipient: ref("All"),
    };
  },
  components: {
    Plus,
  },
  methods: {
    ...mapActions({
      createPost2: "createPost2",
      createPost: "createPost",
      getPosts: "getPosts",
    }),

    async create() {
      if (this.caption.trim().length == 0) {
        ElMessage.error("Please type in a caption");
        return;
      }
      const details = {
        location: "post",
        caption: this.caption,
        image: this.image,
        date: new Date(),
        poster:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        recipient: this.recipient,
      };
      await this.createPost(details);
    },
    async getOptions() {
      let value = await getDocs(collection(db, "students"));
      let tempOptions = [];
      value.forEach((d) => {
        tempOptions.push({
          value: d.data().parentEmail,
          label: d.data().childName,
        });
      });
      this.options.push({
        label: "Students",
        options: tempOptions,
      });
    },
    handleAvatarPreview(uploadFile) {
      console.log("preview success");
      this.imageUrl = URL.createObjectURL(uploadFile.raw);
    },
    beforeAvatarUpload(rawFile) {
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("Picture must be JPG or PNG format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Picture size can not exceed 2MB!");
        return false;
      }
      this.imageUrl = URL.createObjectURL(rawFile);
      this.image = rawFile;
      this.dialogVisible = true;
      return true;
    },
  },
  created: function () {
    this.getOptions();
  },
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 173px;
  height: 173px;
  display: block;
}
</style>

<style>
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 173px;
  height: 173px;
  text-align: center;
}
.block {
  border-right: solid 1px var(--el-border-color);
  padding: 5px;
  padding-right: 20px;
}
.el-card__header {
  border-bottom: 1px solid var(--el-card-border-color);
  box-sizing: border-box;
  background-color: azure;
}

.box_card {
  background-color: azure;
}
</style>
