

import { Link, useNavigate } from "react-router-dom";

import mainLogo from "/icons/main_logo.png";
// import clockIcon from "/icons/clock-icon.png";

import "../../css/CodeAuth.css";


const CodeAuth = function () {
  const navigate = useNavigate();

  return (
    <div className="code-auth-container">

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
            <span className="step-dot active">1</span>
            <span className="step-line"></span>
            <span className="step-dot">2</span>
            <span className="step-line"></span>
            <span className="step-dot">3</span>
          </div>
        </h2>

        <div className="reset-content">

          <h3>
            <span>CHECK YOUR</span>
            <mark>EMAIL</mark>
          </h3>

          <p>
            We've sent a 6-digit verification code to
            <span> john@example.com</span>
          </p>

          <div className="code-info">
            {/* <img src={clockIcon} alt="" /> */}
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

          <button className="verify-btn" type="button">
            VERIFY CODE
            <span>→</span>
          </button>

          <Link to="/emailInput" className="resend-code">
            <span>↺</span>
            Resend code
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

export default CodeAuth;