


import { Link } from "react-router-dom";

import mainLogo from "/icons/main_logo.png";

import "../../css/Success.css";


const Success = function () {
  return (
    <div className="success-container">

        <div className="register__header">
            <Link to="/" className="register__logo-link">
              <img src={mainLogo} alt="Veltrix" className="register__logo" />
            </Link>
          </div>

      <div className="reset-card">

        <div className="reset-content">

          <div className="success-icon">
            <svg viewBox="0 0 100 100" width="80" height="80" className="success-icon-svg">
              <circle cx="50" cy="50" r="45" fill="none" strokeWidth="4" />
              <path d="M30 50 L45 65 L70 35" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h3>
            <span>PASSWORD RESET</span>
            <mark>SUCCESSFUL</mark>
          </h3>

          <p>
            Your password has been reset successfully.
            You can now login to your account.
          </p>

          <Link to="/login" className="login-btn">
            GO TO LOGIN
            <span>→</span>
          </Link>

        </div>

        <div className="reset-footer">
          <span>Secure</span>
          <span>•</span>
          <span>Fast</span>
          <span>•</span>
          <span>Easy</span>
        </div>

      </div>

    </div>
  );
};

export default Success;