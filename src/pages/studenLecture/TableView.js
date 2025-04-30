import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './TableView.css';
import Navbar from '../../components/Navbar';

const TableView = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'student'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div >
      <div className='navbar'>
      <Navbar/>
      </div>
      
    <div className="table-container">
      
      <h2>🎓 Vorters List </h2>
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Gender</th>
              <th>Facalty</th>
              <th>Degree</th>
              <th>POsistion</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.college}</td>
                  <td>{student.degree}</td>
                  <td>{student.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No student data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default TableView;
