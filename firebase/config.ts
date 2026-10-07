import { initializeApp, getApps, getApp as getFirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDzrGEBPCRT0Iy9y6dtXgxzO3jaHuXcUBY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "reviewmimi-19216.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "reviewmimi-19216",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "reviewmimi-19216.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "204197476148",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:204197476148:web:e258140755c477e8861761",
};

const app = getApps().length ? getFirebaseApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function getClientAuth(): Auth {
  return auth;
}

export function getClientDb(): Firestore {
  return db;
}

