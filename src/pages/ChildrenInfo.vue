<template>
  <div id="header" v-if="childrenEmpty">
    <div id="firstGroup" @click="this.$router.push('/AddChildInfo')">
      Update Info
    </div>
    <div id="secondgroup">
      <h2>{{ childName }}'s Profile</h2>
      <br />
    </div>
    <div id="thirdgroup"></div>
  </div>
  <div id="header" v-else>
    <div id="firstgroup"></div>
    <div id="secondgroup">
      <h2>Profile page</h2>

      <br />
    </div>
    <div id="thirdgroup"></div>
  </div>

  <el-card class="box-card" v-for="child in this.children" :key="child.NRIC">
    <div id="headerContainer">
      <span id="childName"
        ><h2>
          <b>{{ child.childName }}'s Profile</b>
        </h2></span
      >
      <div id="delete">Delete</div>
    </div>

    <div v-if="child.boo" id="informationCard">
      <ul>
        <li>
          <h4>
            <span class="infoField">Child Name : </span
            ><span class="info">{{ child.childName }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">Child ID : </span
            ><span class="info">{{ child.childID }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">NRIC : </span
            ><span class="info">{{ child.NRIC }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">Class : </span>
            <span class="info">{{ child.Class }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">Address : </span>
            <span class="info">{{ child.Address }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">Gender : </span>
            <span class="info">{{ child.Gender }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">DOB : </span>
            <span class="info">{{ child.DOB }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">Nationality : </span>
            <span class="info">{{ child.Nationality }}</span>
          </h4>
        </li>
        <li>
          <h4>
            <span class="infoField">Allergies : </span>
            <span class="info">{{ child.Allergies }}</span>
          </h4>
        </li>
      </ul>
    </div>

    <div v-else id="informationCarEmpty">
      <h4>Missing information, please click on update Info to update info</h4>
      <button
        round
        @click="this.$router.push('/AddChildInfo')"
        id="toUpdateInfo"
      >
        Update Info
      </button>
    </div>
  </el-card>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
  data() {
    return {
      children: [],
      name:
        this.$store.state.userModel.first +
        " " +
        this.$store.state.userModel.last,
      boo: false,
      Address: "",
      Allergies: "",
      NRIC: "",
      Gender: "",
      DOB: "",
      Nationality: "",
      Class: "",
      childID: "",
      childName: "Child",
    };
  },

  methods: {
    childrenEmpty() {
      return this.children.length == 0;
    },
    async getInfos() {
      try {
        this.boo = false;
        const q = query(
          collection(db, "students"),
          where("Name", "==", this.name),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const x = doc.data();
          this.children.push(x);
          // this.Address = doc.data().Address;
          // this.Allergies = doc.data().Allergies;
          // this.NRIC = doc.data().NRIC;
          // this.Gender = doc.data().Gender;
          // this.DOB = doc.data().DOB;
          // this.Nationality = doc.data().Nationality;
          // this.Class = doc.data().Class;
          // this.childID = doc.data().childID;
          // this.childName = doc.data().childName;
        });
        if (this.checkInfo()) {
          this.boo = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    checkInfo() {
      this.children.forEach((e) => {
        e.boo =
          e.Address.length >= 1 &&
          e.Allergies.length >= 1 &&
          e.NRIC.length == 9 &&
          e.Gender.length >= 1 &&
          e.DOB.length == 10 &&
          e.Nationality.length >= 1 &&
          e.Class.length >= 1 &&
          e.childID.length == 6 &&
          e.childName.length >= 1;
      });
    },
  },

  created() {
    this.getInfos();
  },
};
</script>

<style scoped>
h2 {
  margin: 0px;
}

h4 {
}
#header {
  display: flex;
  flex-direction: row;
  padding: 0px;
  align-items: center;
}
#firstGroup {
  flex: 1;
  color: white;
  padding: 12px;
  font-size: 20px;
}
#secondgroup {
  flex: 3;
  padding: 4px;
}

#firstGroup:hover {
  color: black;
  cursor: pointer;
}
#thirdgroup {
  flex: 1;
}
ul {
  list-style-type: none;
  padding: 24px;
  margin: 0px;
}

ul li {
  margin: 10px, 0;
}
#headerContainer {
  display: flex;
  flex-direction: row;

  border: 1px solid lightskyblue;
  background-color: rgb(135, 206, 250, 0.2);
  border-radius: 8px;
  padding: 0px 0px 24px 24px;
}
#btn {
  color: white;
  font-size: 15px;
  padding: 20px;
  margin-top: 10px;
}
#informationCardEmpty {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid lightskyblue;
  margin-top: 16px;
}
#childName {
  margin-top: 24px;
}

#toUpdateInfo {
  margin-top: 12px;
  padding: 8px;
  border-radius: 8px;
  background-color: #0777ac;
  color: white;
  border: none;
  font-size: 16px;
}

.info {
  color: #2470b7;
  float: right;
}
.infoField {
  font-weight: 600;
}
.box-card {
  padding: 0px;
  margin: 24px;
  background-color: rgb(255, 255, 250, 0.4);
  border-radius: 8px;
}

#delete {
  font-size: 12px;
  margin-left: auto;
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: auto;
  border-radius: 6px;
  padding: 4px;
  border: 1px solid black;
}
</style>
