


import "../../css/Success.css"

const Success = () => {
  return (
    <div className="success-container">
      <div className="logo">
        <h1>VELTRIX</h1>
      </div>
      
      <div className="reset-card">
        <h2>RESET PASSWORD</h2>
        
        <div className="reset-content">
          <div className="success-icon">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" strokeWidth="4"/>
              <path d="M30 50 L45 65 L70 35" fill="none" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h3>PASSWORD RESET SUCCESSFUL</h3>
          <p>Your password has been reset successfully. You can now login to your account.</p>
          
          <button className="login-btn">GO TO LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Success;