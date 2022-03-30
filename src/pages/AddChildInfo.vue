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
                <label for = "Address">Address:</label>
                <input type = "text" id = "Address" required placeholder = "Enter Adress"> <br><br>
                <label for = "Gender">Gender:</label>
                <input type = "text" id = "Gender" required placeholder = "Enter gender"> <br><br>
                <label for = "DOB">Date of Birth:</label>
                <input type = "text" id = "DOB" required placeholder = "Enter Date of birth DD/MM/YYYY"> <br><br>
                <label for = "Nationality">Nationality:</label>
                <input type = "text" id = "Nationality" placeholder = "Enter Nationality" required> <br><br>
                <label for = "Allergies">Allergies:</label>
                <input type = "text" id = "Allergies" placeholder = "Enter Allergies / nil" required> <br><br>
                <!-- <label for = "Gender">Gender:</label>
                <select name="Gender" id="Gender" required>
                <option value="">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select><br><br> -->
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
            name : this.$store.state.userModel.childName, 
        }
    },

    methods: {

        async save() {

            const details = {
                 Name : this.name,
                 NRIC : document.getElementById("NRIC").value,
                 Address : document.getElementById("Address").value,
                 Gender : document.getElementById("Gender").value,
                 DOB : document.getElementById("DOB").value,
                 Nationality : document.getElementById("Nationality").value,
                 Allergies : document.getElementById("Allergies").value,
            }
            if (this.checkfilled()) {
                const docRef = await setDoc(doc(db, "students", this.name), details)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                document.getElementById('myform').reset();
                alert("Details Successfully added")
            } else {
                alert("Form not filled properly, please fill in all required fields")
            }
                
        },

        checkfilled() {
            return document.getElementById("NRIC").value.length >= 1
            && document.getElementById("Address").value.length >= 1
            && document.getElementById("Gender").value.length >= 1
            && document.getElementById("DOB").value.length >= 1
            && document.getElementById("Nationality").value.length >= 1
            && document.getElementById("Allergies").value.length >= 1
        },
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
#gender {
    float:center;
}
</style>
