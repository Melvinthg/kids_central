<template>
  <div id="header" v-if="boo">
    <div id="firstGroup" @click="this.$router.push('/AddChildInfo')">
      Update Info
    </div>
    <div id="secondgroup">
      <h2>{{ childName }}'s profile</h2>
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
  </div>

  <el-card class="box-card">
    <div class="card-header" id="headerContainer">
      <span
        ><h2><b>My Child's Information</b></h2></span
      >
    </div>

    <div v-if="boo" id="informationCard">
      <ul>
        <li>
          <h4>
             <span class = "infoField">Child Name : </span><span class="info">{{ childName }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Child ID : </span><span class="info">{{ childID }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">NRIC : </span><span class="info">{{ NRIC }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Class : </span>
            <span class="info">{{ Class }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Address : </span>
            <span class="info">{{ Address }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Gender : </span>
            <span class="info">{{ Gender }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">DOB : </span>
            <span class="info">{{ DOB }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Nationality : </span>
            <span class="info">{{ Nationality }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Allergies : </span>
            <span class="info">{{ Allergies }}</span>
          </h4>
        </li>
      </ul>
    </div>

    <div v-else id="informationCard">
      <h4>Missing information, please click on update Info to update info</h4>
      <el-button type="primary" round>
        <router-link to="/AddChildInfo">
          <h4 id="btn">Update Info</h4>
        </router-link>
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
  data() {
    return {
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
    async getInfos() {
      try {
        this.boo = false;
        const q = query(
          collection(db, "students"),
          where("Name", "==", this.name),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.Address = doc.data().Address;
          this.Allergies = doc.data().Allergies;
          this.NRIC = doc.data().NRIC;
          this.Gender = doc.data().Gender;
          this.DOB = doc.data().DOB;
          this.Nationality = doc.data().Nationality;
          this.Class = doc.data().Class;
          this.childID = doc.data().childID;
          this.childName = doc.data().childName;
        });
        if (this.checkInfo()) {
          this.boo = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    checkInfo() {
      return (
        this.Address.length >= 1 &&
        this.Allergies.length >= 1 &&
        this.NRIC.length == 9 &&
        this.Gender.length >= 1 &&
        this.DOB.length == 10 &&
        this.Nationality.length >= 1 &&
        this.Class.length >= 1 &&
        this.childID.length == 6 &&
        this.childName.length >= 1
      );
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
  border: 1px solid lightskyblue;
  background-color: rgb(135, 206, 250, 0.2);
  border-radius: 8px;
  padding-left: 24px;
}
#btn {
  color: white;
  font-size: 15px;
  padding: 20px;
  margin-top: 10px;
}
#informationCard {
  

  border-radius: 8px;
  border: 1px solid lightskyblue;
  margin-top: 16px;
}
.info {
  color: #2470b7;
  float: right;
}
.infoField{
  font-weight: 600;
}
.box-card {
  padding: 0px;
  margin: 24px;
  background-color: rgb(255, 255, 250, 0.4);
  border-radius: 8px;
}
</style>
