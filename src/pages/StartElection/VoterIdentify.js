import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import './VoterIdentify.css';
import { FaPowerOff } from 'react-icons/fa'; // End election icon

const VoterIdentify = () => {
  const webcamRef = useRef(null);
  const [uniId, setUniId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        console.log('✅ Face-api.js models loaded');
      } catch (err) {
        console.error('❌ Failed to load models:', err);
        setMessage('Error loading face recognition models.');
      }
    };
    loadModels();
  }, []);

  const handleIdentify = async () => {
    if (!uniId.trim()) {
      setMessage('Please enter your University ID.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const screenshot = webcamRef.current.getScreenshot();
      const img = await faceapi.fetchImage(screenshot);

      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setMessage('❌ No face detected. Please try again.');
        setLoading(false);
        return;
      }

      const inputDescriptor = detection.descriptor;

      const voterSnapshot = await getDocs(collection(db, 'voters'));
      const allVoters = voterSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const matchedVoter = allVoters.find(v => v.uniId === uniId && v.faceDescriptors?.length === 384);

      if (!matchedVoter) {
        setMessage('❌ University ID not found or face data missing.');
        setLoading(false);
        return;
      }

      const storedDescriptors = [];
      for (let i = 0; i < 3; i++) {
        const descriptor = matchedVoter.faceDescriptors.slice(i * 128, (i + 1) * 128);
        storedDescriptors.push(new Float32Array(descriptor));
      }

      const distances = storedDescriptors.map(d =>
        faceapi.euclideanDistance(inputDescriptor, d)
      );
      const bestMatch = Math.min(...distances);

      console.log('Matching distance:', bestMatch);

      if (bestMatch < 0.5) {
        const votesSnapshot = await getDocs(collection(db, 'votes'));
        const alreadyVoted = votesSnapshot.docs.some(doc => doc.data().voterId === matchedVoter.id);

        if (alreadyVoted) {
          setMessage('🗳️ You have already voted!');
        } else {
          navigate('/CandidateList', { state: { voter: matchedVoter } });
        }
      } else {
        setMessage('❌ Face does not match your ID.');
      }

    } catch (err) {
      console.error('Identification error:', err);
      setMessage('❌ An error occurred during verification.');
    }

    setLoading(false);
  };

  const handleAdminSubmit = () => {
    if (adminPassword === 'admin123') {
      navigate('/reset-election');
    } else {
      alert('❌ Incorrect admin password.');
    }
    setShowPasswordPrompt(false);
    setAdminPassword('');
  };

  return (
    <div className="identify-page">
      {/* Admin End Election Button */}
      <div className="top-right-icon" onClick={() => setShowPasswordPrompt(true)}>
        <FaPowerOff size={24} title="End Election" />
      </div>

      {showPasswordPrompt && (
        <div className="admin-password-modal" onClick={() => setShowPasswordPrompt(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Enter Admin Password</h4>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
              className="password-input"
            />
            <div className="modal-actions">
              <button onClick={handleAdminSubmit}>Submit</button>
              <button onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="identify-container">
        <h2>🧑‍💼 Voter Identification</h2>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
          width={320}
          audio={false}
        />

        <input
          type="text"
          placeholder="Enter University ID"
          value={uniId}
          onChange={(e) => setUniId(e.target.value)}
          className="input-box"
        />

        <button onClick={handleIdentify} className="btn-primary" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VoterIdentify;
