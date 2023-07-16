// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUPKrIJZcHj_tPSqJyM55IKM7gSQu-Ihk",
  authDomain: "react-firebase-project-cece2.firebaseapp.com",
  projectId: "react-firebase-project-cece2",
  storageBucket: "react-firebase-project-cece2.appspot.com",
  messagingSenderId: "570970908781",
  appId: "1:570970908781:web:abdb416f8222602a2c3764"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const  db = getFirestore(app);