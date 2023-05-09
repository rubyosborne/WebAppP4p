
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDKORXSD5mG4Oje2mWgobCSYO5H969yxck",
  authDomain: "reactwebapp-4e101.firebaseapp.com",
  projectId: "reactwebapp-4e101",
  storageBucket: "reactwebapp-4e101.appspot.com",
  messagingSenderId: "604882833083",
  appId: "1:604882833083:web:69b9b82b24f8b932c3639e",
  measurementId: "G-ZB0XJQQJ8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);