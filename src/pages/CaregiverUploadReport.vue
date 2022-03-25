<template>
    <div id="header">
        <div id="firstgroup">
            <router-link to = "/home" className='text-link' style='color:white'>Manage Dashboard</router-link>
        </div>
        <div id="secondgroup">
            <h1>Upload Report</h1><br>
        </div>
    </div>
    <div id="block1">
        <div id="inputs">
            <div id="enterid">
                <h3 style="margin-left:2%">Enter Student ID:</h3>
                <input
                type= "text"
                v-model= "studentid"
                placeholder="Enter Details..."
                style="margin-left:2%">
            </div><br>

            <div id="entertitle">
                <h3 style="margin-left:2%">Enter Title:</h3>
                <input
                type= "text"
                v-model= "title"
                placeholder="Enter Details..."
                style="margin-left:2%">
            </div> <br>
        </div>
    

        <div id="selectcategory">
            <h3 style="margin-left:2%">Select Category:</h3>
            <input
            type="radio"
            id="injuriesandhealth"
            value="injuriesandhealth"
            v-model= "category"
            style="margin-left:2%">
            <label for="injuriesandhealth">Injuries and Health</label><br>

            <input
            type="radio"
            id="cognitiveabilities"
            value="cognitiveabilities"
            v-model= "category"
            style="margin-left:2%">
            <label for="cognitiveabilities">Cognitive Abilities</label>

        </div>
    </div>

    <div id="typereport">
        <textarea
        v-model= "text"
        placeholder="Type your report here..."
        cols="90"
        style="margin-left:2%">
        </textarea>
    </div> <br>
    <div>
        <button @click="create" style="margin-left:2%">Upload</button>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/compat/app';
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from "../firebase.js";
// eslint-disable-next-line no-unused-vars
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import {useStore, mapActions, mapState} from "vuex"
// eslint-disable-next-line no-unused-vars
import { ref } from "vue";
export default {
    name: "CaregiverUploadReport",
    // data () {
    //     return {
    //     title: '',
    //     text: '',
    //     image: null,

    //     }
    // },
    methods: {
        ...mapActions({createReport: "createReport"}),
        async create() {
        
        const details = {

            studentid: this.studentid,
            title: this.title,
            category: this.category,
            text: this.text,
            time: new Date(),
            uid: auth.currentUser.uid,
        }
        await this.createReport(details)
        this.goBack()
        }
    },
    goBack(){
        this.$router.push('/home'); 
    }
}
</script>

<style>
#header {
    overflow: hidden;
    background-color: rgb(7, 119, 172);
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
#firstgroup:hover {
  background-color: black;
}
#block1 {
    display: block;
    line-height: 40px;
}

#typereport {
    display: block;
    float:left;
    line-height: 40px;

}
</style>