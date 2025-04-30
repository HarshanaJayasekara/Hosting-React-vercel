// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getStorage } from "firebase/storage"; // For Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9CcGxWJBjEz5gemC31JBGT0LQfHuxWRk",
  authDomain: "react-table-3e9ec.firebaseapp.com",
  projectId: "react-table-3e9ec",
  storageBucket: "react-table-3e9ec.firebasestorage.app",
  messagingSenderId: "794406331893",
  appId: "1:794406331893:web:ed5ad0d0ea86c4993dacbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // For Authentication
const db = getFirestore(app); // For Firestore
const storage = getStorage(app); // For Firebase Storage

// Export the services to use them in other parts of the app
export { auth, db, storage };
