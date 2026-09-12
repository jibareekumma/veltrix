

import { Link } from "react-router-dom";
import "../css/OrderSuccess.css";

const OrderSuccess = function () {
  return (
    <main className="order-success">
      <div className="order-success__icon">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="45" fill="none" strokeWidth="4" />
          <path d="M30 50 L45 65 L70 35" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="order-success__title">Order Placed Successfully</h1>
      <p className="order-success__text">
        Thank you for shopping with VELTRIX. Your order is being prepared.
      </p>

      <Link to="/products" className="order-success__cta">
        Continue Shopping &#8594;
      </Link>
    </main>
  );
};

export default OrderSuccess;