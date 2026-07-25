

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ImagePlaceholder from "../components/ImagePlaceholder/ImagePlaceholder";
import "../css/Cart.css";

const Cart = function () {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page cart-page--empty">
        <ImagePlaceholder className="cart-page__empty-image" label="Empty Cart" ratio="1/1" />
        <h2 className="cart-page__empty-title">Your Cart is Empty</h2>
        <p className="cart-page__empty-text">Start shopping for what fits your stride</p>
        <Link to="/products" className="cart-page__cta">
          Explore Now &#8594;
        </Link>
      </main>
    );
  }

  const handleQuantityChange = function (productId, event) {
    updateQuantity(productId, Number(event.target.value));
  };

  return (
    <main className="cart-page">
      <h1 className="cart-page__title">Your Cart</h1>
      <div className="cart-page__table">
        <div className="cart-page__row cart-page__row--header">
          <span className="cart-page__cell cart-page__cell--item">Item</span>
          <span className="cart-page__cell">Quantity</span>
          <span className="cart-page__cell">Subtotal</span>
          <span className="cart-page__cell">Actions</span>
        </div>
        {cartItems.map(function (item) {
          return (
            <div key={item.id} className="cart-page__row">
              <div className="cart-page__cell cart-page__cell--item">
                <ImagePlaceholder className="cart-page__item-image" label={item.title} ratio="1/1" />
                <div className="cart-page__item-details">
                  <p className="cart-page__item-name">{item.title}</p>
                  <small className="cart-page__item-price">Price: ${item.price.toFixed(2)}</small>
                </div>
              </div>
              <span className="cart-page__cell">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  className="cart-page__quantity"
                  onChange={function (event) {
                    handleQuantityChange(item.id, event);
                  }}
                />
              </span>
              <span className="cart-page__cell">${(item.price * item.quantity).toFixed(2)}</span>
              <span className="cart-page__cell">
                <button
                  className="cart-page__remove"
                  onClick={function () {
                    removeFromCart(item.id);
                  }}
                >
                  Remove
                </button>
              </span>
            </div>
          );
        })}
      </div>
      <div className="cart-page__summary">
        <p className="cart-page__total">Total: ${cartTotal.toFixed(2)}</p>
        <button className="cart-page__checkout">Proceed to Checkout</button>
      </div>
    </main>
  );
};

export default Cart;