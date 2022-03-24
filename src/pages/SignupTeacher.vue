<template>
<div id = "header">Register as a Teacher</div>
<form  class="register" @submit.prevent = "register">
    <div class="rows">
      <div class="column">
  <input class = "textField" type = "text" placeholder = "Email" v-model = "register_form.email"/>
    <input class = "textField" type = "password" placeholder = "Password" v-model = "register_form.password"/>
    <input class = "textField" type = "first" placeholder = "First Name" v-model = "register_form.first"/>
      </div>
      <div class="column">
         <input class = "textField" type = "last" placeholder = "Last Name" v-model = "register_form.last"/>
    <input class = "textField" type = "teacherID" placeholder = "Teacher ID" v-model = "register_form.teacherID"/>
    <input class = "textField" type = "teacherClass" placeholder = "Class" v-model = "register_form.teacherClass"/>
      </div>
    </div>
   
   
    
    <p>
        <input type = "submit" value = "Register" id = "submitButton"/>
    </p>
</form>
<div class="row" id ="bottomRow">
  <div id = "redirect">
    <div id="hint">Meant to login?</div>
    <div id="redirectButton" @click = "$router.push('login')">Login Here!</div>
  </div>
</div>


  

</template>

<script>
import {ref } from "vue"
import {useStore,} from "vuex"
// import {db} from '../firebase.js'
// import {doc, setDoc} from "firebase/firestore"

    export default {
        name:"SignupTeacher",
        
        
        methods: {
          async test() {
            
          //  await db.collections("dab").set({form : this.register_form})
          }
        },
        setup() {
          const register_form = ref({})
          const store = useStore();
          const register =  () => {
             store.dispatch('registerTeacher', register_form.value)
          //   store.dispatch('createUser', register_form.value)
           }
         
          return {
            register_form,
            store,
            register
          }
        }
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

#redirectButton {
  font-weight:700;
  color: #2470B7;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  float:right;
  background-color: white;
  margin-left: auto;
  
}
#hint {
  font-size: 24px;
  color: white;
  float: left;
  margin-left: 8px;
  
}
#bottomRow {
  
  justify-content:center;
  
}
#redirect {
  flex-direction:row;
  display:flex;
  align-items: center;
  text-align:center;
  height: 80px;
  border-radius: 8px;
  background-color: #2470B7;
  border: 1px solid #2470B7;
  width: 42%
}
.textField {
  border-style: solid;
  border-color: CadetBlue;
  border-width: 1px;
  border-radius: 8px;
  width: 20vw;
  margin-bottom: 30px;
  padding: 4px;
}

input:focus { 
    outline: none !important;
    
    border-width: 2px;
    border-color: #2470B7;
 }
 .rows {
  justify-content:center;
  text-align: center;
  display: flex;
  flex-direction: row;
  
  

}
.column {
 
  width: 23%;
  flex-direction: column;
}
#header{
  margin-top:70px;
  margin-bottom: 50px;
  font-size: 2.6vw;
  font-weight: 700;
  text-align: center;
  
}

#submitButton {
  background-color: #2470B7;
  color: #FFFFFF;
  column-span: all;
  margin-top: 12px;
  margin-bottom: 24px;
  width: 18vw;  
  height: 50px;
}
#redirectButton:hover,
#redirectButton:focus {
  opacity: 0.9;
        filter: alpha(opacity=100);
}
#submitButton:hover,
#submitButton:focus {
  opacity: 0.9;
        filter: alpha(opacity=100);
}

@media only screen and (max-width: 1500px) {
  .rows {
    flex-direction: column;
    align-items: center;
  }
}
@media only screen and (max-width: 900px) {
  #redirect {
    flex-direction: column;
    align-items: center;
    width: 20vw;
    height: 140px;
  }
  #redirectButton {
    margin-top: 12px;
    margin-right:auto;
    float:center;
  }
}
form{
  margin-top: 24px;
}
</style>