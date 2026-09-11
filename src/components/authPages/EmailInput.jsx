

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestResetCode } from "../../api/auth";

import mailIcon from "/icons/mail-icon.png";
import mainLogo from "/icons/main_logo.png";

import "../../css/EmailInput.css";

const EmailInput = function () {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async function (event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await requestResetCode(email);
      localStorage.setItem("veltrix_reset_email", email);
      navigate("/codeAuth");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="email-input-container">

        <div className="register__header">
            <button type="button"
            className="register__back"
            onClick={function () { navigate(-1); }}>
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

          <form onSubmit={handleSubmit}>

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
                    value={email}
                    onChange={function (event) { setEmail(event.target.value); }}
                    required
                  />

                </div>

              </div>

            </div>

            {error && <p className="register__error">{error}</p>}

            <button className="send-code-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "SENDING..." : "SEND CODE"}
              <span>→</span>
            </button>

          </form>

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

export default EmailInput;