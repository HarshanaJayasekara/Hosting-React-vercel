import React, { useState } from "react";
import { db } from "./firebase"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";

const CandidatorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    education: "",
    party: "",
    experience: "",
    manifesto: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, "candidates"), formData);

      alert("Candidate registered successfully!");
      setFormData({
        name: "",
        age: "",
        education: "",
        party: "",
        experience: "",
        manifesto: "",
      });
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to register candidate. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register Candidate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium">Education Level</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Political Party */}
        <div>
          <label className="block text-sm font-medium">Political Party</label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium">Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          ></textarea>
        </div>

        {/* Manifesto / Key Promises */}
        <div>
          <label className="block text-sm font-medium">Manifesto / Key Promises</label>
          <textarea
            name="manifesto"
            value={formData.manifesto}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Register Candidate"}
        </button>
      </form>
    </div>
  );
};

export default CandidatorForm;
