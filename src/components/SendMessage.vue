<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Type your message here...">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="send">Send Message</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { app } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
//const messagesCollection = getFirestore(app).collection("messages")

export default {
    name : "SendMessage",

    data() {
        return {
            message: '',
            messageData: null
        }
    },

    methods: {
        send() {
            const auth = getAuth();
            const user = auth.currentUser;
            const msg = {
                message: this.message,
                senderID: user.first,
                //receiverID: Timestamp,
                time: Timestamp
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