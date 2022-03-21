<template>

  <div class="layout">
    <el-container>
      <el-header id = "topbar">
        <div id = "btn">
          <el-button type="primary" @click="$router.push('home')"> <el-icon><Back /></el-icon> </el-button>
        </div>
        <div id = "selecteduser">
          <h3>  Talking to: {{currentSelectedUserDisplayName}}  </h3>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
        <h3> ChatList </h3>
          <el-table :data="userList" @current-change="selectUser">
            <el-table-column prop="first" label="Parents:"> </el-table-column>
          </el-table>
        </el-aside>

        <el-container>
          <el-main> <h3>  messages to be displayed here  </h3> </el-main>
          <el-footer>
                <el-input
                  id="message"
                  ref="type"
                  v-model="message"
                  :rows="2"
                  v-on:keydown="typing()"
                  type="textarea"
                  placeholder="Type your message here..."
                />
            <el-button type="primary" @click="send" style ="float: right"> Send </el-button>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>

  <router-view></router-view>
</template>

<script>
import { db } from "../firebase.js";
// import { db, app } from "../firebase.js";
import { getAuth } from "firebase/auth";
// import {serverTimestamp} from "firebase/firestore";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
//import { addDoc, getFirestore, collection, getDocs, Timestamp } from "firebase/firestore";
// import { ref } from 'vue'
// import { doc, setDoc } from "firebase/firestore";
// const db = getFirestore(app);
//const messagesCollection = getFirestore(app).collection("messages")
// const app = firebase.initializeApp(firebaseConfig);
import {
  Back,
} from "@element-plus/icons-vue";
const auth = getAuth();

export default {
    data() {
         return {
            userList : [],
            message: '',
            messageData: null,
            currentSelectedUserDisplayName : '',
            currentSelectedUserFirstName: '',
            user: auth.currentUser,
        }
    },
    mounted() {
      this.getUserList();
    },

    components: {
      Back,
    },

    methods: {

      selectUser(user) {
        console.log('user was selected');
        var currentUser = user;
        this.currentSelectedUserFirstName = currentUser.first;
        this.currentSelectedUserDisplayName = currentUser.first + ' '  + currentUser.last;
        },
        
      async getUserList() {
        // var userNames = [];
        const q = await getDocs(collection(db, "users"))
        console.log(q);

        //const querySnapshot = await getDocs(q);
        q.forEach((doc) => {

          // need to filter out against current type (auth):Teacher
          // need to filter out MY own name via getAUTH
          var data = doc.data();
          // console.log(data.first);
          console.log(data);
          if (data.type == "parent") {
            this.userList.push(data);
          }
          // userNames.push(data.first);
          // this.userList.push(data);
        });
        // console.log(userNames);
        // this.userList = userNames;
      },

      send() {
          const msg = {
              message: this.message,
              senderID: auth.currentUser.first,
              receiverID: this.currentSelectedUserFirstName,
              time: Timestamp
              // time: serverTimestamp()
          };
          
          addDoc(collection(db, "messages"), msg)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
      },
    
      click1() {
          this.$refs.input1.click()
      },

      typing() {
        this.$refs.type.value = this.message;
      },

    }
}
</script>

<style>
#topbar {
    overflow: hidden;
    background-color: rgb(0, 238, 255);
    display: block;
    margin: 0%;
    padding: 5px;
    width: 100%;
}

#btn {
  float: left;
  width: 10%;
  color: blue;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
}

#selecteduser {

    width: 90%;
    text-align: center;
    color: Black;
    padding: 10px ;
}

</style>

