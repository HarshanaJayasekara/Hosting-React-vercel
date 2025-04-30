import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom"; // Import useNavigate here
import { auth } from "../src/firebase/firebaseConfig";
import UserChat from "../src/pages/user/UserChat";
import AdminChat from "../src/pages/user/AdminChat";
import Login from "../src/pages/user/Login";
import { signOut } from "firebase/auth"; // Import the signOut method

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate here

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      setUser(null); // Update the user state to null
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Optional loading state
  }

  if (!user) {
    return <Login />;
  }

  const isAdmin = user.email === "admin@example.com"; // Change logic as needed

  return (
    <div>
      <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
      {isAdmin ? <AdminChat /> : <UserChat />}
    </div>
  );
}

export default function Root() {
  return (
    <Router> {/* Make sure everything is wrapped in Router */}
      <App />
    </Router>
  );
}
