import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Adjust import based on your Firebase configuration
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './LeaderList.css';

const CandidatorList = () => {
  const [leaders, setLeaders] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedLeader, setEditedLeader] = useState({
    name: '',
    faculty: '',
    position: '',
    description: '',
    imageUrl: '',
  });

  // Fetch leaders from Firebase
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'leaders'));
        const leaderData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeaders(leaderData);
      } catch (error) {
        console.error('Failed to fetch leaders:', error);
      }
    };

    fetchLeaders();
  }, []);

  // Handle selection of a leader
  const handleSelectLeader = (leader) => {
    setSelectedLeader(leader);
    setEditedLeader({
      name: leader.name,
      faculty: leader.faculty,
      position: leader.position,
      description: leader.description,
      imageUrl: leader.imageUrl,
    });
    setEditMode(false);
  };

  // Handle edit change in input fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedLeader(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update leader details in Firebase
  const handleSaveChanges = async () => {
    try {
      const leaderRef = doc(db, 'candidates', selectedLeader.id);
      await updateDoc(leaderRef, {
        name: editedLeader.name,
        faculty: editedLeader.faculty,
        position: editedLeader.position,
        description: editedLeader.description,
        imageUrl: editedLeader.imageUrl,
      });
      setLeaders(prevLeaders =>
        prevLeaders.map(leader =>
          leader.id === selectedLeader.id ? { ...leader, ...editedLeader } : leader
        )
      );
      setEditMode(false);
      setSelectedLeader(null);
    } catch (error) {
      console.error('Error updating leader details:', error);
    }
  };

  return (
    <div className="leader-list-container">
      <h2>📋 Leader List</h2>

      <div className="leader-list">
        {leaders.map(leader => (
          <div
            key={leader.id}
            className="leader-card"
            onClick={() => handleSelectLeader(leader)}
          >
            <img
              src={leader.imageUrl || 'https://via.placeholder.com/150'}
              alt={leader.name}
              className="leader-thumbnail"
            />
            <h3>{leader.name}</h3>
            <p>{leader.position}</p>
          </div>
        ))}
      </div>

      {selectedLeader && !editMode && (
        <div className="leader-details">
          <h3>👤 Candidator Details</h3>
          <img
            src={selectedLeader.imageUrl || 'https://via.placeholder.com/200'}
            alt={selectedLeader.name}
            className="leader-full-img"
          />
          <p><strong>Name:</strong> {selectedLeader.name}</p>
          <p><strong>Faculty:</strong> {selectedLeader.faculty}</p>
          <p><strong>Position:</strong> {selectedLeader.position}</p>
          <p><strong>Description:</strong> {selectedLeader.description}</p>
          <button onClick={() => setSelectedLeader(null)}>Close</button>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}

      {editMode && selectedLeader && (
        <div className="edit-leader">
          <h3>Edit Leader Details</h3>
          <div className="edit-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedLeader.name}
              onChange={handleEditChange}
            />
          </div>
          <div className="edit-field">
            <label>Faculty:</label>
            <input
              type="text"
              name="faculty"
              value={editedLeader.faculty}
              onChange={handleEditChange}
            />
          </div>
          <div className="edit-field">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={editedLeader.position}
              onChange={handleEditChange}
            />
          </div>
          <div className="edit-field">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedLeader.description}
              onChange={handleEditChange}
            />
          </div>
          <div className="edit-field">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={editedLeader.imageUrl}
              onChange={handleEditChange}
            />
          </div>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CandidatorList;
