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
    <div id="content">
      <el-card id="block1">
        <el-form :label-width="200" style="padding: 20px">
          <div>
            <el-form-item label="Enter Child Id: " style="width: 500px">
              <el-select
                v-model="report.childID"
                filterable
                remote
                reserve-keyword
                placeholder="Search child ID..."
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="Select a Category">
            <el-radio-group v-model="report.category">
              <el-radio border label="Injuries and Health" />
              <el-radio border label="Cognitive Abilities" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Enter Title: ">
            <el-input id="enter-title" v-model="report.title" />
          </el-form-item>

          <el-form-item label="Report Description" prop="desc">
            <el-input v-model="report.text" type="textarea" rows="5" />
          </el-form-item>
          <el-button style="float: right" @click="create">Upload</el-button>
        </el-form>
      </el-card>
    </div>

    <br />
  </div>
  <img id="bottomimage" src="@/assets/CaregiverUploadReports.jpg" alt="" />
</template>

<script>
import { auth, db } from "../firebase.js";
import { mapActions } from "vuex";
import { collection, getDocs } from "firebase/firestore";
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
      options: [],
      list: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions({ createReport: "createReport" }),
    async create() {
      if (this.checkfilled()) {
        await this.createReport(this.report);
        ElMessage.success("Successfully uploaded");
        this.goBack();
      } else {
        ElMessage({
          message: "Please fill in all required fields",
          type: "warning",
        });
      }
    },
    goBack() {
      this.$router.push("/editclassdashboard");
    },
    getOptions() {
      let temp = [];
      getDocs(collection(db, "students")).then((res) => {
        res.forEach((d) => {
          temp.push({ value: d.id, label: d.id });
        });
      });
      this.list = temp;
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.value.toLowerCase().includes(query.toLowerCase());
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    checkfilled() {
      return (
        this.report.category != "" &&
        this.report.text != "" &&
        this.report.title != "" &&
        this.reportchildID != ""
      );
    },
  },
  created: function () {
    this.getOptions();
  },
};
</script>

<style>
#content {
 display:flex;
 flex-direction: column;
 justify-content: center;
 height: 70vh;
 

 align-items:center;
}
.el-input__inner {
  min-width: 170px;
  max-width: 50%;
}

#enter-title {
  max-width: 100%;
}

.el-radio {
  min-width: 170px;
  margin-top: 12px;
  background-color: white;
}
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
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  overflow-x: hidden;
  position: absolute;
  z-index: -1;
  top: 0px;
  opacity: 0.5;
}
#block1 {
  --el-card-padding: 0px;
  padding-right: 8px;
  padding-bottom: 8px;
  margin: 0px 15%;
  width:70%;
  display: block;
  background: rgba(135, 206, 250, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.2px);
  -webkit-backdrop-filter: blur(6.2px);
  border: 1px solid rgba(135, 206, 250, 0.44);
}
</style>
