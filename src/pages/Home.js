
import Navbar from '../components/Navbar';
import {Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logoImg from '../pages/assets/nsbm.png';

import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Home = () => {
  const navigate = useNavigate();

  //! navbar profile add
  const [user, setUser] = useState(null);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setShowImage(true); // Reset image visibility when user changes
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/AdminLogin');
  };
  //! navbar profile end

  const navCards = [ 
    {
      title: 'Voter Registration',
      path: '/voter-register',
      description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
    },
    {
      title: 'Candidate Registration',
      path: '/candidate-register',
      description: 'Register candidates with complete profile information, including manifesto and facial recognition.',
    },
    {
      title: 'Election Results',
      path: '/results',
      description: 'View real-time voting results and final election summaries.',
    },
    {
      title: 'Voter LeadersRegister',
      path: '/LeadersRegister',
      description: 'Browse and manage records of all registered voters in the system.',
    },
    {
      title: 'Candidate Manager',
      path: '/CandidateManager',
      description: 'View a list of all registered candidates with their respective details.',
    },
    {
      title: 'Edit Profiles',
      path: '/LeaderList',
      description: 'Update and manage voter and candidate profiles securely.',
    },
    {
      title: 'reset-election',
      path: '/reset-election',
      description: 'Overview of system statistics including registration counts and election status.',
    },
    {
      title: 'Start Election',
      path: '/start-election',
      description: 'Initiate the election process with admin-level authentication and controls.',
    },
  ];
  
  

  return (
    <div className="home-container">
      <Navbar />
      <div>
      <div className="home-sidebar">
        <h3 className="sidebar-title">Admin Dashboard</h3>
        <ul className="sidebar-list">
          {navCards.map((card, index) => (
            <li key={index} onClick={() => navigate(card.path)} className="sidebar-link">
              {card.title}
            </li>
          ))}
        </ul>
      </div>
      <div className='my-slider'>
            <h5>Rules & Condition</h5>
            <div className='my-p'>
            <p>Elections voters rule</p>
            <p>Candidators rule and condition</p>
            </div>
      </div>
      
      </div>

      <div className="home-content">
      <img src={logoImg} alt="Logo" className="logo-imgs" onClick={() => navigate('/home')} />
        <h2 className="home-title">Face Recognition Smart Voting System</h2>
        <p className="home-subtitle">Welcome to the NSBM Admin Election Portal</p>
        <div className="card-grid">
          {navCards.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button onClick={() => navigate(card.path)}> Click Here</button>
            </div>
          ))}
        </div>

         {/* ✅ Right Slider Here */}
         <div className="right-slider">

          {/* profile start*/}
          <div className="profile">
        {user ? (
          <div className="profileImg">
            {user.photoURL && showImage && (
              <img
                src={user.photoURL}
                alt="User"
                className="user-img"
                onError={() => setShowImage(false)} // Hide image if it fails to load
              />
              
            )}
            <br/>
            <span className="profileName">{user.displayName || 'Admin'}</span>
            <br/>
            <span className="profileEmail">{user.email || 'Admin@gmail.com'}</span>
            
            <button className="profileBtn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="ProfileBtn2" onClick={() => navigate('/AdminLogin')}>Login</button>
        )}
      </div>
      {/*profile end*/}
            <div className="right-slider-content">
              <h5>Rules & Conditions</h5>
              <p>• All voters must be registered with a valid University ID and face verification.</p>
              <p>• Each voter is allowed to vote only once during the election period.</p>
              <p>• Candidates must submit accurate personal information and a valid manifesto.</p>
              <p>• Face recognition must match the registered profile for both voters and candidates.</p>
              <br />
              <h5>Candidate Rules:</h5>
              <p>• Must be a current student eligible to contest in elections.</p>
              <p>• Submission of manifesto is required at registration.</p>
             
            </div>
          </div>



      </div>
      
    </div>
  );
};

export default Home;
