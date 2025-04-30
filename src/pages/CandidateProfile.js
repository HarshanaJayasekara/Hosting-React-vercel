import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import './CandidateProfile.css';

const CandidateProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleVote = async () => {
    await addDoc(collection(db, 'votes'), {
      voterId: state.voter.id,
      candidateId: state.candidate.id,
      votedAt: new Date()
    });
    navigate('/thank-you');
  };

  return (
    <div className="candidate-profile">
      <img src={state.candidate.photoURL} alt={state.candidate.name} className="profile-img" />
      <h2>{state.candidate.name}</h2>
      <p><strong>Party:</strong> {state.candidate.party}</p>
      <p><strong>Description:</strong> {state.candidate.description}</p>
      <button className="btn-primary" onClick={handleVote}>Vote Him</button>
    </div>
  );
};

export default CandidateProfile;
