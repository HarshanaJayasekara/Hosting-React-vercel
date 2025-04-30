import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './FindPersonPage.css';
import Navbar from '../components/Navbar';

const FindPersonPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('lecturers');
  const [dataList, setDataList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  // Fetch data from Firestore when category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, searchCategory));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDataList(items);
        setFilteredList(items); // Initially show all
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchCategory]);

  // Filter list when search query changes
  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = dataList.filter(item =>
      item.name?.toLowerCase().includes(lowerQuery) ||
      item.email?.toLowerCase().includes(lowerQuery) ||
      item.degree?.toLowerCase().includes(lowerQuery) ||
      item.subject?.toLowerCase().includes(lowerQuery)
    );
    setFilteredList(filtered);
  }, [searchQuery, dataList]);

  return (
    <div>
      <Navbar/>
    <div className="find-person-container">
      
      <h2>🔍 Find Person</h2>

      <div className="filters">
        <label>Search In:</label>
        <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
          <option value="lecturers">Lecturers</option>
          <option value="students">Students</option>
        </select>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, degree, or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredList.length > 0 ? (
        <div className="results-table">
          <h3>Results</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {searchCategory === 'lecturers' && <th>Subject</th>}
                {searchCategory === 'students' && <th>Degree</th>}
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map(item => (
                <tr key={item.id}>
                  <td>{item.name || 'N/A'}</td>
                  <td>{item.email || 'N/A'}</td>
                  {searchCategory === 'lecturers' && <td>{item.subject || 'N/A'}</td>}
                  {searchCategory === 'students' && <td>{item.degree || 'N/A'}</td>}
                  <td>{item.phone || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </div>
    </div>
  );
};

export default FindPersonPage;
