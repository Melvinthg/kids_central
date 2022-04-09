<template>
  <!-- <div id="parentView">
    <div id="secondgroup">
      <h1>{{ childName }}'s Profile</h1>
    </div>
  </div> -->
  <div class="dashRow">
    <div class="column">
      <div class="card" @click="healthPage()">
        <h4>Injuries and health</h4>
        <br />
        <div v-if="!booInjuriesAndHealth">
          <p>No Injuries and health reports yet</p>
        </div>

        <el-card class="box-card" v-if="booInjuriesAndHealth">
          <div
            class="reportContainer"
            style="text-align-center"
            v-for="x in this.injuriesAndHealthReports"
            :key="x"
          >
            <span class="reportTitle">{{ x.title }}</span>
            <div class="reportTime">
              {{ x.date.toDate().toString().slice(4, 16) }}
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="column">
      <div
        class="card"
        @click="
          this.$store.state.userModel.type == 'parent'
            ? $router.push('/gradesDisplayParent/' + this.childID)
            : $router.push('/gradesDisplayTeacher')
        "
      >
        <h4>Gradebook</h4>
        <br />
        <div v-if="!booGrades">
          <p>No Gradebook reports yet</p>
        </div>
        <div v-if="booGrades">
          <p>Click proceed to view more</p>
        </div>
        <el-card class="box-card" v-if="booGrades">
          <ul v-for="x in gradeReports" :key="x">
            <div id="title-grade" style="text-align-center">
              <li>
                <span
                  ><u>{{ x.title }}</u></span
                >
              </li>
            </div>
            <div>{{ x.date }}</div>
            <br />
          </ul>
        </el-card>
      </div>
    </div>

    <div class="column">
      <div class="card" @click="cogPage()">
        <h4>Cognitive abilities</h4>
        <br />
        <div v-if="!booCognitiveAbilities">
          <p>No cognitive abilities reports yet</p>
        </div>

        <el-card class="box-card" v-if="booCognitiveAbilities">
          <div
            class="reportContainer"
            style="text-align-center"
            v-for="x in this.cognitiveAbilitiesReports"
            :key="x"
          >
            <span class="reportTitle">{{ x.title }}</span>
            <div class="reportTime">
              {{ x.date.toDate().toString().slice(4, 16) }}
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
  <!-- fetch documents of forumposts from db -->
</template>

<script>
// import ForumTopBar from '@/components/ForumTopBar.vue'
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
export default {
  name: "Dashboard",
  components: {
    //ForumTopBar
  },
  data() {
    return {
      name:
        this.$store.state.userModel.first +
        " " +
        this.$store.state.userModel.last,
      injuriesAndHealthReports: [],
      cognitiveAbilitiesReports: [],
      gradeReports: [],
      booInjuriesAndHealth: false,
      booCognitiveAbilities: false,
      booGrades: false,
      childID: "",
      childName: "",
    };
  },
  methods: {
    async test() {
      console.log(this.$route.params.id);
    },
    async getInfo() {
      const paramsID = this.$route.params.id;
      this.childID = paramsID;
      // -----------------get student id QUERY FOR TEACHERS--------------------
      if (paramsID != "child") {
        // -------------get cognitive abilities report------------------------

        const q1 = query(
          collection(db, "reports"),
          where("childID", "==", this.childID),
          where("category", "==", "Cognitive Abilities"),
        );

        const query1 = await getDocs(q1);
        query1.forEach((doc) => {
          this.cognitiveAbilitiesReports.push(doc.data());
        });
        // -------------get injuries and health report------------------------
        const q2 = query(
          collection(db, "reports"),
          where("childID", "==", this.childID),
          where("category", "==", "Injuries and Health"),
        );
        const query2 = await getDocs(q2);
        query2.forEach((doc) => {
          this.injuriesAndHealthReports.push(doc.data());
        });
      } else {
        // -------------get injuries and health report------------------------
        const email = this.$store.state.userModel.email;
        const reportsCollection = collection(db, "reports");
        const q1 = query(
          collection(db, "reports"),
          where("parentEmail", "==", email),
          where("category", "==", "Injuries and Health"),
        );
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          this.injuriesAndHealthReports.push(doc.data());
        });
        // -------------get cognitive abilities report------------------------
        const q2 = query(
          collection(db, "reports"),
          where("parentEmail", "==", email),
          where("category", "==", "Cognitive Abilities"),
        );
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          this.cognitiveAbilitiesReports.push(doc.data());
        });
      }

      //---------------------get gradebook reports--------------------------
      const a = query(
        collection(db, "gradebook"),
        where("childID", "==", this.childID),
      );
      const b = await getDocs(a);
      b.forEach((doc) => {
        this.gradeReports.push(doc.data());
      });
      if (this.gradeReports.length > 0) {
        this.booGrades = true;
        if (this.gradeReports.length > 2) {
          this.gradeReports = this.gradeReports.slice(0, 2);
        }
      }

      if (this.injuriesAndHealthReports.length > 0) {
        this.booInjuriesAndHealth = true;
        if (this.injuriesAndHealthReports.length > 2) {
          this.injuriesAndHealthReports = this.injuriesAndHealthReports.slice(
            0,
            2,
          );
        }
      }

      if (this.cognitiveAbilitiesReports.length > 0) {
        this.booCognitiveAbilities = true;
        if (this.cognitiveAbilitiesReports.length > 2) {
          this.cognitiveAbilitiesReports = this.cognitiveAbilitiesReports.slice(
            0,
            2,
          );
        }
      }
    },

    healthPage() {
      this.$router.push({
        name: "HealthAndInjuries",
        params: { id: this.childID },
      });
    },

    cogPage() {
      this.$router.push({
        name: "CognitiveAbilities",
        params: { id: this.childID },
      });
    },
  },

  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
.box-card {
  --el-card-padding: 0px;
  padding: 8px;
  max-height: 100%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.reportTitle {
  font-size: 1em;
  color: #0777ac;
  text-align: start;
}
.reportTime {
  font-size: 0.75em;
  color: grey;
  margin-right: 0px;
  margin-left: auto;
}
.reportContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
}
/* Float four columns side by side */
.column {
  float: left;
  width: 26.3%;
  padding: 0 10px;
  margin-left: 16px;
  margin-right: 16px;
}
/* Remove extra left and right margins, due to padding */
.dashRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
}
/* Clear floats after the columns */
.dashRow:after {
  content: "";
  display: table;
  clear: both;
}
/* Responsive columns */
@media screen and (max-width: 720px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
.card:hover {
  background: rgba(135, 206, 250, 0.2);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(135, 206, 250, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin: 20px;
  text-align: center;
  background-color: rgb(250, 249, 246, 0.1);
  height: 400px;
  border-radius: 8px;
  color: #36454f;
}
#parentView {
  overflow: hidden;
  background-color: rgb(7, 119, 172);
  display: block;
  margin: 0%;
  padding: 5px;
  width: 100%;
  text-align: center;
}
#firstgroup {
  float: left;
  width: 25%;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  font-size: 20px;
  line-height: 80px;
}
#secondgroup {
  text-align: center;
  color: white;
  padding: 10px;
  margin-left: 25%;
}
#thirdgroup {
  text-align: center;
  float: right;
  width: 25%;
  padding: 10px 10px;
  font-size: 20px;
  text-align: center;
  color: white;
  line-height: 80px;
}
#firstgroup:hover {
  background-color: black;
}
#thirdgroup:hover {
  background-color: black;
}

ul {
  list-style-type: none;
}

ul li {
  margin-bottom: 0px;
}

li span {
  position: relative;
}
</style>
