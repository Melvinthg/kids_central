import { createStore } from "vuex";
import router from "../router";
import { auth, db, storage } from "../firebase.js";
import createPersistedState from "vuex-persistedstate";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { vuexfireMutations } from "vuexfire";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
export default createStore({
  plugins: [createPersistedState()],
  //access state using this.$store.state.<stateVariableName>
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

  //to use getters call store.getters.<getterName>
  getters: {
    getName(state) {
      return state.userModel.name;
    },
  },
  //HOW TO USE ACTIONS example:
  //in <script>:
  //  methods; {
  // ...mapActions({<name that you give the action (shouldnt have in "")> : "getStudentsInClass"})
  //}
  // in a function --> call this.<givenActionName>(parameters in object form)
  // in <template>:
  // <button @click = "name_given(parameters(i will comment the parameters needed))"></button>
  actions: {
    //RETURNS A LIST OF STUDENTS IN {CLASSNAME}
    async getStudentsInClass(context, className) {
      //console.log(password)
      const studentsList = [];
      console.log(context);
      const classRef = collection(db, "classes", className, "students");
      const classSnap = await getDocs(classRef);
      console.log(classSnap.docs);
      //console.log(classSnap.)
      //const classesCollection = await getDocs(collection(db, "classes"))
      classSnap.forEach((e) => {
        const x = e.data();
        studentsList.push(x);
      });

      return studentsList;
    },

    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);

        console.log(user);
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
      const userRef = doc(db, "users", auth.currentUser.uid);
      const user = await getDoc(userRef);
      //console.log(user.data())
      commit("SET_USER_MODEL", user.data());
      commit("SET_USER", auth.currentUser);
      if (user.data().type == "parent") {
        router.push("/homeparent");  
      } else {
        router.push("/hometeacher");
      }
      
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
      router.push("/homeparent");
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
      router.push("/hometeacher");
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
            if (this.$store.state.userModel.type == "parent") {
              router.push("/homeparent")
            } else {
              router.push("/hometeacher");
            }
          }
        }
      });
    },
    
    //getting list of posts
    async getPosts({context},){
      const postsList = [];
      console.log(context);
      const postsRef = collection(db, "posts",);
      const postSnap = await getDocs(postsRef);
      // console.log(postSnap.docs);
      //console.log(classSnap.)
      //const classesCollection = await getDocs(collection(db, "classes"))
      postSnap.forEach((e) => {
        const x = e.data();
        postsList.push(x);
      });
      return postsList
    },
    async getForumPosts({context},className){
      const postsList = [];
      console.log(context);
      const postsRef = collection(db, "forumposts",);
      const postSnap = await getDocs(postsRef);
      postSnap.forEach((e) => {
        const x = e.data();
        postsList.push(x);
      });
      const filteredPosts = postsList.filter(post => post.class == className)
      return filteredPosts
    },
    //CREATING NON FORUM POST USE THIS
    async createPost({ context }, details) {
      console.log(context);
      console.log(details);
      const tempUrl =
        "images/" +
        details.location +
        String(Math.random()) +
        details.image.name;
      const imageRef = ref(storage, tempUrl);
      uploadBytes(imageRef, details.image)
        .then((snapshot) => {
          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then((url) => {
            //set image url here --> insert into post object
            const post = {
              location: details.location,
              caption: details.caption,
              imageUrl: url,
              date: details.date,
              poster: details.poster,
              recipient: details.recipient,
            };
            addDoc(collection(db, "posts"), post)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("File available at", url);
          });
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    },


    async createForumPost({ context }, details) {
      console.log(context);
      console.log(details);
      const tempUrl =
        "images/" +
        details.location +
        String(Math.random()) +
        details.image.name;
      const imageRef = ref(storage, tempUrl);
      uploadBytes(imageRef, details.image)
        .then((snapshot) => {
          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then((url) => {
            //set image url here --> insert into post object
            const forumpost = {
              location: details.location,
              title: details.title,
              text: details.text,
              imageUrl: url,
              date: details.time,
              uid: details.uid,
              class: details.class
            };
            addDoc(collection(db, "forumposts"), forumpost)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("File available at", url);
          });
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    },
    async createReport({ context }, details) {
      console.log(context);
      console.log(details);
            const report = {
              studentid: details.studentid,
              title: details.title,
              category: details.category,
              text: details.text,
              date: details.time,
              uid: details.uid,
            };
            addDoc(collection(db, "reports"), report)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });    
    }
  },
});
