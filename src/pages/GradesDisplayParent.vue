<template>
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
        <h4 id="title">Gradebook</h4>
      </div>
    </div>
  <div style="margin: 0px 0px 20px 20px">
    <el-row>
      <h2 style="margin:5px;">Currently viewing Grades for {{ studentname }}</h2>
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
      const paramsID = this.$route.params.id;
      let childname = "";
      if (paramsID != "parent") {
        this.studentid = paramsID;
        let q = query(
          collection(db, "students"),
          where("childID", "==", this.studentid)
        );
        const userSnap = await getDocs(q);
        userSnap.forEach((e) => {
          childname = e.data().childName;
        });
        this.studentname = childname;
      } else {
        let id;
        let q = query(
          collection(db, "students"),
          where("parentEmail", "==", this.$store.state.userModel.email)
        );
        const userSnap = await getDocs(q);
        userSnap.forEach((e) => {
          id = e.data().childID;
          childname = e.data().childName;
        });
        this.studentid = id;
        this.studentname = childname;
      }

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

    // async updateName() {
    //   this.studentname = await this.getChildName(
    //     this.$store.state.userModel.email
    //   );
    // },
  },
  created: function () {
    // this.updateName();
    this.createGraph();
  },
};
</script>