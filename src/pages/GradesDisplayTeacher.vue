<template>
  <div id="header">
    <el-button
      type="primary"
      @click="this.$router.go(-1)"
      style="float: left"
      id="back"
      >Back</el-button
    >
    <div>
      <h4 id="title">Class Grades</h4>
    </div>
  </div>
  <span style="margin-left:10px">View: </span>
  <el-select
    v-model="test"
    class="m-2"
    placeholder="Select a test"
    size="large"
    v-on:change="createGraph"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :value="item.value"
    />
  </el-select>

  <line-chart class="user" width="500px" :data="chartdata"></line-chart>
</template>
<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { mapActions } from "vuex";

export default {
  ...mapActions({ getChildName: "getChildName" }),
  name: "GradesDisplayTeacher",
  data() {
    return {
      chartdata: {},
      options: [],
      alltitle: [],
      test: {},
    };
  },
  methods: {
    async getOptions() {
      let value = await getDocs(collection(db, "gradebook"));
      value.forEach((d) => {
        const e = {
          value: d.data().title,
          label: d.id,
        };
        if (!this.alltitle.includes(e.value)) {
          this.options.push(e);
          this.alltitle.push(e.value);
        }
      });
    },
    async createGraph() {
      const q2 = query(
        collection(db, "gradebook"),
        where("title", "==", this.test)
      );
      console.log(this.test)
      const value = await getDocs(q2);
      console.log(value)
      let data = {};
      value.forEach((d) => {
        console.log(d.data());
        data[d.data().childName] = d.data().score;
      });
      this.chartdata = data;
    },
  },
  created: function () {
    this.createGraph();
    this.getOptions();
  },
};
</script>