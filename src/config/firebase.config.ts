import "@firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAC7bbhXIHu-erlJCKoUX9x52-HeyzoRCo",
  authDomain: "milktea-1eddc.firebaseapp.com",
  projectId: "milktea-1eddc",
  storageBucket: "milktea-1eddc.appspot.com",
  messagingSenderId: "494322709938",
  appId: "1:494322709938:web:5e9d6b2482274f077b60ab",
  measurementId: "G-BC9GJBY0C2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore();

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
