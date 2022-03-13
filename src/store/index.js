import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { vuexfireMutations } from "vuexfire";
export default createStore({
  state: {
    user: null,
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    // async createUser() => {
    //   // we first create a copy that excludes `id`
    //   // this exclusion is automatic because `id` is non-enumerable
    //   const user = { ...state.user }
    //   user.lastName = newLastName

    //   // return the promise so we can await this action
    //   return db
    //     .collection('users')
    //     .doc(this.user.id)
    //     .set(user)
    //     .then(() => {
    //       console.log('user updated!')
    //     })
    // },
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;

          default:
            alert("Something went wrong");
            break;
        }
        return;
      }
      commit("SET_USER", auth.currentUser);
      router.push("/home");
    },

    async register({ commit }, details) {
      const { email, password, last, first } = details;
      try {
         await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
       
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert(error.code);
            break;
          case "auth/invalid-email":
            alert("Invalid Email");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;

          default:
            alert("Something went wrong");
            break;
        }
        return;
      }
      const uid = auth.currentUser.uid;
      
      const users = db.collection("users").doc(uid);
      await users.set({
        "email": email,
        "password": password,
        "first": first,
        "last": last,
      });

      commit("SET_USER", auth.currentUser);
      router.push("/home");
    },

    async logout({ commit }) {
      await signOut(auth);
      commit("CLEAR_USER");
      router.push("/login");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/home");
          }
        }
      });
    },
  },
});
