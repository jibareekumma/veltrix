

import React from 'react';
import "../../css/NewPassword.css"

const NewPassword = () => {
  return (
    <div className="new-password-container">
      <div className="logo">
        <h1>VELTRIX</h1>
      </div>
      
      <div className="reset-card">
        <h2>RESET PASSWORD</h2>
        
        <div className="reset-content">
          <h3>CREATE NEW PASSWORD</h3>
          <p>Your new password must be at least 8 characters and include a mix of letters, numbers and symbols.</p>
          
          <div className="form-group">
            <label>New Password *</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
          
          <button className="reset-btn">RESET PASSWORD</button>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;