<template>
    <div>
        Signup
    </div>
    <p>    <input type = "text" placeholder = "Email" v-model = "email"/></p>

    
    <p><input type = "password" placeholder = "Password" v-model = "password"/></p>
    <p>
        <button @click = "register">Submit</button>
    </p>

</template>


    
<script>


export default {
     name:"Signup",
  // data() {
  //   return {
  //     form: {
        
  //       email: "",
  //       password: ""
  //     },
  //     error: null
  //   };
  // },
  // methods: {
  //   submit() {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(this.email, this.password)
  //       .then(data => {
  //         data.user
  //           .updateProfile({
  //             displayName: this.form.name
  //           })
  //           .then(() => {});
  //       })
  //       .catch(err => {
  //         this.error = err.message;
  //       });
  //   }
  // }
};
</script>

<style template>

</style>