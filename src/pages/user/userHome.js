
import {Link, useNavigate } from 'react-router-dom';
import logoImg from '../../pages/assets/nsbm.png';
import Navbar from './userNavbar';
import './userHome.css';

import React, {} from 'react';

const Homes = () => {
  const navigate = useNavigate();

  const navCards = [ 
    
    {
      title: 'Voter List',
      path: '/VoterList',
      description: 'Register candidates with complete profile information, including manifesto and facial recognition.',
    },
    {
      title: 'Candidator List',
      path: '/results',
      description: 'View real-time voting results and final election summaries.',
    },
    {
      title: 'Election Results',
      path: '/LeadersRegister',
      description: 'Browse and manage records of all registered voters in the system.',
    },
    {
        title: 'Location',
        path: '/VotingLocations',
        description: 'Browse and manage records of all registered voters in the system.',
      },
      {
        title: 'Rules & Guideline',
        path: '/RulesGuidelines',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      },
      {
        title: 'Idea & Complain',
        path: '/IdeasComplaints',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      },
      {
        title: 'Contact',
        path: '/voter-register',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      },{
        title: 'About Us',
        path: '/voter-register',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      }
  ];
  
  

  return (
    <div className='cont'>
        <Navbar />
    <div className="home-container">

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

        </div>
      </div>
    </div>
  );
};

export default Homes;
