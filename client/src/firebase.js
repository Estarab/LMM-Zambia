// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "lmm-zambia.firebaseapp.com",
  projectId: "lmm-zambia",
  storageBucket: "lmm-zambia.firebasestorage.app",
  messagingSenderId: "1092112526617",
  appId: "1:1092112526617:web:aa2ab130933addf77ae988"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);