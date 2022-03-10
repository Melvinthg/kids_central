<template>
    <div id="uploadImg">
        <v-layout row>
            <v-flex md6 offset-sm3 class="textcenter">
                <v-text-field solo v-model="caption" label="Write a post here..."></v-text-field>
            </v-flex>
            <v-btn @click="click1">Choose a photo</v-btn>
            <input type = "file" name="image" @change="previewImage">
        </v-layout>
        <!-- <v-btn @click="click1">Choose a photo</v-btn>
        <input type = "file" name="image" @change="previewImage"> -->
    </div>
</template>

<script>
// import firebase from 'firebase';
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
    export default {
        name: "UploadImage",

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
                doc.database().ref('PhotoGallery').push(post)
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