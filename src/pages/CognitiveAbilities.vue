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
      <h4 id="title">Cognitive Abilities</h4>
    </div>
  </div>
  <div id="mainContentEmpty" v-if="!this.noReports">
    <div>
      {{ displaytext }}
    </div>
  </div>
  <div id="mainContent" v-else>
    <div id="text">
      <h3>
        {{ displaytext }}
      </h3>
    </div>
    <el-card class="box-card" v-if="boo">
      <ul v-for="x in Reports" :key="x">
        <div id="title2">
          <li>
            <h2>
              <b>{{ x.title }}</b>
            </h2>
          </li>
        </div>
        <hr />
        <li>
          <h3>{{ x.text }}</h3>
        </li>
        <li id="time">
          <h5>{{ x.date.toDate().toString().slice(4, 16) }}</h5>
        </li>
        <br />
      </ul>
    </el-card>
  </div>
</template>

<script>
import { db } from "../firebase.js";
import { Plus, Back } from "@element-plus/icons-vue";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
  data() {
    return {
      type: this.$store.state.userModel.type,
      Reports: [],
      boo: false,
      displayName: "",
      displaytext: "No Reports at the moment",
      name:
        this.$store.state.userModel.first +
        " " +
        this.$store.state.userModel.last,
      childID: "",
      childName: "",
    };
  },

  methods: {
    noReports() {
      return this.Reports.length == 0;
    },
    //search for student id wrt to name of user then get corresponding report
    async getInfo() {
      if (this.type == "teacher") {
        this.childID = this.$route.params.id;
        const q = query(
          collection(db, "students"),
          where("childID", "==", this.childID)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.childID = doc.data().childID;
          this.childName = doc.data().childName;
        });
      } else {
        const q = query(
          collection(db, "students"),
          where("Name", "==", this.name)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.childID = doc.data().childID;
          this.childName = doc.data().childName;
        });
      }
      const x = query(
        collection(db, "reports"),
        where("childID", "==", this.childID),
        where("category", "==", "cognitiveabilities")
      );
      const y = await getDocs(x);
      y.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.Reports.push(doc.data());
      });
      if (this.Reports.length > 0) {
        this.boo = true;
        this.displaytext = "Viewing: " + this.childName + "'s reports";
      }
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
#header {
  background-color: rgb(7, 119, 172);
  width: 100%;
  display: block;
  color: white;
  position: relative;
}
img {
  height: 50px;
  width: auto;
  filter: invert(100%) sepia(0%) saturate(4349%) hue-rotate(210deg)
    brightness(113%) contrast(101%);
}
@media screen and (max-width: 1000px) {
  #firstGroup {
    font-size: 2vw;
  }
  #secondgroup {
    font-size: 3vw;
  }
  img {
    height: 4vw;
  }
}

#firstGroup:hover {
  cursor: pointer;
  color: black;
}

#title {
  float: middle;
  text-align: center;
}

#btn {
  color: white;
  font-size: 20px;
}

#text {
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}

ul {
  list-style-type: none;
}

ul li {
  margin-bottom: 10px;
}
#time {
  text-align: right;
}

#space {
  width: 10px;
}

#mainContentEmpty {
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
