import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDIE-QXHg60YWUtGtslmmBeX_EiqScG6Vw",
  authDomain: "betus-2fea9.firebaseapp.com", 
  projectId: "betus-2fea9",
  storageBucket: "betus-2fea9.appspot.com",
  messagingSenderId: "1020986594972",
  appId: "1:1020986594972:android:161385d3de0aa1bf9e7f59",
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = getAuth(app);

export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
