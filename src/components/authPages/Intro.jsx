


import { Link } from "react-router-dom";
import mainLogo from "/icons/main_logo.png";
import "../../css/Intro.css";

const Intro = function () {
  return (
    <section className="intro">
      <div className="intro__panel">
        <header className="intro__header">
          <Link to="/" className="intro__logo-link">
            <img src={mainLogo} alt="Veltrix" className="intro__logo" />
          </Link>
          <nav className="intro__nav">
            
          </nav>
          <Link to="/cart" className="intro__cart">
            <svg viewBox="0 0 24 24" className="intro__cart-icon" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="intro__cart-count">0</span>
          </Link>
        </header>

        <div className="intro__content">
          <span className="intro__eyebrow"> ~Welcome To</span>
          <h1 className="intro__title">
            Engineered
            <br />
            <span className="intro__title-accent">To Move</span>
          </h1>
          <p className="intro__text">
            Performance meets precision. 
            Innovative design for every step. 
            Built to move. Built to stand out.
          </p>

          <div className="intro__actions">
            <Link to="/home" className="intro__btn intro__btn--primary">
              Sign Up
              <span className="intro__btn-arrow">→</span>
            </Link>
            <Link to="/home" className="intro__btn intro__btn--outline">
              Log In
              <span className="intro__btn-arrow">→</span>
            </Link>
          </div>

          <div className="intro__divider">
            <span>OR</span>
          </div>

          <Link to="/home" className="intro__guest">
            <svg viewBox="0 0 24 24" className="intro__guest-icon" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
            </svg>
            Continue As Guest
          </Link>

          <div className="intro__features">
            <div className="intro__feature">
              <svg viewBox="0 0 24 24" className="intro__feature-icon" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
                <path d="M9.5 12l1.8 1.8 3.2-3.6" />
              </svg>
              <span>Premium Quality</span>
            </div>
            <div className="intro__feature">
              <svg viewBox="0 0 24 24" className="intro__feature-icon" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 7h11v9H2z" />
                <path d="M13 10h4l4 3v3h-8z" />
                <circle cx="6" cy="18" r="1.6" />
                <circle cx="17" cy="18" r="1.6" />
              </svg>
              <span>Fast & Secure Delivery</span>
            </div>
            <div className="intro__feature">
              <svg viewBox="0 0 24 24" className="intro__feature-icon" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="8" r="5" />
                <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
              </svg>
              <span>Exclusive Offers</span>
            </div>
          </div>

          <p className="intro__copyright">© 2026 Veltrix. All Rights Reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;