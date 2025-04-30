import React, { useState } from "react";
import { auth, provider } from "../../firebase/firebaseConfig"; // 'provider' will be created below
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === "admin@example.com") {
        navigate("/admin-chat");
      } else {
        navigate("/user-chat");
      }

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email === "admin@example.com") {
        navigate("/admin-chat");
      } else {
        navigate("/user-chat");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login (Admin or User)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
