<template>
      <div id="header">
        <div id="firstgroup">
            <router-link to = "/editclassdashboard" className='text-link' style='color:white'>Manage Dashboard</router-link>
        </div>
        <div id="secondgroup">
            <h1>{{name}}'s profile</h1><br>
        </div>
    </div>

     <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span><h1><b>My Child's Information</b></h1></span>
      </div>
    </template>
    <ul v-if = "boo">
      <li><h3>NRIC : {{NRIC}}</h3></li>
      <li><h3>Address : {{Address}}</h3></li>
      <li><h3>Gender : {{Gender}}</h3></li>
      <li><h3>DOB : {{DOB}}</h3></li>
      <li><h3>Nationality : {{Nationality}}</h3></li>
      <li><h3>Allergies : {{Allergies}}</h3></li>
    </ul>
    <div v-else> <h3>Missing information, please click on following link to update info</h3></div>
  </el-card>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {

  data() {
    return {
      name : this.$store.state.userModel.childName,
      Reports: [],
      boo: false,
      Address: "",
      Allergies: "",
      NRIC: "",
      Gender: "",
      DOB: "",
      Nationality: "",
    }
  },

  methods: {

    async getInfos() {
      this.boo = false;
      const q = query(collection(db, "students"), where("Full Name", "==", this.name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.Reports.push(doc.data());
        this.Address = doc.data().Address;
        this.Allergies = doc.data().Allergies;
        this.NRIC = doc.data().NRIC;
        this.Gender = doc.data().Gender;
        this.DOB = doc.data().DOB;
        this.Nationality = doc.data().Natioanality;
      })
      if (this.Reports.length == 6) {
        this.boo = true;
      }
    },
  },

    created: function() {
       this.getInfos();
    },
}
</script>

<style scoped>
#header {
    overflow: hidden;
    background-color: rgb(7, 119, 172);
    display: block;
    margin: 0%;
    padding: 5px;
    width: 100%;
}
#title {
  float: left;
  width: 25%;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  font-size: 15px;
  line-height: 50px;
}
#secondgroup {
    float: left;
    width: 50%;
    text-align: center;
    color: white;
    padding: 10px;
    line-height: 0px;
}
ul {
  list-style-type: none;
}

ul li {
  margin-bottom:10px;

}
</style>