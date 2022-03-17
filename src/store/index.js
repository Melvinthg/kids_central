import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase.js";
import {doc, setDoc, addDoc, collection} from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { vuexfireMutations } from "vuexfire";
export default createStore({
  state: {
    user: null,
    userModel: null,
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_MODEL(state,userModel) {
      state.userModel = userModel;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async createUser({commit, state}, details) {
      // we first create a copy that excludes `id`
      // this exclusion is automatic because `id` is non-enumerable
     
      const { email, password, first, last } = details;
      const user = {
        "email" : email,
        "password" : password,
        "first" : first,
        "last" : last,
      }
      // return the promise so we can await this action
      await db
        .collection('users')
        .doc(state.user.uid)
        .set(user)
        .then(() => {
          console.log('user updated!')
        })
        
        commit("SET_USER_MODEL", user)
    },
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

    async registerParent({ commit }, details) {
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
      const user = {
        "email": email,
        "password": password,
        "first": first,
        "last": last,
        "type": "parent"
      }

      //creating user document
      const ref = await setDoc(doc(db, "users", uid), user)
      console.log(ref);
      // {
      //   email: email,
      //   password: password,
      //   first: first,
      //   last: last,
      // }
      
      // const users = db.collection("users").doc(uid);
      // await users.set();

      commit("SET_USER", auth.currentUser);
      commit("SET_USER_MODEL", user)
      router.push("/home");
    },
    async registerTeacher({ commit }, details) {
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
      const user = {
        "email": email,
        "password": password,
        "first": first,
        "last": last,
        "type": "teacher"
      }

      //creating user document
      const ref = await setDoc(doc(db, "users", uid), user)
      console.log(ref);
      // {
      //   email: email,
      //   password: password,
      //   first: first,
      //   last: last,
      // }
      
      // const users = db.collection("users").doc(uid);
      // await users.set();

      commit("SET_USER", auth.currentUser);
      commit("SET_USER_MODEL", user)
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

    async forumCreatePost({commit, state}, details) {
     console.log(commit)
     console.log(state)

      const { title, text } = details;
      
      const forumpost = {
        "title" : title,
        "text" : text,
        "uid" : auth.currentUser.uid,
        "time" : new Date()
      }

      const docRef = await addDoc(collection(db, "forumposts"), forumpost);
      console.log("Document written with ID: ", docRef.id);
    },
  },
});
