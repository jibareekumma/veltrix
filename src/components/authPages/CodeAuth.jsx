


import React from 'react';
import "../../css/CodeAuth.css"

const CodeAuth = () => {
  return (
    <div className="code-auth-container">
      <div className="logo">
        <h1>VELTRIX</h1>
      </div>
      
      <div className="reset-card">
        <h2>RESET PASSWORD</h2>
        
        <div className="reset-content">
          <h3>CHECK YOUR EMAIL</h3>
          <p>We've sent a 6-digit verification code to <span>john@example.com</span></p>
          
          <div className="code-info">
            <span className="expiry-label">Code expires in</span>
            <span className="timer">10:00</span>
          </div>
          
          <div className="code-inputs">
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
          </div>
          
          <button className="verify-btn">VERIFY CODE</button>
        </div>
      </div>
    </div>
  );
};

export default CodeAuth;