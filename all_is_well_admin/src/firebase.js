// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX50Nc-IEQ3C1nl584-QKGwQIOZkUTv0M",
  authDomain: "alliswell-99d18.firebaseapp.com",
  databaseURL: "https://alliswell-99d18-default-rtdb.firebaseio.com",
  projectId: "alliswell-99d18",
  storageBucket: "alliswell-99d18.appspot.com",
  messagingSenderId: "551951265424",
  appId: "1:551951265424:web:04d71e802c95067ab57215",
  measurementId: "G-2W12DJ4HYV",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
