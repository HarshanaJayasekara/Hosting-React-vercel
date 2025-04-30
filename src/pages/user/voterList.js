import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './voterList.css'; // Import your CSS file for styling

const VoterList = () => {
  const [voters, setVoters] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredVoters, setFilteredVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      const votersCollection = collection(db, 'voters');
      const voterSnapshot = await getDocs(votersCollection);
      const voterData = voterSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVoters(voterData);
    };

    fetchVoters();
  }, []);

  useEffect(() => {
    const results = voters.filter(voter =>
      voter.name.toLowerCase().includes(search.toLowerCase()) ||
      voter.uniId.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVoters(results);
  }, [search, voters]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h1>Voter List</h1>
      <input
        type="text"
        placeholder="Search by Name or University ID"
        value={search}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>University ID</th>
            <th>Faculty</th>
            <th>Batch</th>
          </tr>
        </thead>
        <tbody>
          {filteredVoters.map((voter) => (
            <tr key={voter.id}>
              <td>{voter.name}</td>
              <td>{voter.uniId}</td>
              <td>{voter.faculty}</td>
              <td>{voter.batch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterList;
