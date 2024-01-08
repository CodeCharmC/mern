// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,   
   authDomain: "mern-f47cb.firebaseapp.com",
   projectId: "mern-f47cb",
   storageBucket: "mern-f47cb.appspot.com",
   messagingSenderId: "475170428604",
   appId: "1:475170428604:web:1b8a826ab8171d06a022b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);