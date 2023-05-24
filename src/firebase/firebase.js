// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwCpkd5iPljS952Txf6XyFEXOgRDIdXCI",
  authDomain: "tabani-92024.firebaseapp.com",
  projectId: "tabani-92024",
  storageBucket: "tabani-92024.appspot.com",
  messagingSenderId: "847731413659",
  appId: "1:847731413659:web:67092c41dad9d548eeac3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app)