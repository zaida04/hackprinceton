// import * as firebase from "firebase/app";
// import 'firebase/auth';
// require('firebase/auth')
import firebase from 'firebase/compat/app' 
import 'firebase/compat/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "replace-here",
  authDomain: "replace-here",
  databaseURL: "replace-here",
  projectId: "replace-here",
  storageBucket: "replace-here",
  messagingSenderId: "replace-here",
  appId: "replace-here",
  measurementId: "replace-here",
};

// Initialize Firebase 
const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = firebase.auth(app);
export const database = firebase.database;
export const storage = getStorage(app);
export default firebase;
