
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB6QH7oSnjAEk833leOI6IvQXTjZPZ2w48",
  authDomain: "food-app-67b2e.firebaseapp.com",
  projectId: "food-app-67b2e",
  storageBucket: "food-app-67b2e.appspot.com",
  messagingSenderId: "245363357689",
  appId: "1:245363357689:web:d9ab082be06397d41f2f28",
  measurementId: "G-S97X5XYCTV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
