import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./CandidateProfile.css";

const CandidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const voter = location.state?.voter;
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const docRef = doc(db, "candidates", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCandidate({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such candidate!");
        }
      } catch (error) {
        console.error("Error fetching candidate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) return <p className="text-center">Loading candidate details...</p>;
  if (!candidate) return <p className="text-center text-red-500">Candidate not found.</p>;

  return (
    <div className="container">
      <div className="profile-container">
        <h2 className="profile-title">{candidate.name}</h2>
        <img
          src={candidate.image || "https://via.placeholder.com/150"}
          alt={candidate.name}
          className="profile-image"
        />
        <p className="profile-info"><strong>Party:</strong> {candidate.party}</p>
        <p className="profile-info"><strong>Description:</strong> {candidate.description}</p>

        <button
          onClick={() => navigate("/VotePage", { state: { candidate, voter } })}
          className="btn vote-btn"
        >
          Vote Now
        </button>

        <button
          onClick={() => navigate("/CandidateList", { state: { voter } })}
          className="btn back-btn"
        >
          Back to Candidates List
        </button>
      </div>
    </div>
  );
};

export default CandidateProfile;
