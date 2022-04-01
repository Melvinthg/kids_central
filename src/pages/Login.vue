<template>
  <form class="login" @submit.prevent="login">
    <div class="loginRows">
      <div class="loginColumn" id = "fields">
        <div id ="header">Login to your account</div>
        <input
          class="textField"
          type="text"
          placeholder="Email"
          v-model="login_form.email"
        />
        <input
          class="textField"
          type="password"
          placeholder="Password"
          v-model="login_form.password"
        />
        
          <input type="submit" id = "submitButton" value="Sign In" />
        
      </div>
      <div class="loginColumn" id = "imageColumn">
        <img src="https://marcprensky.com/wp-content/uploads/2020/06/07-Kid-Asian-Alamy-XDKY6P.jpg" alt="">
      </div>
    </div>
  </form>

  <div class="row" id ="bottomRow">
  <div id = "redirectLogin">
    <div id="hint">Don't have an account?</div>
    <div class = "redirectButton" id="redirectParent" @click = "$router.push('signupparent')">Sign up<br>as a parent</div>
    <div class = "redirectButton" id="redirectTeacher" @click = "$router.push('signupteacher')">Sign up<br>as a teacher</div>
  </div>
</div>
  <!-- <button @click = 'this.test("BT3103")'>test</button> -->
</template>

<script>
import { ref } from "vue";

// import { db } from "../firebase.js";
// import { doc, getDoc, } from "firebase/firestore";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const login_form = ref({});
    const store = useStore();
    const login = () => {
      store.dispatch("login", login_form.value);
    };

    //  const test = () => {
    //    console.log("xd")
    //     store.dispatch("getStudentsInClass")}
    return {
      login_form,
      store,
      login,
      // test,
    };
  },
  methods: {
    //...mapActions({test: 'getStudentsInClass', test1 : "getStudentsInClass"}),
  },
};
</script>

<style scoped>
#fields{
  display:flex;
  flex-direction: column;
  align-items: left;
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

.login {
  text-align: center;
}
img {
  
  opacity: 0.5;
  border-radius: 8px;
  width: 100%;
height: 500px;
}

input {
  border-style: solid;
  border-color: CadetBlue;
  border-width: 1px;
  border-radius: 8px;
  
  padding: 4px;
}
.register {
  text-align: center;
}

#redirectParent {
  font-weight:700;
  color: #2470B7;
  border-radius: 8px;
  padding: 6px;
  font-size: 14px;
  float:right;
  background-color: white;
  margin-left: auto;
  
}

#redirectTeacher {
  font-weight:700;
  color: #2470B7;
  border-radius: 8px;
  padding: 6px;
  font-size: 14px;
  float:right;
  background-color: white;
  margin-left: 16px;
  
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
#redirectLogin {
  flex-direction:row;
  display:flex;
  align-items: center;
  text-align:center;
  height: 80px;
  border-radius: 8px;
  margin-top: 60px;
  background-color: #2470B7;
  border: 1px solid #2470B7;
  width: 45.4%
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
 .loginRows {
  justify-content:center;
  text-align: center;
  display: flex;
  flex-direction: row;
  
  

}
.loginColumn {
  
  width: 23%;
  flex-direction: column;
}
#header{
  background-color: white;
  margin-top: 30px;
  margin-bottom: 106px;
  font-size: 48px;
  font-weight: 700;
  text-align: left;
  
}

#submitButton {
  background-color: #2470B7;
  color: #FFFFFF;
  column-span: all;
  margin-top: 12px;
  
  width: 20vw;  
  height: 50px;
}
.redirectButton:hover,
.redirectButton:focus {
  opacity: 0.9;
        filter: alpha(opacity=100);
}
#submitButton:hover,
#submitButton:focus {
  opacity: 0.9;
        filter: alpha(opacity=100);
}

@media only screen and (max-width: 1300px) {
  .loginColumn {
    width: 33%;

  }
  #redirectLogin{
    width: 65%;
  }
  
}

@media only screen and (max-width: 1000px) {
  #header {
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
  }

  #fields {
    align-items: center;
  }
  #imageColumn {
    display: none;
    
  }
 #redirectLogin {
    flex-direction: column;
    align-items: center;
    width: 20vw;
    height: 220px;
  }
  #redirectParent {
    margin-top: 12px;
    margin-right:auto;
    float:center;
  }

  #redirectTeacher {
    margin-top: 12px;
    margin-left: auto;
    margin-right:auto;
    float:center;
  }
  
}

@media only screen and (max-width: 900px) {
  
  
}
form{
  margin-top: 24px;
}
</style>
