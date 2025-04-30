import React, { useState } from "react";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig'; // Adjust path if needed
import "./ResetElection.css";

const ResetElection = () => {
  const [adminPassword, setAdminPassword] = useState("");
  const [status, setStatus] = useState("");

  const correctPassword = "admin123"; // Change to your secure password

  const handleReset = async () => {
    if (adminPassword !== correctPassword) {
      setStatus("❌ Incorrect admin password.");
      return;
    }

    try {
      // Reset all candidate votes
      const candidatesSnapshot = await getDocs(collection(db, "candidates"));
      const resetPromises = candidatesSnapshot.docs.map(docSnap =>
        updateDoc(doc(db, "candidates", docSnap.id), { votes: 0 })
      );

      // Delete all votes
      const votesSnapshot = await getDocs(collection(db, "votes"));
      const deletePromises = votesSnapshot.docs.map(docSnap =>
        deleteDoc(doc(db, "votes", docSnap.id))
      );

      await Promise.all([...resetPromises, ...deletePromises]);

      setStatus("✅ Election data has been reset successfully.");
    } catch (error) {
      console.error("Error resetting election:", error);
      setStatus("❌ Error occurred during reset.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Election Data</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        className="reset-input"
      />
      <button className="reset-btn" onClick={handleReset}>
        Reset Election
      </button>
      {status && <p className="reset-status">{status}</p>}
    </div>
  );
};

export default ResetElection;
