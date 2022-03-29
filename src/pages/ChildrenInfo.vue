<template>
  <div id = "header">
    <div id = "firstgroup">
      <router-link to ="/home" className = "text-link" style = 'color:white'> Home page
      </router-link>
    </div>
  </div>

  <div>
    <div id = "secondgroup">
      <h1>Currently Viewing : {{name}}'s Profile</h1> <br>
    </div>
  </div>
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
    }
  },

  methods: {

    async getInfos() {
      console.log("hi")
      console.log(name)
      const q = query(collection(db, "students"), where("Full Name", "==", name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.Reports.push(doc.data());
        console.log("hi")
      })
    }
  },
}

</script>
<style scoped>

</style>