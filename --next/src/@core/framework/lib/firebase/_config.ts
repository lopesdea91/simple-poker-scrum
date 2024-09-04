// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAbbgXmjQVLTBRP7pxYF6X7LLWbfhlnEv8",
  authDomain: "simplepokerscrum.firebaseapp.com",
  projectId: "simplepokerscrum",
  storageBucket: "simplepokerscrum.appspot.com",
  messagingSenderId: "336635444303",
  appId: "1:336635444303:web:8695afbb5d03ec0b583e3a",
  measurementId: "G-Y3BTPFRKX6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Initialize Firebase
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
