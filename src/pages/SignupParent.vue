<template>
  <div id="headerRegister">Register as a Parent</div>
  <form class="register" @submit.prevent="register">
    <div class="rows">
      <div class="column">
        <input
          class="textField"
          type="text"
          placeholder="Email"
          v-model="register_form.email"
        />
        <input
          class="textField"
          type="password"
          placeholder="Password"
          v-model="register_form.password"
        />
        <!-- <input class = "textField" type = "first" placeholder = "First Name" v-model = "register_form.first"/>
      <input class = "textField" type = "last" placeholder = "Last Name" v-model = "register_form.last"/> -->
      </div>
      <div class="column">
        <!-- <input class = "textField" type = "childName" placeholder = "Child Name" v-model = "register_form.childName"/>
        <input class = "textField" type = "childClass" placeholder = "Child Class" v-model = "register_form.childClass"/>
        <input class = "textField" type = "childID" placeholder = "Child ID" v-model = "register_form.childID"/> -->
        <input
          class="textField"
          type="first"
          placeholder="First Name"
          v-model="register_form.first"
        />
        <input
          class="textField"
          type="last"
          placeholder="Last Name"
          v-model="register_form.last"
        />
      </div>
    </div>
    <input
      id="parentId"
      class="textField"
      type="parentId"
      placeholder="Parent ID"
      v-model="register_form.parentId"
    />
    <p>
      <input id="submitButton" type="submit" value="Register" />
    </p>
  </form>
  <div class="row" id="bottomRow">
    <div id="redirect">
      <div id="hint">Meant to login?</div>
      <div id="redirectButton" @click="$router.push('login')">Login Here!</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
// import {db} from '../firebase.js'
// import {doc, setDoc} from "firebase/firestore"

export default {
  name: "SignupParent",

  methods: {
    async test() {
      //  await db.collections("dab").set({form : this.register_form})
    },
  },
  setup() {
    const register_form = ref({});
    const store = useStore();
    const register = () => {
      store.dispatch("registerParent", register_form.value);
      //   store.dispatch('createUser', register_form.value)
    };

    return {
      register_form,
      store,
      register,
    };
  },
};
</script>

<style template>
#redirectButton {
  font-weight: 700;
  color: #2470b7;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  float: right;
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
  justify-content: center;
}
#redirect {
  flex-direction: row;
  display: flex;
  align-items: center;
  text-align: center;
  height: 80px;
  border-radius: 8px;
  background-color: #2470b7;
  border: 1px solid #2470b7;
  width: 42%;
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
  border-color: #2470b7;
}
.rows {
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: row;
}
#parentId {
  width: 43%;
}
.column {
  width: 23%;
  flex-direction: column;
}
#headerRegister {
  margin-top: 70px;
  margin-bottom: 50px;
  font-size: 2.6vw;
  font-weight: 700;
  text-align: center;
  background-color: white;
}

#submitButton {
  background-color: #2470b7;
  color: #ffffff;
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
    margin-right: auto;
    float: center;
  }
}
form {
  margin-top: 24px;
}
</style>
