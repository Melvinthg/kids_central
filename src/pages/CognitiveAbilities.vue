<template>
<div id="header">
        <div id="firstgroup">
            <el-button type = "primary" @click ="this.$router.go(-1)">Back </el-button>
        </div>
        <div id="secondgroup">
            <img id = "pic" src="@/assets/Cognitive.png" alt="">
            <h1 id = "title">Cognitive abilities page</h1><br>
        </div>
</div>
<div id="mainContent">
          <div id = "text"><h1><b>{{displaytext}}</b></h1></div>
          <el-card class="box-card" v-if="boo">
           <ul v-for="x in Reports" :key="x">
         <div id = "title2"><li><h2><b>{{x.title}}</b></h2></li></div>
         <hr>
         <li><h3>{{x.text}}</h3></li>
         <li id = "time"><h5>{{x.date.toDate().toString().slice(4,16)}}</h5></li>
         <br>
     </ul>
  </el-card>
</div>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {

  data() {
    return {
      type : this.$store.state.userModel.type, 
      Reports: [],
      boo: false,
      displayName: "",
      displaytext: "No Reports at the moment",
      name: this.$store.state.userModel.first + " " + this.$store.state.userModel.last,
      childID: "",
      childName: "",
    }
  },

  methods: {

    //search for student id wrt to name of user then get corresponding report
    async getInfo() {
       if (this.type == "teacher") {
        this.childID = this.$route.params.id;
        const q = query(collection(db, "students"), where("childID", "==", this.childID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        this.childID = doc.data().childID;
        this.childName = doc.data().childName;
        });
      } else {
        const q = query(collection(db, "students"), where("Name", "==", this.name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        this.childID = doc.data().childID;
        this.childName = doc.data().childName;
      });
      }
      const x = query(collection(db, "reports"), where("childID", "==", this.childID), where("category", "==", "cognitiveabilities"));
      const y = await getDocs(x);
      y.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.Reports.push(doc.data());
      })
      if (this.Reports.length > 0) {
        this.boo = true;
        this.displaytext = "Viewing: " + this.childName + "'s reports";
      }
    },
  },

  created() {
    this.getInfo();
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
#header :hover {
  background-color: transparent;
}
#title {
  float:middle;
  text-align:center;
  padding:30px;
}
#firstgroup {
  font-size: 25px;
  padding:40px
}
#secondgroup{
    float: left;
    width: 50%;
    text-align: center;
    color: white;
    padding: 10px;
    line-height: 0px;
}

#btn {
  color: white;
  font-size: 20px;
}
#pic {
    float:right;
    width:80px;
    margin-top: 10px;
} 
#text {
  text-align: center;
  margin-right: 50px;
}

ul {
  list-style-type: none;
}

ul li {
  margin-bottom:10px;
}
#time {
  text-align: right;
}
</style>