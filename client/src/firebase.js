// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-full-stack-ad332.firebaseapp.com",
    projectId: "blog-full-stack-ad332",
    storageBucket: "blog-full-stack-ad332.appspot.com",
    messagingSenderId: "24344386712",
    appId: "1:24344386712:web:a6b1866c5084704b34c4ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);