import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/shop/ProductGrid";
import Rating from "../components/shop/Rating";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import {
  FREE_SHIPPING_THRESHOLD,
  MAX_QUANTITY,
  RETURN_DAYS,
  SHOE_SIZES,
} from "../data/store";
import "../styles/pages/ProductDetails.scss";

const ProductView = function ({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState("");
  const [errorKey, setErrorKey] = useState(0);

  const relatedProducts = products
    .filter(function (item) {
      return item.id !== product.id;
    })
    .sort(function (a, b) {
      return Number(b.category === product.category) - Number(a.category === product.category);
    })
    .slice(0, 4);

  const decreaseQuantity = function () {
    setQuantity(function (prevQuantity) {
      return Math.max(1, prevQuantity - 1);
    });
  };

  const increaseQuantity = function () {
    setQuantity(function (prevQuantity) {
      return Math.min(MAX_QUANTITY, prevQuantity + 1);
    });
  };

  const handleAddToCart = function () {
    if (!size) {
      setSizeError("Please choose a size before adding to cart");
      setErrorKey(function (prevKey) {
        return prevKey + 1;
      });
      return;
    }
    setSizeError("");
    addToCart(product, quantity, { size, color: product.color || null });
    showToast(`${product.title} (size ${size}) added to your cart`);
  };

  return (
    <main className="product-details">
      <nav className="product-details__crumbs" aria-label="Breadcrumb">
        <Link to="/products">Shop</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <strong>{product.title}</strong>
      </nav>

      <div className="product-details__main">
        <div className="product-details__gallery">
          <img src={product.image} alt={product.title} className="product-details__image" />
        </div>

        <div className="product-details__info">
          <span className="product-details__category">{product.category}</span>
          <h1 className="product-details__title">{product.title}</h1>
          <div className="product-details__rating">
            <Rating value={product.rating} />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <p className="product-details__price">${product.price.toFixed(2)}</p>
          <p className="product-details__description">
            The {product.title} is crafted from breathable materials for all-day comfort, featuring
            a responsive midsole and a durable outsole built for the {product.category.toLowerCase()}{" "}
            category.
          </p>

          <div className="product-details__block">
            <div className="product-details__label">
              <span>Select Size</span>
              <small>US Men</small>
            </div>
            <div className="product-details__sizes" role="radiogroup" aria-label="Size">
              {SHOE_SIZES.map(function (option) {
                return (
                  <button
                    type="button"
                    key={option}
                    role="radio"
                    aria-checked={size === option}
                    className={`product-details__size ${
                      size === option ? "product-details__size--active" : ""
                    }`}
                    onClick={function () {
                      setSize(option);
                      setSizeError("");
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {sizeError && (
              <p key={errorKey} className="product-details__error" role="alert">
                {sizeError}
              </p>
            )}
          </div>

          <div className="product-details__actions">
            <div className="product-details__stepper">
              <button type="button" onClick={decreaseQuantity} aria-label="Decrease quantity">
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={increaseQuantity} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button type="button" className="btn btn--primary product-details__cta" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <ul className="product-details__perks">
            <li>Free shipping over ${FREE_SHIPPING_THRESHOLD}</li>
            <li>{RETURN_DAYS}-day returns</li>
            <li>Secure checkout</li>
          </ul>

          <details className="product-details__accordion">
            <summary>Product Details</summary>
            <p>
              Lightweight breathable upper, cushioned responsive midsole and a grippy outsole for
              everyday performance.
            </p>
          </details>
          <details className="product-details__accordion">
            <summary>Shipping &amp; Returns</summary>
            <p>
              Orders over ${FREE_SHIPPING_THRESHOLD} ship free. Unworn pairs can be returned within{" "}
              {RETURN_DAYS} days.
            </p>
          </details>
        </div>
      </div>

      <ProductGrid title="You May Also Like" products={relatedProducts} />
    </main>
  );
};

const ProductDetails = function () {
  const { id } = useParams();
  const product = products.find(function (item) {
    return item.id === Number(id);
  });

  if (!product) {
    return (
      <main className="product-details product-details--empty">
        <h1>Product not found</h1>
        <p>This pair may have been moved or is no longer available.</p>
        <Link to="/products" className="btn btn--dark">
          Back to Shop
        </Link>
      </main>
    );
  }

  return <ProductView key={product.id} product={product} />;
};

export default ProductDetails;
