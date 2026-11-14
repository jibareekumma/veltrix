import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import "../../styles/components/Footer.scss";

import mainLogo from "/icons/main_logo.png";

const Footer = function () {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = function (event) {
    event.preventDefault();
    showToast("You're on the list. Watch your inbox for the next drop.");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={mainLogo} alt="Veltrix" className="footer__logo" />
          <p className="footer__text">
            Footwear built for movement. Subscribe for early access to new drops and offers.
          </p>
          <form className="footer__newsletter" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className="footer__input"
              value={email}
              onChange={function (event) {
                setEmail(event.target.value);
              }}
              aria-label="Email address"
              required
            />
            <button type="submit" className="footer__button">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer__column" id="contact">
          <h3 className="footer__heading">Contact Us</h3>
          <ul className="footer__list">
            <li>23 Christ Ave, off Aker Road, Iwofe, Port Harcourt</li>
            <li>
              <a href="tel:+2349130330586">+234 913 0330 586</a>
            </li>
            <li>
              <a href="mailto:jibareekuumma@gmail.com">jibareekuumma@gmail.com</a>
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
              <Link to="/products?category=Running">Running</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/account">My Account</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__copyright">
        <p>&copy; 2026 Veltrix. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
