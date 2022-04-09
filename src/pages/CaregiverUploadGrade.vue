<template>
  <div>
    <div id="header">
      <el-button
        type="primary"
        :icon="ArrowLeft"
        @click="this.$router.go(-1)"
        style="float: left"
        id="back"
        >Back</el-button
      >
      <div>
        <h4 id="title">Upload Gradebook</h4>
      </div>
    </div>

    <el-form :label-width="200" style="padding: 20px">
      <el-form-item label="Enter Child Id: " style="max-width: 30%">
        <el-input v-model="report.childID" />
      </el-form-item>
      <el-form-item label="Enter Title: ">
        <el-input v-model="report.title" />
      </el-form-item>
      <el-form-item label="Enter Score: ">
        <el-input v-model="report.score" />
      </el-form-item>
      <el-form-item label="Pick date: ">
        <el-date-picker
          v-model="report.date"
          type="date"
          placeholder="Pick a Date"
          format="YYYY/MM/DD"
          value-format="DD/MM/YY"
        />
      </el-form-item>
      <el-button style="float: right" @click="create">Upload</el-button>
    </el-form>
  </div>
<br>
    <img id="bottomimage" src="@/assets/CaregiverUploadGrade.jpg" alt="" />
</template>

<script>
import { auth } from "../firebase.js";
import { ElMessage } from "element-plus";
import { mapActions } from "vuex";
export default {
  name: "CaregiverUploadGrade",
  data() {
    return {
      report: {
        childID: "",
        title: "",
        score: "",
        date: "",
        uploader:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        uid: auth.currentUser.uid,
      },
    };
  },
  methods: {
    ...mapActions({ createGradebook: "createGradebook" }),

    async create() {
      await this.createGradebook(this.report);
      ElMessage.success("Successfully uploaded");
      this.goBack();
    },
    goBack() {
      this.$router.push("/editclassdashboard");
    },
  },
};
</script>

<style>
#header {
  background-color: rgb(7, 119, 172);
  width: 100%;
  display: block;
  color: white;
  position: relative;
}
#title {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
#back {
  position: absolute;
  float: left;
  vertical-align: middle;
  padding: 12px;
  margin: 2px;
  margin-left: 30px;
}
#bottomimage {
  width: 100%;
  object-fit: cover;
  background-size: cover;
}
</style>