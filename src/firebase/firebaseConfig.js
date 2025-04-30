// Firebase Setup: Core and Services
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9CcGxWJBjEz5gemC31JBGT0LQfHuxWRk",
  authDomain: "react-table-3e9ec.firebaseapp.com",
  projectId: "react-table-3e9ec",
  storageBucket: "react-table-3e9ec.appspot.com", // corrected from 'firebasestorage.app' to 'appspot.com'
  messagingSenderId: "794406331893",
  appId: "1:794406331893:web:ed5ad0d0ea86c4993dacbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google sign-in provider
const db = getFirestore(app);
const storage = getStorage(app);

// Export initialized services and Firestore utilities
export {
  auth,
  provider,
  db,
  storage,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot
};
