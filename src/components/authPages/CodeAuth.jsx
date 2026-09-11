

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyResetCode, requestResetCode } from "../../api/auth";

import mainLogo from "/icons/main_logo.png";
import clockIcon from "/icons/clock-icon.png";

import "../../css/CodeAuth.css";

const CodeAuth = function () {
  const navigate = useNavigate();
  const email = localStorage.getItem("veltrix_reset_email") || "";
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const inputRefs = useRef([]);

  useEffect(function () {
    if (secondsLeft <= 0) return;
    const timer = setInterval(function () {
      setSecondsLeft(function (prev) { return prev - 1; });
    }, 1000);
    return function () { clearInterval(timer); };
  }, [secondsLeft]);

  const formatTime = function (totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleDigitChange = function (index, value) {
    if (!/^[0-9]?$/.test(value)) return;
    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = function (index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async function () {
    setError("");
    const code = digits.join("");

    if (code.length !== 6) {
      setError("Enter the full 6-digit code");
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyResetCode(email, code);
      navigate("/newPassword");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async function (event) {
    event.preventDefault();
    setError("");

    try {
      await requestResetCode(email);
      setSecondsLeft(600);
      setDigits(["", "", "", "", "", ""]);
    } catch (resendError) {
      setError(resendError.message);
    }
  };

  return (
    <div className="code-auth-container">

        <div className="register__header">
            <button type="button" className="register__back"
            onClick={function () { navigate(-1); }}>
              <svg viewBox="0 0 24 24" className="register__back-icon"
              fill="none" stroke="currentColor" strokeWidth="2">
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
            <span> {email}</span>
          </p>

          <div className="code-info">
            <img src={clockIcon} alt="" />
            <span className="expiry-label">Code expires in</span>
            <span className="timer">{formatTime(secondsLeft)}</span>
          </div>

          <div className="code-inputs">
            {digits.map(function (digit, index) {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={function (el) { inputRefs.current[index] = el; }}
                  onChange={function (event) { handleDigitChange(index, event.target.value); }}
                  onKeyDown={function (event) { handleKeyDown(index, event); }}
                />
              );
            })}
          </div>

          {error && <p className="register__error">{error}</p>}

          <button className="verify-btn" type="button" onClick={handleVerify} disabled={isSubmitting}>
            {isSubmitting ? "VERIFYING..." : "VERIFY CODE"}
            <span>→</span>
          </button>

          <a href="#" className="resend-code" onClick={handleResend}>
            <span>↺</span>
            Resend code
          </a>

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