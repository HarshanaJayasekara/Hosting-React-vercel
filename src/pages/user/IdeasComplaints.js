import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import emailjs from 'emailjs-com';
import './IdeasComplaints.css';

// npm install emailjs-com
// https://www.emailjs.com/


const IdeasComplaints = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'idea',
    email: '', // New field for user email
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save data to Firebase Firestore
      await addDoc(collection(db, 'ideasComplaints'), {
        ...form,
        createdAt: new Date(),
      });

      // EmailJS parameters
      const emailParams = {
        subject: `New Submission: ${form.type.charAt(0).toUpperCase() + form.type.slice(1)}`,
        title: form.title,
        description: form.description,
        email: form.email, // Include user's email in the email parameters
      };

      // Send the email using EmailJS
      await emailjs.send(
        'service_ptny7bi',        // Service ID
        'template_st9g3qe',       // Template ID
        emailParams,
        'l09FnYLzDr2hIAN4W'       // Public Key (User ID)
      );

      // Display success message
      setSuccess('✅ Submission successful!');
      setForm({ title: '', description: '', type: 'idea', email: '' });
    } catch (err) {
      console.error('Error during submission:', err);
      setError(`❌ Submission failed: ${err.text || 'Unknown error occurred'}`);
    }
  };

  return (
    <div className="ideas-complaints-page">
      <h1>💡 Ideas & Complaints</h1>
      <p>Submit your innovative ideas or complaints to help us improve!</p>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="idea">Idea</option>
          <option value="complaint">Complaint</option>
        </select>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default IdeasComplaints;
