// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL2H2r5RnUUiLfZNW2qmgS4TLc1561e6Y",
  authDomain: "tradetreasure-9fd95.firebaseapp.com",
  projectId: "tradetreasure-9fd95",
  storageBucket: "tradetreasure-9fd95.appspot.com",
  messagingSenderId: "1029077955570",
  appId: "1:1029077955570:web:75da7a82d40bac050b716b",
  measurementId: "G-ZNKBMKPGTD"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };