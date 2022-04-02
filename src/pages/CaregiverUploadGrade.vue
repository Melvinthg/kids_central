<template>
<div>
    
    <div id="header">
        <div id="firstgroup">
            <router-link to = "/editclassdashboard" className='text-link' style='color:white'>Manage Dashboard</router-link>
        </div>
        <div id="secondgroup">
            <h1>Upload Gradebook</h1><br>
        </div>
    </div>

    <div id="block1">
        <div id="inputs">
            <div id="enterid">
                <h3 style="margin-left:2%">Enter Child ID:</h3>
                <input
                type= "text"
                v-model= "childid"
                placeholder="Enter ID here..."
                style="margin-left:2%; width:300px;">
            </div><br>

            <div id="entertitle">
                <h3 style="margin-left:2%">Enter Test Title:</h3>
                <input
                type= "text"
                v-model= "title"
                placeholder="Enter title here..."
                style="margin-left:2%; width:300px;">
            </div> <br>

            <div id="enterscore">
                <h3 style="margin-left:2%">Enter Score:</h3>
                <input
                type= "text"
                v-model= "score"
                placeholder="Enter score here..."
                style="margin-left:2%; width:300px;">
            </div> <br>

            <div id="date">
                <h3 style="margin-left:2%">Date of Test:</h3>
                <input
                type= "text"
                v-model= "date"
                placeholder="Enter date here in DD/MM/YY format..."
                style="margin-left:2%; width:300px;">
            </div> <br>
        </div>
    
    </div>

    <div>
        <button @click="create" style="margin-left:2%">Upload</button>
    </div>
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
    name: "CaregiverUploadGrade",
    methods: {
        ...mapActions({createGradebook: "createGradebook"}),
        async create() {
        
            const details = {
                childid: this.childid,
                title: this.title,
                score: this.score,
                date: this.date,
                uploader: this.$store.state.userModel.first + " " + this.$store.state.userModel.last,
                uid: auth.currentUser.uid,
            }
            await this.createGradebook(details)
            this.goBack()
        },
        goBack(){
            this.$router.push('/editclassdashboard'); 
        },
    },
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