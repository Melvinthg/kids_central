<template>
    <div id="header">
        <div id="firstgroup">
            <router-link to = "/Home" className='text-link' style='color:white'>Back</router-link>
        </div>
        <div id="secondgroup">
            <h1>Class Info</h1><br>
        </div>
    </div>

 <!-- search bar -->
        <div>
        <select id = "selector" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option selected value = "not selected">Select Class</option>
        <option value="K1a">K1a</option>
        <option value="K2a">K2a</option>
        </select>
            <button button @click = "getClass()">Get Class Info</button>
        </div>

            <div v-if = "boo" id = "cv"><h1><b>{{displayText}}</b></h1>
        </div>
        <el-card class="box-card" v-if="classBoo">
    <template #header>
      <div class="card-header">
        <span><h1><b>Class Information</b></h1></span>
      </div>
    </template>
    <ul v-if = "classBoo">
      <ul v-for="x in Reports" :key="x">
         <li><h3>Name : {{x.Name}}</h3></li>
         <li><h3>NRIC : {{x.NRIC}}</h3></li>
         <li><h3>Class : {{x.Class}}</h3></li>
         <li><h3>Address : {{x.Address}}</h3></li>
         <li><h3>Gender : {{x.Gender}}</h3></li>
         <li><h3>DOB : {{x.DOB}}</h3></li>
         <li><h3>Nationality : {{x.Nationality}}</h3></li>
         <li><h3>Allergies : {{x.Allergies}}</h3></li>
         <hr>
     </ul>
    </ul>
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
</style>
