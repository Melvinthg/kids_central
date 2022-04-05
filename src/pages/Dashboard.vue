<template>
  <div id="parentView">
    <div id="secondgroup">
      <h1>{{ childName }}'s Profile</h1>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <div class="card">
        <h4>Injuries and health</h4>
        <br /><br />
        <div v-if="!booInjuriesAndHealth">
          <p>No Injuries and health reports yet</p>
        </div>
        <div v-if="booInjuriesAndHealth">
          <p>Click proceed to view more</p>
        </div>
        <el-card class="box-card" v-if="booInjuriesAndHealth">
          <ul v-for="x in injuriesAndHealthReports" :key="x">
            <div id="title2" style="text-align-center">
              <li>
                <span
                  ><u>{{ x.title }}</u></span
                >
              </li>
            </div>
            <div>{{ x.date.toDate().toString().slice(4, 16) }}</div>
            <br />
          </ul>
        </el-card>

        <!-- <el-button @click="$router.push('/HealthAndInjuries')"> -->
        <el-button @click="proceed">
          Proceed
        </el-button>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <h4>Gradebook</h4>
        <br /><br />
        <p>No academic records yet</p>
        <el-button
          @click="
            this.$store.state.userModel.type == 'parent'
              ? $router.push('/gradesDisplayParent')
              : $router.push('/gradesDisplayTeacher')
          "
        >
          Proceed
        </el-button>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <h4>Cognitive abilities</h4>
        <br /><br />
        <div v-if="!booCognitiveAbilities">
          <p>No cognitive abilities reports yet</p>
        </div>
        <div v-if="booCognitiveAbilities">
          <p>Click proceed to view more</p>
        </div>
        <el-card class="box-card" v-if="booCognitiveAbilities">
          <ul v-for="x in cognitiveAbilitiesReports" :key="x">
            <div id="title2" style="text-align-center">
              <li>
                <span
                  ><u>{{ x.title }}</u></span
                >
              </li>
            </div>
            <div>{{ x.date.toDate().toString().slice(4, 16) }}</div>
            <br />
          </ul>
        </el-card>
        <el-button @click="$router.push('/CognitiveAbilities')">
          Proceed
        </el-button>
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
      childID: "",
      booInjuriesAndHealth: false,
      booCognitiveAbilities: false,
      childName: "",
    };
  },
  methods: {
    async getInfo() {
      console.log("id is " + this.$route.params.id)
      const paramsID = this.$route.params.id;
      if (paramsID != "child") {
        this.childID = paramsID;
        const q = query(
          collection(db, "students"),
          where("childID", "==", paramsID)
        );
        getDocs(q).then((res) => {
          res.forEach((d) => {
            console.log(d.data());
            this.childName = d.data().childName;
          });
        });
      } else {
        // -----------------get student id --------------------
        const q = query(
          collection(db, "students"),
          where("Name", "==", this.name)
        );
        getDocs(q).then((res) => {
          res.forEach((d) => {
            this.childID = d.data().childID;
            this.childName = d.data().childName;
          });
        });
      }

      // -------------get injuries and health report------------------------
      const x = query(
        collection(db, "reports"),
        where("childID", "==", this.childID),
        where("category", "==", "injuriesandhealth")
      );
      const y = await getDocs(x);
      y.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        this.injuriesAndHealthReports.push(doc.data());
      });
      if (this.injuriesAndHealthReports.length > 0) {
        this.booInjuriesAndHealth = true;
        if (this.injuriesAndHealthReports.length > 2) {
          this.injuriesAndHealthReports = this.injuriesAndHealthReports.slice(
            0,
            2
          );
        }
      }
      // -------------get cognitive abilities report------------------------
      const i = query(
        collection(db, "reports"),
        where("childID", "==", this.childID),
        where("category", "==", "cognitiveabilities")
      );
      const j = await getDocs(i);
      j.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        this.cognitiveAbilitiesReports.push(doc.data());
      });
      if (this.cognitiveAbilitiesReports.length > 0) {
        this.booCognitiveAbilities = true;
        if (this.cognitiveAbilitiesReports.length > 2) {
          this.cognitiveAbilitiesReports = this.cognitiveAbilitiesReports.slice(
            0,
            2
          );
        }
      }
    },

    proceed() {
      this.$router.push("/HealthAndInjuries" + this.paramsID)
    }
  },

  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
}
/* Float four columns side by side */
.column {
  float: left;
  width: 33.3%;
  padding: 0 10px;
}
/* Remove extra left and right margins, due to padding */
.row {
  margin: 0 -5px;
}
/* Clear floats after the columns */
.row:after {
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin: 20px;
  text-align: center;
  background-color: #faf9f6;
  height: 400px;
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