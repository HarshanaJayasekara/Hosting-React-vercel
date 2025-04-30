import React from 'react';
import Navbar from '../../components/Navbar'; 
import './RulesGuidelines.css';

const RulesGuidelines = ({ user, showImage, setShowImage, handleLogout, navCards }) => {
  return (
    <>
     

      <div className="rules-page">
        <h1>🗳️ University Election Rules & Guidelines</h1>
        <p>Please read and follow these rules to ensure a fair and transparent election process.</p>

        <div className="rules-section">
          <h2>Eligibility</h2>
          <ul>
            <li>All candidates must be current students of the university.</li>
            <li>Voters must be registered and present a valid university ID card.</li>
          </ul>

          <h2>Campaign Guidelines</h2>
          <ul>
            <li>Campaigning is allowed only during the specified period.</li>
            <li>Use of defamatory language or personal attacks is strictly prohibited.</li>
            <li>Distribution of promotional material must be approved by the election committee.</li>
          </ul>

          <h2>Voting Rules</h2>
          <ul>
            <li>Voting is conducted through the official university election system.</li>
            <li>Each voter can only vote once. Multiple voting is not permitted.</li>
            <li>Any act of voter intimidation will result in disqualification.</li>
          </ul>

          <h2>Penalties</h2>
          <ul>
            <li>Violation of any rules may lead to disqualification of the candidate.</li>
            <li>Serious misconduct will be reported to the university administration.</li>
          </ul>
        </div>

        <p className="note">🔔 For any queries or concerns, please contact the election committee at elections@university.edu.</p>
      </div>

    </>
  );
};

export default RulesGuidelines;
