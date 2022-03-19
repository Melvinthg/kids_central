<template>
    <form  class="login" @submit.prevent = "login">
    <h1>Login to your account</h1>
    <p>    <input type = "text" placeholder = "Email" v-model = "login_form.email"/></p>

    
    <p><input type = "password" placeholder = "Password" v-model = "login_form.password"/></p>
    <p>
        <input type = "submit" value = "Sign In"/>
    </p>
</form>

</template>

<script>
    import {ref } from "vue"
    import {useStore} from "vuex"
    export default {
        name:"Login",
        setup() {
          const login_form = ref({})
          const store = useStore();
          const login = () => {
            store.dispatch('login', login_form.value)
          }

          return {
            login_form,
            store,
            login
          }
        }
    }
</script>

<style scoped>
input {
  border-style: solid;
  border-color: CadetBlue;
  border-width: 1px;
  border-radius: 8px;
  margin: 8px;
  padding: 4px;
}
.login {
  text-align: center;
}
</style>