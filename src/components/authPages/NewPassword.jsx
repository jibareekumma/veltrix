

import { Link, useNavigate } from "react-router-dom";

import mainLogo from "/icons/main_logo.png";
import lockIcon from "/icons/lock-icon.png";
import eyeIcon from "/icons/eye-icon.png";

import "../../css/NewPassword.css";


const NewPassword = function () {
  const navigate = useNavigate();

  return (
    <div className="new-password-container">

        <div className="register__header">
            <button type="button" className="register__back" onClick={function () { navigate(-1); }}>
              <svg viewBox="0 0 24 24" className="register__back-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <Link to="/" className="register__logo-link">
              <img src={mainLogo} alt="Veltrix" className="register__logo" />
            </Link>
          </div>

      <div className="reset-card">

        <h2>
          RESET PASSWORD
          <span></span>
          <div className="step-indicator">
            <span className="step-dot completed">1</span>
            <span className="step-line"></span>
            <span className="step-dot active">2</span>
            <span className="step-line"></span>
            <span className="step-dot">3</span>
          </div>
        </h2>

        <div className="reset-content">

          <h3>
            <span>CREATE NEW</span>
            <mark>PASSWORD</mark>
          </h3>

          <p>
            Your new password must be at least 8 characters
            and include a mix of letters, numbers and symbols.
          </p>

          <div className="form-group">

            <div className="input-box">

              <img src={lockIcon} alt="" />

              <div className="input-content">

                <label htmlFor="password">
                  New Password <span>*</span>
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                />

              </div>

              <img src={eyeIcon} alt="" className="toggle-icon" />

            </div>

          </div>

          <div className="form-group">

            <div className="input-box">

              <img src={lockIcon} alt="" />

              <div className="input-content">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                />

              </div>

              <img src={eyeIcon} alt="" className="toggle-icon" />

            </div>

          </div>

          <button className="reset-btn" type="button">
            RESET PASSWORD
            <span>→</span>
          </button>

          <Link to="/login" className="back-login">
            <span>←</span>
            Back to Login
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

export default NewPassword;