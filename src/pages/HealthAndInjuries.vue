<template>
<div id="wholegroup">
     <div id="firstgroup">
        <router-link to = "/home" className='text-link'>Back</router-link>
     </div>
     <div id="secondgroup">
         <h1>HealthAndInjuries page</h1><br>
     </div>
</div>
 <div>
      <input type="text" id = "name" placeholder = "input student id...">
      <button button @click = "getReport()">Get Reports</button>
</div>
<table id = "table">
            <!-- need to fix the repeat and styling to span across-->
            <ul v-for="report in Reports" :key="report.id">
            <ul v-for="name in  reportNames" :key="name.id">
                <div id = "nameAssessment"><b> {{name}}</b></div>
                <div id = "date">{{report.date}}</div> <br>
                <div ><h3>{{report.Report}}</h3></div>
                <br><br>
            </ul>
            </ul>
</table>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {

    data() {
        return {
        Reports: [],
        reportNames: [],
        }
    },
 
    methods: {


        async getReport() {
            let name = document.getElementById("name").value
            this.Reports = [];
            this.reportNames = [];
            const q = query(collection(db, "HealthAndInjuries"), where("Id", "==", name))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                this.Reports.push(doc.data())
                this.reportNames.push(doc.id)
            })
            // console.log(this.reportNames);
            // console.log(this.reportNames);
        }
    },     

}

</script>

<style scoped>
#wholegroup {
    overflow: hidden;
    background-color: whitesmoke;
    display: block;
    margin: 0%;
    padding: 5px;
    width: 100%;
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
    float: left;
    width: 50%;
    text-align: center;
    color: black;
    padding: 20px;
}

#firstgroup:hover {
  background-color: whitesmoke;
}

#head {
  text-align: center;
  float: middle;
  color: black;
  padding: 20px;
}

#table {
    background-color: lightblue;
    width:100%;
}

#nameAssessment {
    background-color: lightskyblue;
}

#date {
    background-color: lightyellow;
}

</style>