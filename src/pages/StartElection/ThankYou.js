import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/voter-identify");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="thanks">
      <div className="thank-you-page">
        <h1>✅ Thank You!</h1>
        <p>Your vote has been successfully recorded.</p>
        <p>Redirecting you to the identification page...</p>
      </div>
    </div>
  );
};

export default ThankYou;
