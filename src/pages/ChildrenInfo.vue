<template>
    <div id="header" v-if = "boo">
        <div id="firstgroup">
            <router-link to = "/AddChildInfo" className='text-link' style='color:white'>Update Info</router-link>
        </div>
        <div id="secondgroup">
            <h1>{{childName}}'s profile</h1><br>
        </div>
    </div>
    <div id="header" v-else>
        <div id="firstgroup"></div>
        <div id="secondgroup">
            <h1>Profile page</h1><br>
        </div>
    </div>

     <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span><h1><b>My Child's Information</b></h1></span>
      </div>
    </template>
    <ul v-if = "boo">
      <li><h3>Child Name : {{childName}}</h3></li>
      <li><h3>Child ID : {{childID}}</h3></li>
      <li><h3>NRIC : {{NRIC}}</h3></li>
      <li><h3>Class : {{Class}}</h3></li>
      <li><h3>Address : {{Address}}</h3></li>
      <li><h3>Gender : {{Gender}}</h3></li>
      <li><h3>DOB : {{DOB}}</h3></li>
      <li><h3>Nationality : {{Nationality}}</h3></li>
      <li><h3>Allergies : {{Allergies}}</h3></li>
    </ul>
    <div v-else>
       <h3>Missing information, please click on update Info to update info</h3>
        <el-button type="primary" round> 
        <router-link to ="/AddChildInfo"> <h3 id = "btn">Update Info</h3> </router-link> 
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
      name : this.$store.state.userModel.first + " " + this.$store.state.userModel.last,
      boo: false,
      Address: "",
      Allergies: "",
      NRIC: "",
      Gender: "",
      DOB: "",
      Nationality: "",
      Class: "",
      childID: "",
      childName: "",
    }
  },

  methods: {

    async getInfos() {
      try {
        this.boo = false;
        const q = query(collection(db, "students"), where("Name", "==", this.name));
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
      })
      if (this.checkInfo()) {
        this.boo = true;
      }
      } catch (error) {
        console.log(error);
      }
     
    },

    checkInfo() {
      return this.Address.length >= 1 && this.Allergies.length >= 1 && this.NRIC.length == 9
      && this.Gender.length >= 1 && this.DOB.length == 10 && this.Nationality.length >= 1 
      && this.Class.length >= 1 && this.childID.length == 6 && this.childName.length >= 1;
    },
  },

    created() {
       this.getInfos();
    },
}
</script>

<style scoped>

ul {
  list-style-type: none;
}

ul li {
  margin-bottom:10px;

}

#btn {
  color: white;
  font-size: 15px;
  padding:20px;
  margin-top: 10px;
}
</style>