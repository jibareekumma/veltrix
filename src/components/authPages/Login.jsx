



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "/icons/main_logo.png";

import { useAuth } from "../../context/AuthContext";
import "../../css/Register.css";

const Login = function () {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login: loginUser } = useAuth();

  const handleSubmit = async function (event) {
  event.preventDefault();
  setError("");

  try {
    await loginUser(email, password);
    navigate("/home");
  } catch (submitError) {
    setError(submitError.message);
  }
};

  return (
    <section className="register">
      <div className="register__panel">
        <div className="register__content">
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

          <h1 className="register__title">Welcome back</h1>
          <p className="register__subtitle">Log in to continue with VELTRIX</p>

          <form className="register__form" onSubmit={handleSubmit}>
            <div className="register__field">
              <label className="register__label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={function (event) { setEmail(event.target.value); }}
                className="register__input"
                required
              />
            </div>

            <div className="register__field">
              <label className="register__label" htmlFor="password">Password</label>
              <div className="register__input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={function (event) { setPassword(event.target.value); }}
                  className="register__input"
                  required
                />
                <button
                  type="button"
                  className="register__toggle-visibility"
                  onClick={function () { setShowPassword(!showPassword); }}
                >
                  <svg viewBox="0 0 24 24" className="register__toggle-icon" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="register__footer-text register__footer-text--right">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

            {error && <p className="register__error">{error}</p>}

            <button type="submit" className="register__submit">
              Log In
              <span className="register__submit-arrow">→</span>
            </button>
          </form>

          <div className="register__divider">
            <span>OR</span>
          </div>

          <div className="register__social">
            <button type="button" className="register__social-btn">
              <svg viewBox="0 0 24 24" className="register__social-icon">
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.2-2 3.5-5 3.5-8.8Z" />
                <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.4 7.4 24 12 24Z" />
                <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3.1Z" />
                <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
              </svg>
              Continue with Google
            </button>
            <button type="button" className="register__social-btn">
              <svg viewBox="0 0 24 24" className="register__social-icon" fill="currentColor">
                <path d="M16.7 1c.1 1.2-.4 2.4-1.1 3.3-.8.9-2 1.6-3.2 1.5-.1-1.2.4-2.5 1.1-3.3.8-.9 2.1-1.5 3.2-1.5ZM19.9 17.4c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9-1.9 0-2.4.9-3.8.9-1.6 0-2.8-1.5-3.7-2.9-2.5-3.8-2.8-8.3-1.2-10.7 1.1-1.7 2.9-2.8 4.6-2.8 1.7 0 2.8 1 4.2 1 1.4 0 2.2-1 4.2-1 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.2.4 8.5Z" />
              </svg>
              Continue with Apple
            </button>
          </div>

          <p className="register__footer-text">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>

          <p className="register__copyright">© 2026 Veltrix. All Rights Reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Login;