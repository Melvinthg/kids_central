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
import { useStore, mapActions, mapState } from "vuex";

export default {
  name: "GradesDisplayParent",
  data() {
    return {
      studentid: "",
      chartdata: [],
      studentname: "",
    };
  },
  methods: {
    ...mapActions({ getChildName: "getChildName" }),

    async createGraph() {
      let id;
      let q = query(
        collection(db, "students"),
        where("parentEmail", "==", this.$store.state.userModel.email)
      );
      const userSnap = await getDocs(q);
      userSnap.forEach((e) => {
        id = e.data().childID;
      });
      this.studentid = id;

      const q2 = query(
        collection(db, "gradebook"),
        where("childID", "==", this.studentid)
      );
      let chart = [];
      const dataSnap = await getDocs(q2);
      dataSnap.forEach((e) => {
        let arr = [e.data().title, e.data().score];
        chart.push(arr);
      });
      this.chartdata = chart;
    },
    
    async updateName() {
      this.studentname = await this.getChildName(
        this.$store.state.userModel.email
      );
    },
  },
  created: function () {
    this.updateName();
    this.createGraph();
  },
};
</script>
<script setup>
import { ArrowLeft } from "@element-plus/icons-vue";
</script>
