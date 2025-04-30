import React from 'react';
import { db } from './firebase'; // your Firebase config
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import './UploadLecturersData.css';

const studentData = [
  { name: 'Harshana Perera', age: 22, gender: 'Male', college: 'NSBM', degree: 'SE', address: 'Colombo' },
  { name: 'Sithara Jayasuriya', age: 24, gender: 'Female', college: 'SLIIT', degree: 'CS', address: 'Galle' },
  { name: 'Nimashi Fernando', age: 21, gender: 'Female', college: 'UOM', degree: 'IT', address: 'Kandy' },
  { name: 'Kasun Ranathunga', age: 25, gender: 'Male', college: 'UCSC', degree: 'CS', address: 'Negombo' },
  { name: 'Dinuka Silva', age: 23, gender: 'Male', college: 'UOM', degree: 'SE', address: 'Kurunegala' },
  { name: 'Ishara Abeysekera', age: 22, gender: 'Female', college: 'NSBM', degree: 'SE', address: 'Matara' },
  { name: 'Tharindu Wickrama', age: 24, gender: 'Male', college: 'CINEC', degree: 'CS', address: 'Jaffna' },
  { name: 'Hasini Rathnayake', age: 20, gender: 'Female', college: 'SLTC', degree: 'AI', address: 'Anuradhapura' },
  { name: 'Chamod Jayawardena', age: 26, gender: 'Male', college: 'UOC', degree: 'SE', address: 'Gampaha' },
  { name: 'Menaka Gunarathne', age: 21, gender: 'Female', college: 'NSBM', degree: 'CS', address: 'Batticaloa' },
  { name: 'Shehan Madushanka', age: 23, gender: 'Male', college: 'SLIIT', degree: 'SE', address: 'Polonnaruwa' },
  { name: 'Pavithra Senanayake', age: 22, gender: 'Female', college: 'Plymouth', degree: 'SE', address: 'Ratnapura' },
  { name: 'Isuru Dissanayake', age: 24, gender: 'Male', college: 'NSBM', degree: 'IT', address: 'Badulla' },
  { name: 'Lihini Herath', age: 25, gender: 'Female', college: 'UCSC', degree: 'AI', address: 'Kalutara' },
  { name: 'Ravindu Karunathilake', age: 23, gender: 'Male', college: 'IIT', degree: 'CS', address: 'Colombo' },
  { name: 'Janani Kumari', age: 22, gender: 'Female', college: 'OUSL', degree: 'IT', address: 'Nuwara Eliya' },
  { name: 'Amila Senarath', age: 24, gender: 'Male', college: 'UOM', degree: 'SE', address: 'Hambantota' },
  { name: 'Sanduni Rajapaksha', age: 21, gender: 'Female', college: 'NSBM', degree: 'SE', address: 'Trincomalee' },
  { name: 'Ashan Fernando', age: 22, gender: 'Male', college: 'UCSC', degree: 'DS', address: 'Matale' },
  { name: 'Yasodara Peris', age: 23, gender: 'Female', college: 'SLIIT', degree: 'CS', address: 'Colombo' },
  { name: 'Chamara Jayasekara', age: 25, gender: 'Male', college: 'SLTC', degree: 'SE', address: 'Monaragala' },
  { name: 'Ruwani Rathnayake', age: 22, gender: 'Female', college: 'CINEC', degree: 'CS', address: 'Kegalle' },
  { name: 'Nuwan Bandara', age: 26, gender: 'Male', college: 'UOM', degree: 'SE', address: 'Puttalam' },
  { name: 'Kavindya Siriwardena', age: 21, gender: 'Female', college: 'NSBM', degree: 'SE', address: 'Galle' },
  { name: 'Thilina Mendis', age: 24, gender: 'Male', college: 'SLIIT', degree: 'CS', address: 'Colombo' },
  { name: 'Nadeesha Dilrukshi', age: 23, gender: 'Female', college: 'IIT', degree: 'AI', address: 'Kurunegala' },
  { name: 'Chathura De Silva', age: 25, gender: 'Male', college: 'OUSL', degree: 'SE', address: 'Ratnapura' },
  { name: 'Tharushi Perera', age: 22, gender: 'Female', college: 'NSBM', degree: 'IT', address: 'Kandy' },
  { name: 'Roshan Alwis', age: 24, gender: 'Male', college: 'Plymouth', degree: 'SE', address: 'Colombo' },
  { name: 'Gihani Dilhani', age: 23, gender: 'Female', college: 'UCSC', degree: 'CS', address: 'Negombo' },
];

const UploadStudentData = () => {
  const handleUpload = async () => {
    try {
      for (const student of studentData) {
        await addDoc(collection(db, 'student'), student);
      }
      alert('✅ 30 students uploaded successfully!');
    } catch (error) {
      console.error('Error uploading students:', error);
    }
  };

  const handleRemoveAll = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'student'));
      const deletePromises = querySnapshot.docs.map((docSnap) => deleteDoc(doc(db, 'student', docSnap.id)));
      await Promise.all(deletePromises);
      alert('✅ All student records have been removed!');
    } catch (error) {
      console.error('Error removing student data:', error);
    }
  };

  return (
    <div>
      <Navbar/>

    
    <div style={{ padding: '20px' }}>
      <button onClick={handleUpload} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}>
        Upload 30 Student Records
      </button>
      <button
        onClick={handleRemoveAll}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#FF5722',
          color: 'white',
        }}
      >
        Remove All Student Records
      </button>
      
    </div>
    </div>
  );
};

export default UploadStudentData;
