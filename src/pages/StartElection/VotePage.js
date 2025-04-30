import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import "./VotePage.css";

const VotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const candidate = location.state?.candidate;
  const voter = location.state?.voter;

  // Redirect or show error if necessary data is missing
  if (!candidate || !voter) {
    return (
      <div className="vote-wrapper">
        <p className="vote-error">Missing candidate or voter information.</p>
        <button className="vote-button cancel" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleVote = async () => {
    try {
      // Update candidate vote count
      const candidateRef = doc(db, "candidates", candidate.id);
      await updateDoc(candidateRef, {
        votes: (candidate.votes || 0) + 1,
      });

      // Add vote record to Firestore
      await addDoc(collection(db, "votes"), {
        voterId: voter.id,
        candidateId: candidate.id,
        votedAt: serverTimestamp(),
      });

      alert(`You have successfully voted for ${candidate.name}!`);
      navigate("/ThankYou");
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("An error occurred while voting. Please try again.");
    }
  };

  return (
    <div className="vote-wrapper">
      <h2 className="vote-title">Confirm Your Vote</h2>

      <img
        src={candidate.image || "https://via.placeholder.com/150"}
        alt={candidate.name}
        className="vote-image"
      />

      <div className="vote-details">
        <p><strong>Candidate:</strong> {candidate.name}</p>
        <p><strong>Party:</strong> {candidate.party}</p>
      </div>

      <button className="vote-button confirm" onClick={handleVote}>
        Confirm Vote
      </button>

      <button className="vote-button cancel" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
};

export default VotePage;
