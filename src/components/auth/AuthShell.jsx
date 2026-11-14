import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/Auth.scss";

import mainLogo from "/icons/main_logo.png";

const AuthShell = function ({ title, subtitle, notice, footer, children }) {
  const navigate = useNavigate();
  const { continueAsGuest } = useAuth();

  const handleGuest = function () {
    continueAsGuest();
    navigate("/home");
  };

  return (
    <section className="auth">
      <div className="auth__panel">
        <div className="auth__card">
          <div className="auth__header">
            <button
              type="button"
              className="auth__back"
              onClick={function () {
                navigate(-1);
              }}
              aria-label="Go back"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <Link to="/" className="auth__logo-link">
              <img src={mainLogo} alt="Veltrix" className="auth__logo" />
            </Link>
          </div>

          <h1 className="auth__title">{title}</h1>
          <p className="auth__subtitle">{subtitle}</p>

          {notice && <p className="auth__notice">{notice}</p>}

          {children}

          <div className="auth__divider">
            <span>OR</span>
          </div>

          <button type="button" className="btn btn--outline-light btn--block" onClick={handleGuest}>
            Continue As Guest
          </button>
          <p className="auth__hint">
            Browse and build a cart. Checkout and account features need an account.
          </p>

          <p className="auth__footer">{footer}</p>
        </div>
      </div>
    </section>
  );
};

export default AuthShell;
