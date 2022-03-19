import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase.js";
import { doc, setDoc, getDocs, addDoc, collection } from "firebase/firestore";
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
    SET_USER_MODEL(state, userModel) {
      state.userModel = userModel;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  getters: {
    getName(state) {
      return state.userModel.name
    }
  },
  actions: {
  
    //RETURNS A LIST OF STUDENTS IN {CLASSNAME}
    async getStudentsInClass(context, className) {
     
      //console.log(password)
      const studentsList = []
      console.log(context)
      const classRef = collection(db, "classes", className,"students");
      const classSnap = await getDocs(classRef);
      console.log(classSnap.docs)
      //console.log(classSnap.)
      //const classesCollection = await getDocs(collection(db, "classes"))
      classSnap.forEach(e => {
        const x = e.data()
        studentsList.push(x)
      });

      return studentsList
      
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
      const { email, password, last, first, childName, childClass, childID } =
        details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
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
        email: email,
        password: password,
        first: first,
        last: last,
        childClass: childClass,
        childName: childName,
        childID: childID,
        type: "parent",
      };

      const child = {
        childName: childName,
        childID: childID,
      };
     
      await setDoc(doc(db, "classes", childClass, "students", childID), child);
     
      await setDoc(doc(db, "users", uid), user);
     

      commit("SET_USER", auth.currentUser);
      commit("SET_USER_MODEL", user);
      router.push("/home");
    },
    async registerTeacher({ commit }, details) {
      const { email, password, last, first, teacherID, teacherClass } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
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
        email: email,
        password: password,
        first: first,
        last: last,
        type: "teacher",
        teacherID: teacherID,
        teacherClass: teacherClass,
      };

      //creating user document
      const ref = await setDoc(doc(db, "users", uid), user);
      console.log(ref);
    

      commit("SET_USER", auth.currentUser);
      commit("SET_USER_MODEL", user);
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

    async forumCreatePost({ context }, details) {
      //  console.log(commit)
      //  console.log(state)

      const { title, text } = details;

      const forumpost = {
        title: title,
        text: text,
        uid: context.state.user.uid,
        time: Date.now(),
      };

      const docRef = await addDoc(collection(db, "forumposts"), forumpost);
      console.log("Document written with ID: ", docRef.id);
    },
  },
});
