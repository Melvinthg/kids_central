<template>

  <div class="layout">
    <el-container>
      <el-header> 
          <router-link to = "/home" tag = "button" className = "back1"> Back </router-link>
      </el-header>
      <el-container>
        <el-aside width="200px">
        <h3> ChatList </h3>
          <el-table :data="userList" @current-change="selectUser">
            <el-table-column prop="first" label="name"> </el-table-column>
          </el-table>
        </el-aside>

        <el-container>
          <el-main> <h3>  {{currentSelectedUserDisplayName}}  </h3> </el-main>
          <p>messages to be displayed here</p>
          <el-footer>
              <h2> send bar here </h2>
            <el-input v-model="input" placeholder="type your message here..." />
            <el-button type="primary" @click="send"> send </el-button>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>

  <router-view></router-view>
</template>

<script>
import { app } from "../firebase.js";
import { getAuth } from "firebase/auth";
// import {serverTimestamp} from "firebase/firestore";
import { getFirestore, collection, getDocs, Timestamp } from "firebase/firestore";
import { ref } from 'vue'
// import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(app);
//const messagesCollection = getFirestore(app).collection("messages")

export default {
    data() {
         return {
            userList : [],
            message: '',
            messageData: null,
            currentSelectedUserDisplayName : '',
            currentSelectedUserFirstName: '',
        }
    },
    mounted() {
      this.getUserList();
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

      async send() {
          const auth = getAuth();
          const user = auth.currentUser;
          const input = ref('');
          const msg = {
              message: input,
              senderID: user.first,
              receiverID: this.currentSelectedUserFirstName,
              time: Timestamp
              // time: serverTimestamp()
          }
          
          db.database().ref('messages').push(msg)
          .then((response) => {
              console.log(response)
          })
          .catch(error => {
              console.log(error)
          })
          // need to clear msg box
      },
    
      click1() {
          this.$refs.input1.click()
      },

    }
}

</script>
<style>

.back1 {
  float: left;
  font-size: 20px;
  text-align: center;
  color: blue;
}

</style>

