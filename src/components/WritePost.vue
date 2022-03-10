<template>
   <div>
    
        <!-- write a post -->
        <label for = "writepost"></label>
        <input type = "text" id = "writepost" required = "" placeholder = "Write a post..."> <br><br>
       
    
        <!-- dropdown menu of children -->
        <label for="sendto">Send to:</label>
        <select name="sendto" id="sendto">
            <!-- each option is a name of student in the caregiver's class -->
            <option value="???">Name of Student 1</option>
            <option value="????">Name of Student 2</option>
        </select>

        <!-- upload image -->
        
        <input type = "file" name="image" @change="previewImage">

        <!-- send button -->
        <v-flex class="text-center">
        <v-btn color="pink" @click="create"> Post </v-btn>
        </v-flex>
   </div>
    
</template>

<script>
import { app } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
//import { doc } from "firebase/firestore";
const db = getFirestore(app);
    export default {
        name: "WritePost",

        data() {
            return {
                caption: '',
                img1: '',
                imageData: null
            }
        },

        methods: {
            create() {
                const post = {
                    photo: this.img1,
                    caption:this.caption
                }
                db.database().ref('PhotoGallery').push(post)
                .then((response) => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
            },
        
        click1() {
            this.$refs.input1.click()
        },

        previewImage(event) {
            this.uploadValue=0;
            this.img1=null;
            this.imageData = event.target.files[0];
            this.onUpload()
        },
        
        onUpload(){
            this.img1=null;
            const storageRef = db.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.img1 =url;
                    console.log(this.img1)
                    });
                }      
            );
        },
    }
}

</script>

<style scoped>
#topNav  {
  float: top;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
</style>