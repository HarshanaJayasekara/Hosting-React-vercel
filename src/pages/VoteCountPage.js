import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./VoteCountPage.css";

const VoteCountPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "candidates"));
        const candidateData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sorted = candidateData.sort(
          (a, b) => (b.votes || 0) - (a.votes || 0)
        );

        setCandidates(sorted);
        setFilteredCandidates(sorted);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = candidates.filter((c) =>
      c.name.toLowerCase().includes(value)
    );
    setFilteredCandidates(filtered);
  };

  if (loading) return <p className="text-center">Loading vote count...</p>;

  return (
    <div className="vote-container">
      <h2 className="vote-title">Vote Count</h2>

      <input
        type="text"
        placeholder="Search candidate by name..."
        className="vote-search"
        value={searchTerm}
        onChange={handleSearch}
      />

      {filteredCandidates.length === 0 ? (
        <p className="vote-empty">No candidates found.</p>
      ) : (
        <div className="vote-list">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="vote-card">
              <img
                src={candidate.image || "https://via.placeholder.com/100"}
                alt={candidate.name}
                className="vote-image"
              />
              <div className="vote-info">
                <h3 className="vote-name">{candidate.name}</h3>
                <p className="vote-party">Party: {candidate.party}</p>
              </div>
              <div className="vote-count">
                <span>{candidate.votes || 0}</span>
                <small>Votes</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoteCountPage;
