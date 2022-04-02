<template>
    <div id="header">
        <div id="firstgroup">
            <router-link to = "/ChildrenInfo" className='text-link' style='color:white'>Back</router-link>
        </div>
        <div id="secondgroup">
            <h1>Update Child Info</h1><br>
        </div>
    </div>
<br><br>
    <form id = "myform">
            <div class = "formli">
                <label for = "NRIC">NRIC:</label>
                <input type = "text" id = "NRIC" required placeholder = "Enter NRIC"> <br><br>
                <!-- <label for = "Id">Id:</label>
                <input type = "Id" id = "Id" required placeholder = "Enter student Id"> <br><br> -->
                <label for = "Address">Address:</label>
                <input type = "text" id = "Address" required placeholder = "Enter Adress"> <br><br>
                <label for = "DOB">Date of Birth:</label>
                <input type = "text" id = "DOB" required placeholder = "Enter DD/MM/YYYY"> <br><br>
                <label for = "Nationality">Nationality:</label>
                <input type = "text" id = "Nationality" placeholder = "Enter Nationality" required> <br><br>
                <label for = "Allergies">Allergies:</label>
                <input type = "text" id = "Allergies" placeholder = "Enter Allergies / nil" required> <br><br>
                <label for="Class" style="float:middle">Class:</label>
                <select id="Class" name = "Class"> 
                <option value ="2J">2J</option>
                <option value ="2K">2K</option>
                </select>
                <label for="Gender" style="margin-left:20px;">Gender:</label>
                <select id="Gender" name = "Gender"> 
                <option value ="Male">Male</option>
                <option value ="Female">Female</option>
                </select>
                <br><br>
                
                <div class = "save">
                    <el-button  input type ="submit" plain @click="save()">Update</el-button>
                </div>
            </div>
        </form>
               
</template>

<script>
import { db } from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
export default {
    name:"AddChildInfo", 
    data() {
        return {
            name : this.$store.state.userModel.first + this.$store.state.userModel.last, 
            childID: "",
        }
    },
    // change document id from name to student id, add field parent email
    methods: {
        async save() {
            this.childID = "";
            if (this.validNRIC()) {
                this.childID += document.getElementById("Class").value + document.getElementById("NRIC").value.toUpperCase().slice(5, 9);
            }
            const details = {
                 Name : this.name,
                 NRIC : document.getElementById("NRIC").value.toUpperCase(),
                 Address : document.getElementById("Address").value,
                 Gender : document.getElementById("Gender").value,
                 DOB : document.getElementById("DOB").value,
                 Nationality : document.getElementById("Nationality").value,
                 Allergies : document.getElementById("Allergies").value,
                 Class : document.getElementById("Class").value,
                 childID : this.childID,
                 parentEmail : this.$store.state.userModel.email,
            }

            if (!this.validNRIC()) {
                alert("Enter valid NRIC");
            } else if (!this.isValidDate()) {
                alert("Enter valid date of birth based on format provided")
            }
            else if (this.checkfilled()) {
                const docRef = await setDoc(doc(db, "students", this.childID), details)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                document.getElementById('myform').reset();
                console.log("Added Successfully");
                alert("Details Successfully added")
            } else {
                alert("Form not filled properly, please fill in all required fields")
            }
                
        },

        isCharNumber(c) {
            return c >= '0' && c <= '9';
        },

        validNRIC() {
            let a = document.getElementById("NRIC").value;
            if (a.length == 9) {
                return !this.isCharNumber(a.charAt(0)) && 
                !this.isCharNumber(a.charAt(a.length - 1)) && this.isCharNumber(a.charAt(1)) &&
                this.isCharNumber(a.charAt(2)) && this.isCharNumber(a.charAt(3)) && this.isCharNumber(a.charAt(4)) &&
                this.isCharNumber(a.charAt(5)) && this.isCharNumber(a.charAt(6)) && this.isCharNumber(a.charAt(7)); 
            } else {
                return false;
            }
        },

        checkfilled() {
            return document.getElementById("Address").value.length >= 1
            && document.getElementById("DOB").value.length >= 1
            && document.getElementById("Nationality").value.length >= 1
            && document.getElementById("Allergies").value.length >= 1
        },

        isValidDate() {
            let b =document.getElementById("DOB").value;
            if (b.length == 10) {
                return this.isCharNumber(b.charAt(0)) && this.isCharNumber(b.charAt(1)) &&
                this.isCharNumber(b.charAt(3)) && this.isCharNumber(b.charAt(4))
                && this.isCharNumber(b.charAt(6)) && this.isCharNumber(b.charAt(7))
                && this.isCharNumber(b.charAt(8)) && this.isCharNumber(b.charAt(9))
                && b.charAt(2) == '/' && b.charAt(5) == '/'
            } else {
                return false;
            }
        }

    }
}
</script>

<style scoped>
.formli {
    display: inline-block;
    text-align: right;
}
form {
    text-align: center;
    align-items: center;
    margin: auto;
}
.save {
    text-align: center;
}
</style>
