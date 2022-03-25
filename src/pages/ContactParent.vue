<template>

  <div class="layout">
    <el-container>
      <el-header id = "topbar">
        <div id = "btn">
          <el-button type="primary" @click="$router.push('home')"> <el-icon><Back /></el-icon> </el-button>
        </div>
        <div id = "selecteduser">
          <h3>  Talking to: {{receipientSelectedUserFirstName}}  </h3>
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
          <el-main> <h3>  messages to be displayed here  </h3>
          <!-- :data="messageData"  -->
          
          </el-main>
          <el-footer>
                <el-input
                  id="message"
                  ref="type"
                  v-model="message"
                  :rows="2"
                  v-on:keyup.enter="send()"
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
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Back} from "@element-plus/icons-vue";
// ignore all these, can uncomment if need to use
// import { db, app } from "../firebase.js";
//import { getAuth } from "firebase/auth";
// import {serverTimestamp} from "firebase/firestore";
//import { addDoc, getFirestore, collection, getDocs, Timestamp } from "firebase/firestore";
// import { ref } from 'vue'
// import { doc, setDoc } from "firebase/firestore";
// const db = getFirestore(app);
//const messagesCollection = getFirestore(app).collection("messages")
// const app = firebase.initializeApp(firebaseConfig);
//const auth = getAuth();

export default {
    name: "ContactParent",

    data() {
         return {
            userList : [],
            message: null,
            messageData: [],
            receipientSelectedUserFirstName : '',
            currentSelectedUserFirstName: '',
            senderID: this.$store.state.userModel.first,
            receiverID: '',
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
        var receipientUser = user;
        this.receiverID = receipientUser.first;
        this.receipientSelectedUserFirstName = receipientUser.first + ' '  + receipientUser.last;
        // this.messageData = displaychat();
        },
        
      async getUserList() {
        const q = await getDocs(collection(db, "users"))
        q.forEach((doc) => {
          var data = doc.data();
          // need to filter out against type = teacher/parent
          if (data.type == "parent") {
            this.userList.push(data);
          }
        });
        // console.log(userNames);
      },

      async send() {
          const msg = {
              message: this.message,
              senderID: this.senderID,
              receiverID: this.receiverID,
              //idk whether use date or Timestamp btr
              time: new Date()
              // time: serverTimestamp()
          };

          addDoc(collection(db, "messages"), msg)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
          this.$ref.type.reset();
      },
    
      // click1() {
      //     this.$refs.input1.click()
      // },

      // typing() {
      //   this.$refs.type.value = this.message;
      // },

      //have yet to sort out the display function
      async displaychat() {
        var query = getDocs(collection(db, "messages"));
        // query = query.where("receiverID", "==", this.currentSelectedUserFirstName)
        // query = query.where("senderID", "==", this.auth.currentUser.first)
        this.messageData = [];
        query.forEach((doc) => {
          var data = doc.data();
          if (data.receiverID == String(this.currentSelectedUserFirstName) && data.receiverID == String(this.auth.currentUser.first)) {
            this.messageData.push(data);
            this.messageData.orderBy('time');
          }
        })
        console.log(this.messageData);
      }
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

