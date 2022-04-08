<template>
  <div>
    <div id="header">
      <div id="firstgroup">
        <router-link
          to="/editclassdashboard"
          className="text-link"
          style="color: white"
          >Manage Dashboard</router-link
        >
      </div>
      <div id="secondgroup">
        <h1>Upload Report</h1>
        <br />
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
      },
    };
  },
  methods: {
    ...mapActions({ createReport: "createReport" }),
    async create() {
      console.log("create");
      const details = {
        ...this.report,
        uploader:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      };
      console.log(details);
      await this.createReport(details);
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
#block1 {
  display: block;
  line-height: 40px;
}
#typereport {
  display: block;
  float: left;
  line-height: 40px;
}
</style>
