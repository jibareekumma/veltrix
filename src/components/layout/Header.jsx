import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/Header.scss";

import mainLogo from "/icons/main_logo.png";

const getNavClass = function ({ isActive }) {
  return isActive ? "header__link header__link--active" : "header__link";
};

const Header = function () {
  const { cartCount } = useCart();
  const { isAuthenticated, isGuest, displayName } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(function () {
    const handleScroll = function () {
      setIsScrolled(window.scrollY > 12);
    };
    const handleKeyDown = function (event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return function () {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = function () {
    setIsMenuOpen(function (prevState) {
      return !prevState;
    });
  };

  const closeMenu = function () {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">
        <Link to="/home" className="header__logo" onClick={closeMenu}>
          <img src={mainLogo} alt="Veltrix" />
        </Link>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li>
              <NavLink to="/home" end className={getNavClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={getNavClass} onClick={closeMenu}>
                Shop
              </NavLink>
            </li>
            <li>
              <Link to="/home#contact" className="header__link" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          {isGuest && <span className="header__guest">Guest</span>}

          {isAuthenticated ? (
            <Link to="/account" className="header__avatar" aria-label="My account" title={displayName}>
              {displayName.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link to="/login" className="header__login">
              Log In
            </Link>
          )}

          <Link to="/cart" className="header__cart" aria-label={`Cart, ${cartCount} items`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span key={cartCount} className="header__cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className={`header__menu-toggle ${isMenuOpen ? "header__menu-toggle--open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
