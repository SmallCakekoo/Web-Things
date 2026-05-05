// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPkB4GM-JBD43BM-hAPIiLNv2l2BWuvK4",
  authDomain: "dca-practice.firebaseapp.com",
  projectId: "dca-practice",
  storageBucket: "dca-practice.firebasestorage.app",
  messagingSenderId: "508612538",
  appId: "1:508612538:web:41620e792f922622839783",
  measurementId: "G-20222Q1GN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);