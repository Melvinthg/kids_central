<template>
    <div id="header">
        <div id="secondgroup">
            <h1>Class Info</h1><br>
        </div>
    </div>

 <!-- search bar -->
        <div>
        <select id = "selector" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option selected value = "not selected">Select Class</option>
        <option value="2J">2J</option>
        <option value="2K">2K</option>
        </select>
            <button button @click = "getClass()">Get Class Info</button>
        </div>

            <div v-if = "boo" id = "cv"><h1><b>{{displayText}}</b></h1>
        </div>
        <el-card class="box-card" v-if="classBoo">
    <template #header>
      <div class="card-header" id="headerContainer">
        <span><h1><b>Class Information</b></h1></span>
      </div>
    </template>
    
        <div v-if="boo" id="informationCard">
      <ul v-for="x in Reports" :key="x">
        <li>
          <h4>
             <span class = "infoField">Child Name : </span><span class="info">{{ x.childName }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Child ID : </span><span class="info">{{ x.childID }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">NRIC : </span><span class="info">{{ x.NRIC }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Class : </span>
            <span class="info">{{ x.Class }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Address : </span>
            <span class="info">{{ x.Address }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Gender : </span>
            <span class="info">{{ x.Gender }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">DOB : </span>
            <span class="info">{{ x.DOB }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Nationality : </span>
            <span class="info">{{ x.Nationality }}</span>
          </h4>
        </li>
        <li>
          <h4>
             <span class = "infoField">Allergies : </span>
            <span class="info">{{ x.Allergies }}</span>
          </h4>
        </li>
        <hr>
      </ul>
      </div>
    <!-- <ul v-if = "classBoo">
      <ul v-for="x in Reports" :key="x">
         <li><h3>Name : {{x.childName}}</h3></li>
         <li><h3>NRIC : {{x.NRIC}}</h3></li>
         <li><h3>Child Id : {{x.childID}}</h3></li>
         <li><h3>Class : {{x.Class}}</h3></li>
         <li><h3>Address : {{x.Address}}</h3></li>
         <li><h3>Gender : {{x.Gender}}</h3></li>
         <li><h3>DOB : {{x.DOB}}</h3></li>
         <li><h3>Nationality : {{x.Nationality}}</h3></li>
         <li><h3>Allergies : {{x.Allergies}}</h3></li>
         <hr>
     </ul>
    </ul> -->
  </el-card>

</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
export default {
    data() {
        return {
            // NRIC, Class, Address, Gender, DOB, Nationality, Allergies, Name
            boo: false,
            classBoo : false,
            Reports: [],
            className: "",
            displayText: "",
        }
    },
    methods: {
        async getClass() {
            this.classBoo = false;
            this.Reports = [];
            if (document.getElementById("selector").value === "not selected") {
                this.displayText = "Please select valid class name"
                this.boo = true;
            } else {
                this.boo = true;
                this.classBoo = true;
                this.className = document.getElementById("selector").value;
                this.displayText = "Currently Viewing : " + this.className;
                const q = query(collection(db, "students"), where("Class", "==", this.className));
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    this.Reports.push(doc.data())
                    //Reports of array with objects to access loop it / Reports[num] to access specific element .element
                })
            }
        }
    }
}
</script>

<style scoped>
#selector {
    width:15%;
    display:inline-block;
}
button {
    width:20;
    margin-top: 10px;
    margin-left: 10px;
}
#cv {
    float:middle;
    margin-left: 30px;
}
ul {
  list-style-type: none;
}
ul li {
  margin-bottom:10px;
}
#secondgroup {
    margin-left: 290px;
}
#informationCard {
  border-radius: 8px;
  border: 1px solid lightskyblue;
  margin-top: 16px;
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

#headerContainer {
  border: 1px solid lightskyblue;
  background-color: rgb(135, 206, 250, 0.2);
  border-radius: 8px;
  padding-left: 24px;
}
</style>