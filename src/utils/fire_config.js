import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const app = initializeApp( {
  apiKey: "AIzaSyAVbl-qdo4kH_zMjB5P3xreDA5M503iKHA",
  authDomain: "dvchauffeurs-4751e.firebaseapp.com",
  projectId: "dvchauffeurs-4751e",
  storageBucket: "dvchauffeurs-4751e.firebasestorage.app",
  messagingSenderId: "26591486579",
  appId: "1:26591486579:web:322ef06943f632098b4006",
  measurementId: "G-YHJS1EVJKX"
});
const auth = getAuth(app);
const db = getDatabase(app);
export { db, app, auth };
