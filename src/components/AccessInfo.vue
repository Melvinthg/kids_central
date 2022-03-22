<template>
   <div id = input></div>
   <div id = search> <input type = "text" placeholder = "Search by name..." > </div>
   <button id = button v-on:click = "search()">Search</button>
   <table>
       <tr v-for="student in students" :key="student.name">
           <td>{{student.name}}</td>
           <td>{{student.NRIC}}</td>
           <td>{{student.Age}}</td>
           <td>{{student.Address}}</td>
        </tr>
    </table>
</template>

<script>

import { db } from "../firebase.js";
//import { collection, getDocs } from "firebase/firestore";

export default {
    
    name: "AccessInfo",

    data() {
        return {
            students: [],
            name: null, 
            NRIC: null,
            Address: null,

        }
    },

    methods: {
        async search() {
            db.collections("students").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.students.push(doc.data());
                })
            })
            //const querySnapshot = await getDocs(collection(db, "students"));
            //querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());});
        }
    }
   
}

</script>

<style scoped>

</style>
