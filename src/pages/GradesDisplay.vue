<template>
  <el-header>
    <router-link to="/editClassDashboard" tag="button" className="back1">
      Back
    </router-link>
  </el-header>
  <h1>Currently viewing Class Grades</h1>

  <!-- select the test-->
  <el-select
    v-model="test"
    class="m-2"
    placeholder="Select a test"
    size="large"
    v-on:change="createGraph"
  >
    <el-option
      v-for="item in tests"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  <!-- selecting the students  -->

  <el-select
    v-model="student"
    class="m-2"
    placeholder="Select a student"
    size="large"
    v-on:change="createGraphStudent"
  >
    <el-option
      v-for="item in students"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <button @click="createGraphStudent">click me</button>

<!-- chart to use -->
  <line-chart v-if="this.homeType == 'teacher'" width="500px" :data="chartdata"></line-chart>
  <column-chart v-if="this.homeType == 'parent'" :data="chartdata"></column-chart>

</template>
<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
const auth = getAuth();

export default {
  name: "GradesDisplay",
  data() {
    return {
      
      //user
      user: auth.currentUser,
      homeType: "",

      //other data
      chartdata: {},
      tests: [],
      students: [],
      test: ref("").value,
      student: ref("").value,

    };
  },
  methods: {
    async getTests() {
      let value = await getDocs(collection(db, "studentsResult"));
      value.forEach((d) => {
        this.tests.push({
          value: d.id,
          label: d.data().Name,
        });
      });
    },

    async getStudents() {
      let value = await getDocs(collection(db, "students"));
      value.forEach((d) => {
        this.students.push({
          value: d.id,
          label: d.data().Name,
        });
      });
    },

    async createGraph() {
      let value = await getDocs(
        collection(db, "studentsResult", this.test, "studentsResults")
      );
      let data = {};
      value.forEach((d) => {
        data[d.data().studentName] = d.data().grade;
      });
      this.chartdata = data;
    },

    async createGraphStudent() {
      let data = {};
      var s = this.student;
      this.tests.forEach((d) => {
        // let value = getDocs(
        //   collection(db, "studentsResult", d, "studentsResults")
        // );
        const testRef = collection(db, "studentsResult", d.value, "studentsResults");
        console.log(testRef)
        const q = query(testRef, where("studentId", "==", s));
        const querySnapshot = getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      });
      this.chartdata = data;
    },
  },
  created: function () {
    this.homeType = this.$store.state.userModel.type,
    this.createGraph();
    this.getTests();
    this.getStudents();
  },
};
</script>