import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './UploadLecturersData.css';
import Navbar from '../components/Navbar';


const UploadLecturersData = () => {
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  // Sample Lecturer Data
  const lecturerData = [
    { name: 'Dr. John Doe', subject: 'Computer Science', email: 'johndoe@example.com', phone: '123-456-7890' },
    { name: 'Dr. Jane Smith', subject: 'Mathematics', email: 'janesmith@example.com', phone: '123-555-7890' },
    { name: 'Dr. Robert Brown', subject: 'Physics', email: 'robertbrown@example.com', phone: '123-456-1111' },
    { name: 'Dr. Sarah White', subject: 'Biology', email: 'sarahwhite@example.com', phone: '123-456-2222' },
    { name: 'Dr. Emily Johnson', subject: 'Chemistry', email: 'emilyjohnson@example.com', phone: '123-456-3333' },
    { name: 'Dr. Michael Lee', subject: 'Engineering', email: 'michaellee@example.com', phone: '123-456-4444' },
    { name: 'Dr. Laura Green', subject: 'Economics', email: 'lauragreen@example.com', phone: '123-456-5555' },
    { name: 'Dr. David Harris', subject: 'History', email: 'davidharris@example.com', phone: '123-456-6666' },
    { name: 'Dr. James Martin', subject: 'Political Science', email: 'jamesmartin@example.com', phone: '123-456-7777' },
    { name: 'Dr. Jessica Clark', subject: 'Sociology', email: 'jessicaclark@example.com', phone: '123-456-8888' },
    { name: 'Dr. William Walker', subject: 'Law', email: 'williamwalker@example.com', phone: '123-456-9999' },
    { name: 'Dr. Michelle Allen', subject: 'Art & Design', email: 'michelleallen@example.com', phone: '123-456-0000' },
    { name: 'Dr. Steven Moore', subject: 'Literature', email: 'stevenmoore@example.com', phone: '123-456-1010' },
    { name: 'Dr. Nancy Scott', subject: 'Music', email: 'nancyscott@example.com', phone: '123-456-2020' },
    { name: 'Dr. Daniel Adams', subject: 'Philosophy', email: 'danieladams@example.com', phone: '123-456-3030' }
  ];

  const handleBulkUpload = async () => {
    setLoading(true);
    try {
      const lecturersCollection = collection(db, 'lecturers');
      // Loop through each lecturer data and add them to Firebase
      for (let i = 0; i < lecturerData.length; i++) {
        await addDoc(lecturersCollection, lecturerData[i]);
      }
      alert('✅ Lecturers Data Uploaded Successfully!');
    } catch (error) {
      console.error('❌ Error uploading data:', error);
      alert('❌ Error uploading data!');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAll = async () => {
    setRemoving(true);
    try {
      const lecturersCollection = collection(db, 'lecturers');
      const querySnapshot = await getDocs(lecturersCollection);
      const deletePromises = [];
      
      // Loop through each document and delete it
      querySnapshot.forEach((docSnap) => {
        deletePromises.push(deleteDoc(doc(db, 'lecturers', docSnap.id)));
      });

      // Wait for all delete operations to finish
      await Promise.all(deletePromises);
      alert('✅ All Lecturer Data Removed Successfully!');
    } catch (error) {
      console.error('❌ Error removing data:', error);
      alert('❌ Error removing data!');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div>
      <Navbar/>
        <div className="lecturer-form-container">
      <h2>📚 Upload and Manage Lecturers Data</h2>
      <button 
        className="submit-btn" 
        onClick={handleBulkUpload}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Add All Lecturers Data'}
      </button>
      <button 
        className="submit-btn remove-btn" 
        onClick={handleRemoveAll}
        disabled={removing}
      >
        {removing ? 'Removing...' : 'Remove All Lecturer Data'}
      </button>
    </div>
    </div>
  );
};

export default UploadLecturersData;
