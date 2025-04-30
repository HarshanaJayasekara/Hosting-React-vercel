import React, { useState } from "react";
import "./AdminLogin.css";
import logo from '../assets/nsbm.png';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");
    } catch (err) {
      setError("❌ Invalid email or password");
      console.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/Home");
    } catch (err) {
      setError("❌ Google Sign-In failed");
      console.error(err.message);
    }
  };

  return (
    <div className="black">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="NSBM Logo" className="logo" />
          <h2>Sign in to NSBM Administration</h2>
          <p>Sign in to NSBM Green University Election Department 2026</p>
        </div>

        <div className="login-card">
          <div className="login-form">
            <div className="form-group" id="fr">
              <label id="lbl">Username or email address</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="form-group"  >
              <label id="lbl">Enter Password</label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <div className="forgot">
                <a href="#">Forgot password?</a>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-3 er">{error}</p>}

            <button className="sign-in-button" onClick={handleSignIn}>
              Sign in
            </button>

            <button className="google-sign-in" onClick={handleGoogleSignIn}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p id="fp">
            New to Member? <a href="/">Create an account</a>
          </p>
        </div>

        <div className="footer-bottom">
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Contact NSBM Support</a></li>
            <li><a href="#">Do not share my personal information</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
