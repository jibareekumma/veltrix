


import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/Header.css";

const Header = function () {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = function () {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          VELTRIX
        </Link>
        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/products">Shop</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            <span className="header__cart-icon"></span>
            {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
          </Link>
          <button className="header__menu-toggle" onClick={toggleMenu}>
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