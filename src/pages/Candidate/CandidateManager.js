import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import "./CandidateManager.css";
import Navbar from "../../components/Navbar";

const ADMIN_PASSWORD = "admin123"; // Replace with secure check in production

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchCandidates = async () => {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(searchTerm)
  );

  const handleEditClick = (candidate) => {
    setEditingId(candidate.id);
    setEditData(candidate);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const password = prompt("Enter admin password to save changes:");
    if (password !== ADMIN_PASSWORD) return alert("Incorrect password!");

    try {
      await updateDoc(doc(db, "candidates", editingId), editData);
      setCandidates((prev) =>
        prev.map(c => (c.id === editingId ? { ...c, ...editData } : c))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const handleDelete = async (id) => {
    const password = prompt("Enter admin password to delete:");
    if (password !== ADMIN_PASSWORD) return alert("Incorrect password!");

    try {
      await deleteDoc(doc(db, "candidates", id));
      setCandidates((prev) => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="new">
      <Navbar />
    <div className="manager-container">
      <h2 className="manager-title">Candidate Manager</h2>

      <input
        type="text"
        className="manager-search"
        placeholder="Search candidates by name..."
        onChange={handleSearch}
        value={searchTerm}
      />

      {filteredCandidates.map(candidate => (
        <div key={candidate.id} className="manager-card">
          <img
            src={candidate.image || "https://via.placeholder.com/150"}
            alt={candidate.name}
            className="manager-img"
          />
          <div className="manager-details">
            {editingId === candidate.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="manager-input"
                />
                <input
                  type="text"
                  name="party"
                  value={editData.party}
                  onChange={handleInputChange}
                  className="manager-input"
                />
                <input
                  type="text"
                  name="image"
                  value={editData.image}
                  onChange={handleInputChange}
                  className="manager-input"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleInputChange}
                  className="manager-textarea"
                />
                <button onClick={handleSave} className="manager-btn save">Save</button>
                <button onClick={() => setEditingId(null)} className="manager-btn cancel">Cancel</button>
              </>
            ) : (
              <>
                <h3 className="manager-name">{candidate.name}</h3>
                <p className="manager-party">Party: {candidate.party}</p>
                <p className="manager-description">{candidate.description}</p>
                <div className="manager-actions">
                  <button onClick={() => handleEditClick(candidate)} className="manager-btn edit">Edit</button>
                  <button onClick={() => handleDelete(candidate.id)} className="manager-btn delete">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CandidateManager;
