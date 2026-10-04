// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzrGEBPCRT0Iy9y6dtXgxzO3jaHuXcUBY",
  authDomain: "reviewmimi-19216.firebaseapp.com",
  projectId: "reviewmimi-19216",
  storageBucket: "reviewmimi-19216.firebasestorage.app",
  messagingSenderId: "204197476148",
  appId: "1:204197476148:web:e258140755c477e8861761",
  measurementId: "G-851F7KT1LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : undefined;

export { app, db, analytics };