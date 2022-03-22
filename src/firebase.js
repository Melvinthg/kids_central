// Import the functions you need from the SDKs you need


import * as firebase from "firebase/app";

import { getFirestore } from '@firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNiNtcuIJc1-XdvsYyOHyaJdNkW8UuyRo",
  authDomain: "kidscentral-9f31c.firebaseapp.com",
  projectId: "kidscentral-9f31c",
  storageBucket: "kidscentral-9f31c.appspot.com",
  messagingSenderId: "412171800135",
  appId: "1:412171800135:web:d3d905d03e01f58684ab62",
  measurementId: "G-8HG1SC5X8L",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
export { app, analytics, auth, db, storage, uploadBytes };

