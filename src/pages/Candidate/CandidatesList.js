import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import "./CandidatesList.css";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if voter data is missing
  useEffect(() => {
    if (!location.state?.voter) {
      navigate("/voter-identify");
    }
  }, [location, navigate]);

  // Fetch candidate data from Firebase
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const snapshot = await getDocs(collection(db, "candidates"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Prevent going back after voting
  useEffect(() => {
    const handlePopState = () => {
      navigate(1); // Go forward to prevent back
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter candidates based on search
  const filteredCandidates = candidates.filter(candidate =>
    candidate.name?.toLowerCase().includes(searchTerm)
  );

  // Navigate to candidate detail
  const handleCardClick = (id) => {
    navigate(`/candidate/${id}`, { state: { voter: location.state?.voter } });
  };

  return (
    <div className="new">
      <div className="manager-container">
        <h2 className="manager-title">Choose Candidate</h2>

        <input
          type="text"
          className="manager-search"
          placeholder="Search candidates by name..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {loading ? (
          <p>Loading candidates...</p>
        ) : filteredCandidates.length === 0 ? (
          <p>No candidates found.</p>
        ) : (
          filteredCandidates.map(candidate => (
            <div
              key={candidate.id}
              className="manager-card"
              onClick={() => handleCardClick(candidate.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={candidate.image || "https://via.placeholder.com/150"}
                alt={candidate.name}
                className="manager-img"
              />
              <div className="manager-details">
                <h3 className="manager-name">{candidate.name}</h3>
                <p className="manager-party">Party: {candidate.party}</p>
                <p className="manager-description">{candidate.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateList;
