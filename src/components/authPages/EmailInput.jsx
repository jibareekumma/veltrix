


import { Link } from "react-router-dom";
import CodeAuth from "./CodeAuth";

import mailIcon from "/icons/mail-icon.png";
import mainLogo from "/icons/main_logo.png";

import "../../css/EmailInput.css";

const EmailInput = function () {
  return (
    <div className="email-input-container">

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
        </h2>

        <div className="reset-content">

          <h3>
            <span>FORGOT YOUR</span>
            <mark>PASSWORD?</mark>
          </h3>

          <p>
            No worries! Enter your email address and
            we'll send you a 6-digit code to help you
            reset your password.
          </p>

          <div className="form-group">

            <div className="input-box">

              <img src={mailIcon} alt="Email" />

              <div className="input-content">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                />

              </div>

            </div>

          </div>

          <button className="send-code-btn" type="button">
            SEND CODE
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

      <Link to={'/codeAuth'}>Code Auth</Link>
      <Link to={'/newPassword'}>New password</Link>
      <Link to={'/success'}>Success</Link>

    </div>
  );
};

export default EmailInput;