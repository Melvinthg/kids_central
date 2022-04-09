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
          <el-input
            v-model="report.childID"
            size="medium"
            style="width: 100px"
          />
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
        <el-button style="float: right" @click="create">Upload</el-button>
      </el-form>
    </div>
    <br />
  </div>

  <img id="bottomimage" src="@/assets/CaregiverUploadReports.jpg" alt="" />
</template>

<script>
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";

export default {
  name: "CaregiverUploadReport",
  methods: {
    ...mapActions({ createReport: "createReport" }),
    async create() {
      const details = {
        childID: this.childID,
        title: this.title,
        category: this.category,
        text: this.text,
        time: new Date(),
        uploader:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      };
      await this.createReport(details);
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.el-input__inner {
  min-width: 170px;
  max-width: 100%;
}

.el-radio {
  min-width: 170px;
  margin-top: 12px;
}
#header {
  overflow: hidden;
  background-color: rgb(7, 119, 172);
  display: block;
  margin: 0%;
  padding: 5px;
  width: 100%;
}
#firstgroup {
  float: left;
  width: 25%;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  font-size: 15px;
  line-height: 50px;
}
#secondgroup {
  float: left;
  width: 50%;
  text-align: center;
  color: white;
  padding: 10px;
  line-height: 0px;
}
#firstgroup:hover {
  background-color: black;
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
