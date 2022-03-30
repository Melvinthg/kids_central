<template>
  <div class="layout">
    <el-container>
      <el-header id = "topbar">
        <div id = "btn">
          <el-button type="primary" @click="$router.push('home')"> <el-icon><Back /></el-icon> </el-button>
        </div>
        <div id = "selecteduser">
          <h3>  Chatting with: {{receipientSelectedUserFirstName}}  </h3>
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
          <el-main>
          <ul>
              <Message
                v-for="{ senderID, receiverID, message, time } in messageList"
                v-bind:key="time"
                :name="receiverID"
                :sender="senderID"
                :message="message"
                :time="time"
                :senderId2="$store.state.userModel.first"
              />
            </ul>
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
</template>

<script>
import Message from '../components/Message.vue'
import { db } from "../firebase.js";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { Back} from "@element-plus/icons-vue";

export default {
    name: "ContactParent",
    data() {
         return {
            userList : [],
            message: null,
            messageList: [],
            receipientSelectedUserFirstName : '',
            currentSelectedUserFirstName: '',
            senderID: this.$store.state.userModel.first,
            receiverID: '',
        }
    },
    mounted() {
      this.getUserList();
    },
    components : {
      Message,
      Back
    },
    methods: {

      selectUser(user) {
        console.log('user was selected', user);
        var receipientUser = user;
        this.receiverID = receipientUser.first;
        this.receipientSelectedUserFirstName = receipientUser.first + ' '  + receipientUser.last;
        this.displaychat(user);
        },
        
      async getUserList() {
        const q = await getDocs(collection(db, "users"))
        q.forEach((doc) => {
          var data = doc.data();
          if (data.type == "teacher") {
            this.userList.push(data);
          }
        });
      },

      async send() {
          const msg = {
              message: this.message,
              senderID: this.senderID,
              receiverID: this.receiverID,
              time: Date.now()
          };
          this.messageList.push(msg);

          addDoc(collection(db, "messages"), msg)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
            this.message = "";

      },

      async displaychat(user) {
        console.log('displaycahr called')
        const userSendQuery = query(collection(db, "messages"),
        where("senderID", "==", this.senderID),
        where('receiverID', '==', user.first));
        const querySend = await getDocs(userSendQuery);             
        
        const userReceiveQuery = query(collection(db, "messages"),
        where("senderID", "==", user.first),
        where('receiverID', '==', this.senderID));

        const queryReceive = await getDocs(userReceiveQuery);
        var messageList = [];
        querySend.forEach((doc) => {
          messageList.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
        queryReceive.forEach((doc) => {
          messageList.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
        this.messageList = messageList.sort((a,b)=>a.time > b.time ? 1 : -1);
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

.back1 {
  float: left;
  font-size: 20px;
  text-align: center;
  color: blue;
}
</style>