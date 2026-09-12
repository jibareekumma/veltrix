

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/Checkout.css"


const Checkout = function () {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = function (field) {
    return function (event) {
      setFormData(function (prev) {
        return { ...prev, [field]: event.target.value };
      });
    };
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    setIsProcessing(true);

    setTimeout(function () {
      clearCart();
      navigate("/order-success");
    }, 1800);
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <main className="checkout-page checkout-page--empty">
        <h2 className="checkout-page__empty-title">Your cart is empty</h2>
        <p className="checkout-page__empty-text">Add some items before checking out</p>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1 className="checkout-page__title">Checkout</h1>

      <div className="checkout-page__layout">
        <form className="checkout-page__form" onSubmit={handleSubmit}>
          <h2 className="checkout-page__section-title">Shipping Details</h2>

          <div className="checkout-page__field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              required
            />
          </div>

          <div className="checkout-page__field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={handleChange("address")}
              required
            />
          </div>

          <div className="checkout-page__field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={handleChange("city")}
              required
            />
          </div>

          <div className="checkout-page__field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange("phone")}
              required
            />
          </div>

          <button type="submit" className="checkout-page__submit" disabled={isProcessing}>
            {isProcessing ? "Processing Payment..." : `Place Order - $${cartTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-page__summary">
          <h2 className="checkout-page__section-title">Order Summary</h2>
          {cartItems.map(function (item) {
            return (
              <div key={item.cartItemId} className="checkout-page__summary-row">
                <span>{item.title} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}
          <div className="checkout-page__summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;