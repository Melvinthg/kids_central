<template>
<form  class="register" @submit.prevent = "register">
    <h1>Register</h1>
    <p>    <input type = "text" placeholder = "Email" v-model = "register_form.email"/></p>

    
    <p><input type = "password" placeholder = "Password" v-model = "register_form.password"/></p>
    <p>
        <input type = "submit" value = "Register"/>
    </p>
</form>

  

</template>

<script>
import {ref } from "vue"
import {useStore} from "vuex"
    export default {
        name:"Signup",
        setup() {
          const register_form = ref({})
          const store = useStore();
          const register = () => {
            store.dispatch('register', register_form.value)
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

</style>