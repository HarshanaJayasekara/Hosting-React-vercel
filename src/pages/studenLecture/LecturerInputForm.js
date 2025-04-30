import React, { useState } from 'react';
import { db } from './firebase'; // Adjust the import based on your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import './LecturerInputForm.css';

const LecturerInputForm = () => {
  const [lecturer, setLecturer] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'lecturers'), lecturer);
      alert('✅ Lecturer Registered Successfully!');
      setLecturer({
        name: '',
        subject: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('❌ Error adding lecturer:', error);
    }
  };

  return (
    <div className="lecturer-form-container">
      <h2>📚 Register Lecturer</h2>
      <form className="lecturer-form" onSubmit={handleSubmit}>
        {[
          { label: 'Full Name', name: 'name', type: 'text' },
          { label: 'Subject', name: 'subject', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'text' },
        ].map(({ label, name, type }) => (
          <div className="form-group" key={name}>
            <label htmlFor={name}>{label}:</label>
            <input
              type={type}
              name={name}
              id={name}
              value={lecturer[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default LecturerInputForm;
