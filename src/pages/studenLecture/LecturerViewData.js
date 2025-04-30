import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import './LecturerViewData.css';
import Navbar from '../components/Navbar';

const LecturerViewData = () => {
  const [lecturers, setLecturers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedLecturer, setEditedLecturer] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
  });

  // Fetch lecturers from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'lecturers'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLecturers(data);
    };
    fetchData();
  }, []);

  // Filter by search
  const filteredLecturers = lecturers.filter((lecturer) =>
    lecturer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'lecturers', id));
    setLecturers(lecturers.filter((l) => l.id !== id));
  };

  const handleEdit = (lecturer) => {
    setEditingId(lecturer.id);
    setEditedLecturer({ ...lecturer });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLecturer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateDoc(doc(db, 'lecturers', editingId), editedLecturer);
    setLecturers(
      lecturers.map((l) => (l.id === editingId ? { ...l, ...editedLecturer } : l))
    );
    setEditingId(null);
  };

  return (
    <div className='viewdata'>
      <Navbar/>
    
    <div className="lecturer-view-container">
      <h2>📄 Candidator List</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <table className="lecturer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLecturers.length > 0 ? (
            filteredLecturers.map((lecturer) =>
              editingId === lecturer.id ? (
                <tr key={lecturer.id}>
                  <td><input name="name" value={editedLecturer.name} onChange={handleChange} /></td>
                  <td><input name="subject" value={editedLecturer.subject} onChange={handleChange} /></td>
                  <td><input name="email" value={editedLecturer.email} onChange={handleChange} /></td>
                  <td><input name="phone" value={editedLecturer.phone} onChange={handleChange} /></td>
                  <td>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={lecturer.id}>
                  <td>{lecturer.name}</td>
                  <td>{lecturer.subject}</td>
                  <td>{lecturer.email}</td>
                  <td>{lecturer.phone}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(lecturer)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(lecturer.id)}>Delete</button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">No lecturers found matching your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default LecturerViewData;
