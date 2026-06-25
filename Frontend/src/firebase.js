import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkJcB4QRNgy5UKKnFwFzLXlfKK_B0my-w",
  authDomain: "thinkora-e6d3c.firebaseapp.com",
  projectId: "thinkora-e6d3c",
  storageBucket: "thinkora-e6d3c.firebasestorage.app",
  messagingSenderId: "518214798447",
  appId: "1:518214798447:web:587154d03be4c8a7a1d19a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();