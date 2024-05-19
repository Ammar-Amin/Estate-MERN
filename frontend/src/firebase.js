// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "amin-estate.firebaseapp.com",
    projectId: "amin-estate",
    storageBucket: "amin-estate.appspot.com",
    messagingSenderId: "483943308766",
    appId: "1:483943308766:web:8b7b4002d7dc5d706a914f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);