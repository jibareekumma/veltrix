import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY, SHIPPING_FEE } from "../data/store";
import "../styles/pages/Cart.scss";

const Cart = function () {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page cart-page--empty">
        <svg viewBox="0 0 24 24" className="cart-page__empty-icon" fill="none" stroke="currentColor" strokeWidth="1.1">
          <path d="M6 8h12l-1 12H7L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <h1 className="cart-page__empty-title">Your Cart Is Empty</h1>
        <p className="cart-page__empty-text">Start shopping for what fits your stride.</p>
        <Link to="/products" className="btn btn--primary">
          Explore Now
          <span aria-hidden="true">→</span>
        </Link>
      </main>
    );
  }

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const orderTotal = cartTotal + shipping;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckout = function () {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/cart", reason: "checkout" } });
      return;
    }
    showToast("Checkout opens soon. Your cart is saved.", "info");
  };

  return (
    <main className="cart-page">
      <h1 className="section-title">Your Cart</h1>

      <div className="cart-page__layout">
        <ul className="cart-page__items">
          {cartItems.map(function (item) {
            return (
              <li key={item.cartItemId} className="cart-page__item">
                <Link to={`/product/${item.id}`} className="cart-page__thumb">
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="cart-page__details">
                  <Link to={`/product/${item.id}`} className="cart-page__name">
                    {item.title}
                  </Link>
                  <p className="cart-page__meta">
                    {item.size && <span>Size {item.size}</span>}
                    {item.color && <span>{item.color}</span>}
                    <span>${item.price.toFixed(2)}</span>
                  </p>
                  <button
                    type="button"
                    className="cart-page__remove"
                    onClick={function () {
                      removeFromCart(item.cartItemId);
                    }}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-page__side">
                  <div className="cart-page__stepper">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                      onClick={function () {
                        updateQuantity(item.cartItemId, item.quantity - 1);
                      }}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={item.quantity >= MAX_QUANTITY}
                      onClick={function () {
                        updateQuantity(item.cartItemId, item.quantity + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-page__subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="cart-page__summary">
          <h2 className="cart-page__summary-title">Order Summary</h2>

          <div className="cart-page__shipping">
            <p>
              {remaining > 0
                ? `Add $${remaining.toFixed(2)} more for free shipping`
                : "You've unlocked free shipping"}
            </p>
            <div className="cart-page__progress">
              <span style={{ width: `${progress}%` }}></span>
            </div>
          </div>

          <dl className="cart-page__rows">
            <div>
              <dt>Subtotal</dt>
              <dd>${cartTotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="cart-page__rows-total">
              <dt>Total</dt>
              <dd>${orderTotal.toFixed(2)}</dd>
            </div>
          </dl>

          <button type="button" className="btn btn--primary btn--block" onClick={handleCheckout}>
            {isAuthenticated ? "Proceed to Checkout" : "Log In to Checkout"}
          </button>

          {!isAuthenticated && (
            <p className="cart-page__notice">
              Guests can browse and build a cart. Checkout needs an account.
            </p>
          )}

          <Link to="/products" className="cart-page__continue">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
