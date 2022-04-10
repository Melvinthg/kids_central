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
  <el-select v-if = "this.$route.params.id == child"
    v-model="selectedID"
    placeholder="Choose child"
    style="width: 250px; margin-right: 10px"
  >
    <el-option
      @click="createGraph(child.childID)"
      v-for="child in this.children"
      :key="child.childID"
      :label="child.childName"
      :value="child.childID"
    />
  </el-select>
  <!-- <div>Currently viewing Grades for {{ studentname }}</div> -->
  <div style="margin: 0px 0px 20px 20px">
    <el-row v-if="studentname != ''">
      <h2 style="margin: 5px">
        Currently viewing Grades for {{ studentname }}
      </h2>
    </el-row>
    <column-chart :data="chartdata"></column-chart>
  </div>
</template>

<script>
import { db } from "../firebase.js";
import { ref, toRaw } from "vue";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { mapActions } from "vuex";

export default {
  name: "GradesDisplayParent",
  data() {
    return {
      firstID: "",

      chartdata: [],
      children: [],
      selectedID: ref(""),
      selectedStudent: "",
      studentname: "",
    };
  },

  methods: {
    ...mapActions({ getChildName: "getChildName" }),
    test() {
      console.log(this.selectedStudent);
    },
    noData() {
      return this.chartData == [];
    },
    async getChildren() {
      const paramsID = this.$route.params.id;
      const studentRef = collection(db, "students");
      if (paramsID == "child") {
        const queryRef = query(
          studentRef,
          where("parentEmail", "==", this.$store.state.userModel.email),
        );
        const studentDocs = await getDocs(queryRef);
        var count = 0;

        studentDocs.forEach((doc) => {
          this.children.push(doc.data());
          if (count < 1) {
            this.firstID = doc.data().childID;
            console.log(this.firstID);
            count += 1;
          }
        });
        this.createGraph(this.firstID);
      } else {
        const docRef = doc(db, "student", paramsID);
        this.selectedStudent = await getDoc(docRef);
        this.createGraph(paramsID);
      }
    },
    async createGraph(id) {
      console.log(id);
      const docRef = doc(db, "students", id);
      var tempStudent = await getDoc(docRef);
      this.selectedStudent = tempStudent.data();
      this.studentname = tempStudent.data().childName;
      
      
      
      // const paramsID = this.$route.params.id;
      // console.log(id);
      // let childname = "";
      // //teacher
      // if (paramsID != "child") {

      //   let q = query(
      //     collection(db, "students"),
      //     where("childID", "==", id),
      //   );
      //   const userSnap = await getDocs(q);
      //   userSnap.forEach((e) => {
      //     childname = e.data().childName;
      //   });
      //   this.studentname = childname;
      // } else {
      //   let id;
      //   let q = query(
      //     collection(db, "students"),
      //     where("parentEmail", "==", this.$store.state.userModel.email),
      //   );
      //   const userSnap = await getDocs(q);
      //   userSnap.forEach((e) => {
      //     id = e.data().childID;
      //     childname = e.data().childName;
      //   });
      //   this.studentid = id;
      //   this.studentname = childname;
      // }

      const q2 = query(collection(db, "gradebook"), where("childID", "==", id));
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
    this.getChildren();
  },
};
</script>
