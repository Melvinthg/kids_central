<template>
  <el-header>
    <router-link to="/editClassDashboard" tag="button">
      <el-button type="primary" :icon="ArrowLeft">Back</el-button>
    </router-link>
  </el-header>
  <h1>Currently viewing Grades for {{ studentname }}</h1>
  <column-chart :data="chartdata"></column-chart>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
  name: "GradesDisplayParent",
  data() {
    return {
      studentid: this.$store.state.userModel.childID,
      chartdata: [],
      studentname: this.$store.state.userModel.childName
    };
  },
  methods: {
    createGraph() {
      const q = query(
        collection(db, "gradebook"),
        where("studentid", "==", this.studentid)
      );
      getDocs(q).then((res) => {
        let chart = [];
        res.forEach((d) => {
          let arr = [d.data().title, d.data().score];
          chart.push(arr);
        });
        this.chartdata = chart;
        console.log(this.chartdata);
      });
    },
  },
  created: function () {
    this.createGraph();
  },
};
</script>
<script setup>
import { ArrowLeft } from "@element-plus/icons-vue";
</script>
