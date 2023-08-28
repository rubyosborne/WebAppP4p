
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD7xKhezs755gkaAa55BjG9pGTWg0u1oE8",
  authDomain: "tpil239p4p2023.firebaseapp.com",
  projectId: "tpil239p4p2023",
  storageBucket: "tpil239p4p2023.appspot.com",
  messagingSenderId: "208731437183",
  appId: "1:208731437183:web:f99c05d8a6f3c22930674a",
  measurementId: "G-T98C9Y4K3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);