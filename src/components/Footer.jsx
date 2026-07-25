

import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = function () {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <h2 className="footer__logo">STRYDE</h2>
          <p className="footer__text">
            Footwear built for movement. Subscribe for early access to new drops and offers.
          </p>
          <form className="footer__newsletter">
            <input type="email" placeholder="Your Email Address" className="footer__input" />
            <button type="submit" className="footer__button">
              Subscribe
            </button>
          </form>
        </div>
        <div className="footer__column" id="contact">
          <h3 className="footer__heading">Contact Us</h3>
          <ul className="footer__list">
            <li>Plot 16A George Anele Estate, Victoria Island, Lagos</li>
            <li>+(234) 803 891 5702</li>
            <li>info@stryde.com.ng</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="footer__heading">Useful Links</h3>
          <ul className="footer__list">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Return Policy</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="footer__heading">Shop</h3>
          <ul className="footer__list">
            <li>
              <Link to="/products">All Shoes</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <a href="#">Track Order</a>
            </li>
            <li>
              <a href="#">Order History</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright">
        <p>&copy; 2026 Stryde. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;