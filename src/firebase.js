// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnegeubPPw-LFFJ829uZdaisUp5Qa_LwY",
  authDomain: "crud-firebase-6ff4c.firebaseapp.com",
  databaseURL: "https://crud-firebase-6ff4c-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-6ff4c",
  storageBucket: "crud-firebase-6ff4c.appspot.com",
  messagingSenderId: "83967181934",
  appId: "1:83967181934:web:2254bf8f929365e794127f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database
const db = getDatabase(firebaseApp);

export default db; // Export the reference to the database
