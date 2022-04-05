<template>
  <el-header style="margin-top: 20px">
    <el-page-header content="Gradebook" @back="this.$router.go(-1)" />
  </el-header>
  <div style="margin: 0px 0px 20px 20px">
    <el-row>
      <h1>Currently viewing Grades for {{ studentname }}</h1>
    </el-row>
    <column-chart :data="chartdata"></column-chart>
  </div>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { mapActions } from "vuex";

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