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
        <h4 id="title">Upload Reports</h4>
      </div>
    </div>
    <div id="block1">
      <el-form :label-width="200" style="padding: 20px">
        <el-form-item label="Enter Child Id: " style="max-width: 30%">
          <el-input v-model="report.childID" />
        </el-form-item>
        <el-form-item label="Select a Category">
          <el-radio-group v-model="report.category">
            <el-radio border label="Injuries and Health" />
            <el-radio border label="Cognitive Abilities" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Enter Title: ">
          <el-input v-model="report.title" />
        </el-form-item>

        <el-form-item label="Report Description" prop="desc">
          <el-input v-model="report.text" type="textarea" rows="5" />
        </el-form-item>
        <el-button style="float:right" @click="create">Upload</el-button>
      </el-form>
    </div>
    <br />
  </div>
  <img id="bottomimage" src="@/assets/CaregiverUploadReports.jpg" alt="" />
</template>

<script>
import { auth } from "../firebase.js";
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";

export default {
  name: "CaregiverUploadReport",
  data() {
    return {
      report: {
        childID: "",
        title: "",
        category: "",
        text: "",
        time: new Date(),
        uploader:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    };
  },
  methods: {
    ...mapActions({ createReport: "createReport" }),
    async create() {
      await this.createReport(this.report);
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
  overflow: hidden;
  background-color: rgb(7, 119, 172);
  display: block;
  margin: 0%;
  padding: 5px;
  width: 100%;
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
