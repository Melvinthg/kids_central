<template>
    <div id="header">
        <div id="secondgroup">
            <h1>Class Info</h1><br>
        </div>
    </div>

      <div>
          <span>Select Class: </span>
          <el-select 
            v-model = "value"
            placeholder="Select Class"
            style="width: 150px; margin-right: 10px"
            class = "m-2"
          >
          <el-option @click="getClass()"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />

          </el-select>
      </div>

      <div v-if = "boo">
       <el-row>    
    <el-col :span="1"></el-col>
    <el-col :span="16"><h2><b>{{this.displayText}}</b></h2></el-col>
    <el-col :span="7"><h2><b>{{this.displayRight}}</b></h2></el-col>
    <!-- <el-col :span="6">22</el-col> -->
  </el-row>
      </div>
        <el-card class="box-card" v-for="x in Reports" :key="x">
        <div id ="headerContainer">
            <b><span id = "childName">{{ x.childName }}</span></b>
        </div>
        <div v-if="boo" id="informationCard">
          <el-row>
    <el-col :span="12" class ="infoField">Child Id : <span class = "info">{{x.childID}}</span></el-col>
    <el-col :span="12" class ="infoField">NRIC : <span class = "info">{{x.NRIC}}</span></el-col>
    <el-col :span="12" class ="infoField">Class : <span class = "info">{{x.Class}}</span></el-col>
    <el-col :span="12" class ="infoField">Address : <span class = "info">{{x.Address}}</span></el-col>
    <el-col :span="12" class ="infoField">Gender : <span class = "info">{{x.Gender}}</span></el-col>
    <el-col :span="12" class ="infoField">DOB : <span class = "info">{{x.DOB}}</span></el-col>
    <el-col :span="12" class ="infoField">Nationality : <span class = "info">{{x.Nationality}}</span></el-col>
    <el-col :span="12" class ="infoField">Allergies : <span class = "info">{{x.Allergies}}</span></el-col>   
  </el-row>
      </div>
  </el-card>

</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { ref } from 'vue'

export default {
    data() {
        return {
            boo: false,
            classBoo : false,
            Reports: [],
            className: "",
            displayText: "",
            displayClass: "Select Class",
            value : ref(''),
            numStudents : 0,
            displayRight: "",
            options : [
        {
          value: '2J',
          label: '2J',
        },
        {
          value: '2K',
          label: '2K',
        },
      ],
        }
    },
    methods: {
        async getClass() {
            this.classBoo = false;
            this.Reports = [];
            this.className = this.value;
            this.boo = true;
            this.classBoo = true;
            const q = query(collection(db, "students"), where("Class", "==", this.className));
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                this.Reports.push(doc.data())
                    //Reports of array with objects to access loop it / Reports[num] to access specific element .element
            })
            this.numStudents = this.Reports.length;
            this.displayText = "Currently Viewing : " + this.className;
            this.displayRight = "Class Size : " + this.numStudents;

        },
    }
}
</script>

<style scoped>
#cv {
    float:middle;
    margin-left: 30px;
}
#secondgroup {
    margin-left: 230px;
}
#informationCard {
  border-radius: 8px;
  border: 1px solid lightskyblue;
  margin-top: 16px;
}
.box-card {
  padding: 0px;
  margin: 24px;
  background-color: rgb(255, 255, 250, 0.4);
  border-radius: 8px;
}

#headerContainer {
  display: flex;
  flex-direction: row;

  border: 1px solid lightskyblue;
  background-color: rgb(135, 206, 250, 0.2);
  border-radius: 8px;
  padding: 0px 0px 24px 24px;
}
.card-header {
  text-align: center;
  font-size: 32px;
  border-radius: 0px;
}
.infoField {
  font-size: 24px;
  font-weight: 550;
}
#childName {
  font-size: 32px;
  margin-top: 200px;
}
.info {
  color: #2470b7;
}
</style>