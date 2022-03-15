<template>
<div class ="forumtopbar">
        <ForumCreatePostTopBar></ForumCreatePostTopBar>
</div>
<div>
    <h1>TESTING</h1>
</div>

<form  class="forumcreatepost" @submit.prevent = "post">
    <p><input type = "text" placeholder = "Enter Title of Post..." v-model = "forumcreatepost_form.title"/></p>
    <p><input type = "text" size="100" style="white-space: pre-line;" placeholder = "Type your post here..." v-model = "forumcreatepost_form.text"/></p>
    <!-- <p><input type="file" id="myFile" name="filename" accept="image/*"></p> -->
    <div >
           <button @click="click1">choose photo</button>
           <input type="file" ref="input1"
           style="display: none"
           @change="previewImage"
            accept="image/*" >                
         </div>
 
       <button color="pink" @click="create">upload</button> 
    <p>
        <input type = "submit" value = "Post"/>
    </p>
</form>

</template>

<script>
import ForumCreatePostTopBar from '@/components/ForumCreatePostTopBar.vue'
import {ref} from "vue"
import {useStore,} from "vuex"
import { db } from "../firebase.js";
import {addDoc, collection} from "firebase/firestore"

    export default {
        name:"ForumCreatePost",
        components: {
            ForumCreatePostTopBar
        },

        data () {
            return {
            // caption : '',
            img1: '',
            imageData: null
            }
         },
                
        methods: {
            async create () {
            console.log("create")
            console.log(this.img1)
            const img = {
                photo: this.img1,     
            }
            await addDoc(collection(db, "images"), img);
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
            async onUpload(){
            this.img1=null;
            const imgDataObj = Object.assign({}, this.imageData);
            const storageRef = await addDoc(collection(db, `${this.imageData.name}`), imgDataObj);
            console.log(storageRef)
            storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log("HEREEEE")
                    this.img1 =url;
                    console.log(this.img1)
                    });
                }      
                );
            },
        },
        setup() {
          const forumcreatepost_form = ref({})
          const store = useStore();
          const post =  () => {
              console.log(forumcreatepost_form.value)
             store.dispatch('forumCreatePost', forumcreatepost_form.value)
           }
         
          return {
            forumcreatepost_form,
            store,
            post
          }
        },
    }
</script>


<style template>
input {
  border-style: solid;
  border-color: CadetBlue;
  border-width: 1px;
  border-radius: 8px;
  margin: 8px;
  padding: 4px;
}
.register {
  text-align: center;
}
</style>