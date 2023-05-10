// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGi6ZeONsPLa7Tcgg4ONCcX3yBPqtgfCI",
  authDomain: "chatapp-372a5.firebaseapp.com",
  projectId: "chatapp-372a5",
  storageBucket: "chatapp-372a5.appspot.com",
  messagingSenderId: "200282573334",
  appId: "1:200282573334:web:2ef7fb2159349d08f54337",
  measurementId: "G-Y9SXGK9B9K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
