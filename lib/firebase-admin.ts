import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "reviewmimi-19216",
    storageBucket: "reviewmimi-19216.firebasestorage.app",
  });
}

export const adminDb = admin.firestore();
