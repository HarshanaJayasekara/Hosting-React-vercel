import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import './CandidateRegister.css';

const CandidateRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    position: "",
    description: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "candidates"), formData);
      alert("Candidate added successfully!");
      navigate("/home"); // Go to home or list page
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div className="candidate-register">
      <Navbar />
      <div className="form-container">
        <h2>🗳️ Candidate Registration</h2>
        <form onSubmit={handleSubmit} className="candidate-form">
          <label>Full Name*</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          <label>Political Party*</label>
          <input
            name="party"
            value={formData.party}
            onChange={handleChange}
            placeholder="Enter party name"
            required
          />

          <label>Position*</label>
          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. President, Secretary"
            required
          />

          <label>Description / Vision*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the candidate's vision or goals"
            rows="4"
            required
          />

          <label>Upload Candidate Photo*</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="form-input"
          />

          <button type="submit" >
          Candidate Registered
          </button>
        </form>

      </div>
    </div>
  );
};

export default CandidateRegister;
