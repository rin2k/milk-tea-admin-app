import "@firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBzEHy2BbTh__VmdciZmyqGORRX6jeZ7rQ",
  authDomain: "milk-tea-eaaa8.firebaseapp.com",
  projectId: "milk-tea-eaaa8",
  storageBucket: "milk-tea-eaaa8.appspot.com",
  messagingSenderId: "206985716563",
  appId: "1:206985716563:web:acba8b004b829a4ca1f7a6",
  measurementId: "G-D03G9GJD26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore();

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
