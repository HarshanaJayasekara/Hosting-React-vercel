import React, { useState } from 'react';
import './AdminRegister.css';
import logo from '../assets/nsbm.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '', username: '' });
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    const errors = {};
    if (!formValues.email) errors.email = 'Email cannot be blank';
    if (!formValues.password) errors.password = 'Password cannot be blank';
    if (!formValues.username) errors.username = 'Username cannot be blank';
    return errors;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    setTouched({ email: true, password: true, username: true });

    if (Object.keys(errors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
        const user = userCredential.user;

        await setDoc(doc(db, 'admins', user.uid), {
          username: formValues.username,
          email: formValues.email,
          createdAt: new Date()
        });

        navigate('/AdminLogin');
      } catch (err) {
        setErrorMsg(err.message);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store additional user info
      await setDoc(doc(db, 'admins', user.uid), {
        username: user.displayName || 'Google User',
        email: user.email,
        createdAt: new Date()
      });

      navigate('/AdminLogin');
    } catch (err) {
      console.error(err);
      setErrorMsg("Google Sign Up Failed.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={logo} alt="NSBM Logo" className="logo" />
        <h1>Welcome to NSBM University</h1>
        <p>This is NSBM University’s official platform for election registration. Only administration department members are allowed to register here.</p>
        <div className='log'>
          <p>Already have an account? <Link to="/AdminLogin">Sign in →</Link></p>
        </div>
      </div>

      <div className="register-right">
        <form className="register-box" onSubmit={handleSubmit}>
          <div className='nsbm'>
            <img src={logo} alt="NSBM Logo" className="logo" />
          </div>

          <h2>Election Members Registration</h2>
          <div className='form-box'>
            {/* Email */}
            <label>Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.email && touched.email ? 'input-error' : ''}
            />
            {formErrors.email && touched.email && <p className="error">⚠ {formErrors.email}</p>}

            {/* Password */}
            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.password && touched.password ? 'input-error' : ''}
            />
            {formErrors.password && touched.password && <p className="error">⚠ {formErrors.password}</p>}
            <p className="info">Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>

            {/* Username */}
            <label>Username*</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.username && touched.username ? 'input-error' : ''}
            />
            {formErrors.username && touched.username && <p className="error">⚠ {formErrors.username}</p>}
            <p className="info">Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.</p>

            {errorMsg && <p className="error mt-2 text-red-500">{errorMsg}</p>}

            <button type="submit" className="continue-btn">Continue →</button>

            <div className="or-divider">
              <hr /><span>OR</span><hr />
            </div>

            <button type="button" className="google-sign-up-btn" onClick={handleGoogleSignUp}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
              Sign up with Google
            </button>

            <div className='mute'>
              <p className="terms">
                By creating an account, you agree to the <a href="#">Terms of Service</a>. 
                See our <a href="#">NSBM Privacy Statement</a>.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
