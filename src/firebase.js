import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {

  apiKey: "AIzaSyAL2H2r5RnUUiLfZNW2qmgS4TLc1561e6Y",

  authDomain: "tradetreasure-9fd95.firebaseapp.com",

  projectId: "tradetreasure-9fd95",

  storageBucket: "tradetreasure-9fd95.appspot.com",

  messagingSenderId: "1029077955570",

  appId: "1:1029077955570:web:75da7a82d40bac050b716b",

  measurementId: "G-ZNKBMKPGTD"

};

const app = initializeApp(firebaseConfig);

// Export the auth module directly
export const auth = getAuth(app);

export default app;
