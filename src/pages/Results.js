import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Navbar from '../components/Navbar';
import './Results.css';

const Results = () => {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const votersSnap = await getDocs(collection(db, 'voters'));
      const candidatesSnap = await getDocs(collection(db, 'candidates'));

      setVoters(votersSnap.docs.map(doc => doc.data()));
      setCandidates(candidatesSnap.docs.map(doc => doc.data()));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="results-container">
      
      <div className="sidebar">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/home">🏠 Home</a></li>
          <li><a href="/voter-register">📝 Register Voter</a></li>
          <li><a href="/candidate-register">👤 Register Candidate</a></li>
          <li><a href="/start-election">🚀 Start Election</a></li>
        </ul>
      </div>

      <div className="content">
        <h2>📊 Election Overview</h2>

        <section className="results-section">
          <h3>🧑‍🤝‍🧑 Registered Voters</h3>
          <div className="list-container">
            {voters.map((voter, index) => (
              <div className="list-item" key={index}>
                <h4>{voter.name}</h4>
                <p><strong>University ID:</strong> {voter.uniId}</p>
                <p><strong>Faculty:</strong> {voter.faculty}</p>
                <p><strong>Batch:</strong> {voter.batch}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="results-section">
          <h3>🎯 Registered Candidates</h3>
          <div className="candidate-list">
            <ul>
              <li>{candidates.map((cand, index) => (
              <div className="candidate-card" key={index}>
                <img src={cand.photoURL} alt="Candidate" />
                <div>
                  <h4>{cand.name}</h4>
                  <p><strong>Party:</strong> {cand.party}</p>
                  <p>{cand.description}</p>
                </div>
              </div>
            ))}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Results;
