


import { Link } from "react-router-dom";
import CodeAuth from "./CodeAuth";

import mailIcon from "/icons/mail-icon.png"

import "../../css/EmailInput.css"

const EmailInput = function() {
  return (
    <div className="email-input-container">
      
      <div className="reset-card">
        <h2>RESET PASSWORD <span></span></h2>
        
        <div className="reset-content">
          <h3>FORGOT YOUR PASSWORD?</h3>
          <p>No worries! 
            Enter your email address and we'll send 
            you a 6-digit code to help you reset your password.</p>
          
          <div className="form-group">
  <div className="input-box">
    <img src={mailIcon} alt="Email" />

    <div className="input-content">
      <label htmlFor="email">Email Address</label>

      <input
        id="email"
        type="email"
        placeholder="Enter your email address"
      />
    </div>
  </div>
</div>
          
        <Link to= {'/codeAuth'} 
        className="send-btn"
          >SEND CODE</Link>
        </div>
      </div>
    </div>
  );
};

export default EmailInput;