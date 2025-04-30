import React, { useState } from 'react';
import { db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './LeadersRegister.css';

const LeadersRegister = () => {
  const [leader, setLeader] = useState({
    name: '',
    faculty: '',
    position: '',
    description: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `leaders/${Date.now()}-${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = leader.imageUrl;

      if (imageFile) {
        finalImageUrl = await handleImageUpload();
      }

      await addDoc(collection(db, 'leaders'), {
        name: leader.name,
        faculty: leader.faculty,
        position: leader.position,
        description: leader.description,
        imageUrl: finalImageUrl,
      });

      setSuccessMsg('✅ Leader registered successfully!');
      setLeader({ name: '', faculty: '', position: '', description: '', imageUrl: '' });
      setImageFile(null);
    } catch (error) {
      console.error('Error registering leader:', error);
    }
    setUploading(false);
  };

  return (
    <div className="leader-form-container">
      <h2>👤 Register Leader</h2>
      <form onSubmit={handleSubmit} className="leader-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={leader.name}
          onChange={handleChange}
          required
        />

        <label>Faculty:</label>
        <input
          type="text"
          name="faculty"
          value={leader.faculty}
          onChange={handleChange}
          required
        />

        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={leader.position}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={leader.description}
          onChange={handleChange}
          required
        />

        <label>Image URL (optional):</label>
        <input
          type="text"
          name="imageUrl"
          value={leader.imageUrl}
          onChange={handleChange}
        />

        <label>Or Upload Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button type="submit" disabled={uploading}>
          {uploading ? 'Saving...' : 'Register Leader'}
        </button>
      </form>

      {successMsg && <p className="success-msg">{successMsg}</p>}
    </div>
  );
};

export default LeadersRegister;
