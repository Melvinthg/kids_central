<template>
  <el-header>
    <router-link to="/editClassDashboard" tag="button" className="back1"> Back </router-link>
  </el-header>
  <h1>Currently viewing Class Grades</h1>

  <!-- select -->
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
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  <line-chart class="user" width="500px" :data="chartdata"></line-chart>
</template>
<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
//import { getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";

export default {
  name: "GradesDisplay",
  data() {
    return {
      chartdata: {},
      options: [],
      test: ref("").value,
      //test: 'spelling1'
    };
  },
  methods: {
    async getOptions() {
      let value = await getDocs(collection(db, "studentsResult"));
      value.forEach((d) => {
        this.options.push({
          value: d.id,
          label: d.data().Name,
        });
      });
      //console.log(this.options[0].value)
    },
    async createGraph() {
      console.log("change");
      let value = await getDocs(
        collection(db, "studentsResult", this.test, "studentsResults")
      );
      let data = {};
      value.forEach((d) => {
        data[d.data().studentName] = d.data().grade;
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
