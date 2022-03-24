<template>

 <div id="wholegroup">
     <div id="firstgroup">
        <router-link to = "/home" className='text-link'>Back</router-link>
     </div>
     <div id="secondgroup">
         <h1>Children info page</h1><br>
         <h1>STILL IN THE MIDST OF DOING</h1>
     </div>
 </div>

  <div>
    <h2 id = "head"><b> Search for students results</b></h2>
    <br>
      <input type="text" placeholder = "input student id...">
      <button button @click = "getStudentGrades('Bob')">Submit</button>
      <button button @click = "test()">test for add</button>
            <button button @click = "test2('')">test2 for retreive ctryn</button>


      <div>{{List}}{{List2}}</div>
  </div>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, setDoc, doc, where } from "firebase/firestore";

export default {

  data() {
      return {
        List: [],
        List2: [],
      }
    },

    mounted() {
      this.getList;
    },

    methods: {
      async getStudentGrades() {
        this.List = [];
        this.List2 = [];
        const q = query(collection(db, "studentsResult"), where("Id", "==", "Bob"), where("test1", "==", "8"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.List.push((doc.id));
        this.List2.push(doc.data())
    });
      console.log(this.List2.filter(x => x == "Bob"));
      }, 
      
      async test() {
            const citiesRef = collection(db, "cities");

        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"] });
        await setDoc(doc(citiesRef, "LA"), {
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"] });
        await setDoc(doc(citiesRef, "DC"), {
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000,
            regions: ["east_coast"] });
        await setDoc(doc(citiesRef, "TOK"), {
            name: "Tokyo", state: null, country: "Japan",
            capital: true, population: 9000000,
            regions: ["kanto", "honshu"] });
        await setDoc(doc(citiesRef, "BJ"), {
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000,
            regions: ["jingjinji", "hebei"] });
      },

      async test2() {
        this.List2 = [];
        const q = query(collection(db, "cities"), where("country", "==", "Japan"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.List2.push(doc.data())
        console.log(this.List2)
      });
      console.log(this.List2.length)
      },
    
    //   async getStudentGrades() {
    //   const q = await getDocs(collection(db, "studentsResult"))
    //   console.log(q)
    //   q.forEach((doc) => {
    //     var data = doc.data();
    //     console.log(data);
    //     this.List.push(data);
    //   })
    // },
    // async getStudentsInClass(context, className) {
    //   //console.log(password)
    //   const studentsList = [];
    //   console.log(context);
    //   const classRef = collection(db, "classes", className, "students");
    //   const classSnap = await getDocs(classRef);
    //   console.log(classSnap.docs);
    //   //console.log(classSnap.)
    //   //const classesCollection = await getDocs(collection(db, "classes"))
    //   classSnap.forEach((e) => {
    //     const x = e.data();
    //     studentsList.push(x);
    //   });

    //   return studentsList;
    // },

  }
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
</style>