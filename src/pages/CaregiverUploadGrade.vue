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
  <br />
  <img id="bottomimage" src="@/assets/CaregiverUploadGrade.jpg" alt="" />
</template>

<script>
import { auth, db } from "../firebase.js";
import { mapActions } from "vuex";
import { collection, getDocs } from "firebase/firestore";
import { ElMessage } from "element-plus";
export default {
  name: "CaregiverUploadGrade",
  data() {
    return {
      report: {
        childID: "",
        childName: "",
        title: "",
        score: "",
        date: "",
        uploader:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        uid: auth.currentUser.uid,
      },
      options: [],
      list: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getChildName: "getChildName",
      createGradebook: "createGradebook",
    }),

    async create() {
      if (this.checkfilled()) {
        this.report.childName = await this.getChildName(this.report.childID)
        await this.createGradebook(this.report)
        ElMessage.success("Successfully uploaded");
        this.goBack();
      } else {
        ElMessage({message: "Please fill in all required fields", type : 'warning',})
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
      return this.report.childID != "" && this.report.score != "" 
      && this.report.title != "" && this.report.date
    },
  },
  created: function () {
    this.getOptions();
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
  position:absolute;
}
</style>