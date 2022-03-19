<template>
<form  class="register" @submit.prevent = "register">
    <h1>Register as a Parent</h1>
    <p><input type = "text" placeholder = "Email" v-model = "register_form.email"/></p>

    
    <p><input type = "password" placeholder = "Password" v-model = "register_form.password"/></p>
    <p><input type = "first" placeholder = "First Name" v-model = "register_form.first"/></p>
    <p><input type = "last" placeholder = "Last Name" v-model = "register_form.last"/></p>
    <p><input type = "childName" placeholder = "Child Name" v-model = "register_form.childName"/></p>
    <p><input type = "childClass" placeholder = "Child Class" v-model = "register_form.childClass"/></p>
    <p><input type = "childID" placeholder = "Child ID" v-model = "register_form.childID"/></p>
    
    <p>
        <input type = "submit" value = "Register"/>
    </p>
</form>


  

</template>

<script>
import {ref } from "vue"
import {useStore,} from "vuex"
// import {db} from '../firebase.js'
// import {doc, setDoc} from "firebase/firestore"

    export default {
        name:"SignupParent",
        
        
        methods: {
          async test() {
            
          //  await db.collections("dab").set({form : this.register_form})
          }
        },
        setup() {
          const register_form = ref({})
          const store = useStore();
          const register =  () => {
             store.dispatch('registerParent', register_form.value)
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
</style>