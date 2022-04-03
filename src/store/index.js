import { createStore } from "vuex";
import router from "../router";
import { auth, db, storage } from "../firebase.js";
import createPersistedState from "vuex-persistedstate";
import {
  doc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  collection,
  query,
  where,
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
    CLEAR_USER_MODEL(state) {
      state.userModel = null;
    },
  },

  //to use getters call store.getters.<getterName>
  getters: {
    getName(state) {
      return state.userModel.name;
    },
    getType(state) {
      return state.userModel.type;
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

      console.log(user.data());
      commit("SET_USER", auth.currentUser);

      router.push("/home");
    },

    async registerParent({ commit }, details) {
      const { email, password, last, first, parentId } = details;
      const idRefs = collection(db, "parentID");
      var idList = [];
      var docList = [];
      var idIndex = -1;
      var docId = "";

      const querySnapshot = await getDocs(idRefs);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        idList.push(doc.data()["parentId"]);
        docList.push(doc);
        console.log(doc.id, " => ", doc.data());
      });
      //if id not in list
      if (!idList.includes(parentId)) {
        alert("Not Verified Parent");
        return;
      } else {
        idIndex = idList.indexOf(parentId);
        if (docList[idIndex].data()["activated"] == "true"){
          alert("Parent ID already registered, nice try.")
          return
        }
        docId = docList[idIndex].id;
        await setDoc(doc(db, "parentID", docId), {
          parentId: parentId,
          activated: "true",
        });
      }
      //   const activatedSnapshot = await getDocs(activatedRef);
      //   activatedSnapshot.forEach((doc) => {
      //     // doc.data() is never undefined for query doc snapshots

      //     updateDoc(doc, { activated: "true" });
      //   });
      // }
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
        parentId,
        type: "parent",
      };

      // const child = {
      //   childName: childName,
      //   childID: childID,
      // };

      // await setDoc(doc(db, "classes", childClass, "students", childID), child);

      await setDoc(doc(db, "users", uid), user);

      commit("SET_USER", auth.currentUser);

      commit("SET_USER_MODEL", user);

      router.push("/home");
    },
    async registerTeacher({ commit }, details) {
      const { email, password, last, first, teacherID, teacherClass } = details;
      const idRefs = collection(db, "teacherID");
      var idList = [];
      var docList = [];
      var idIndex = -1;
      var docId = "";

      const querySnapshot = await getDocs(idRefs);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        idList.push(doc.data()["teacherId"]);
        docList.push(doc);
        console.log(doc.id, " => ", doc.data());
      });
      //if id not in list
      if (!idList.includes(teacherID)) {
        alert("Not Verified Teacher");
        return;
      } else {
        idIndex = idList.indexOf(teacherID);
        if (docList[idIndex].data()["activated"] == "true"){
          alert("Teacher ID already registered, nice try.")
          return
        }
        docId = docList[idIndex].id;
        await setDoc(doc(db, "teacherID", docId), {
          "teacherId": teacherID,
          "activated": "true",
        });
      }
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
      commit("CLEAR_USER_MODEL");
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
    // get user class from parent email
    async getChildClass({ context }, pEmail) {
      const children = [];
      console.log(context);
      const q = query(collection(db, 'students'), where("parentEmail", "==", pEmail));    
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        children.push(doc.data())
      })
      return children[0]["Class"];
    },

    //getting list of posts
    async getPosts({ context }) {
      const postsList = [];
      console.log(context);
      const postsRef = collection(db, "posts");
      const postSnap = await getDocs(postsRef);
      // console.log(postSnap.docs);
      //console.log(classSnap.)
      //const classesCollection = await getDocs(collection(db, "classes"))
      postSnap.forEach((e) => {
        const x = e.data();
        postsList.push(x);
      });
      return postsList;
    },

    async getForumPosts({ context }, className) {
      const postsList = [];
      console.log(context);
      const postsRef = collection(db, "forumposts");
      const postSnap = await getDocs(postsRef);
      postSnap.forEach((e) => {
        const x = e.data();
        postsList.push(x);
      });
      const filteredPosts = postsList
        .filter((post) => post.class == className)
        .sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      return filteredPosts;
    },

    async getReplies({ context }, fpid) {
      const repliesList = [];
      console.log(context);
      const repliesRef = collection(db, "forumposts", fpid, "replies");
      const repliesSnap = await getDocs(repliesRef);
      repliesSnap.forEach((e) => {
        const x = e.data();
        repliesList.push(x);
      });
      const replies = repliesList.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
        // earliest to latest reply
      });
      return replies;
    },

    async getUsers({ context }, className) {
      const teachersList = [];
      console.log(context);
      const usersRef = collection(db, "users");
      const userSnap = await getDocs(usersRef);
      userSnap.forEach((e) => {
        const x = e.data();
        teachersList.push(x);
      });
      const teachersInClass = teachersList.filter(
        (user) =>
          user.teacherClass == className,
      );
      
      const parentsList = [];
      console.log(context);
      const usersRef1 = collection(db, "students");
      const userSnap1 = await getDocs(usersRef1);
      userSnap1.forEach((e) => {
        const x = e.data();
        parentsList.push(x);
      });
      const parentsInClass = parentsList.filter(
        (user) =>
          user.Class == className,
      );
      return teachersInClass.concat(parentsInClass);
    },

    async getChildName({ context }, childID) {
      const childrenList = [];
      console.log(context);
      const userRef = collection(db, "users");
      const userSnap = await getDocs(userRef);
      userSnap.forEach((e) => {
        const x = e.data();
        childrenList.push(x);
      });
      const child = childrenList.filter((user) => user.childID == childID);
      const childvalues = child[0];
      return childvalues.first + " " + childvalues.last;
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
              poster: details.poster,
              class: details.class,
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

    async createReply({ context }, details) {

      console.log(context);
      console.log(details);
      const reply = {
        replycontent: details.replycontent,
        date: details.time,
        uid: details.uid,
        replier: details.replier,
      };

      const replyRef = collection(db, "forumposts", details.fpid, "replies");
      await addDoc(replyRef, reply)

        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async createReport({ context }, details) {
      console.log(context);
      console.log(details);

      const report = {
        childID: details.childID,
        title: details.title,
        category: details.category,
        text: details.text,
        date: details.time,
        uploader: details.uploader,
        uid: details.uid,
      };
      addDoc(collection(db, "reports"), report)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async createGradebook({ context }, details) {
      console.log(context);
      console.log(details);
      const gradebook = {
        childID: details.childID,
        title: details.title,
        score: details.score,
        date: details.date,
        uploader: details.uploader,
        uid: details.uid,
      };
      addDoc(collection(db, "gradebook"), gradebook)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
