

import { useState } from "react";
import { useParams } from "react-router-dom";

import ProductGrid from "./ProductGrid";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import "../css/ProductDetails.css";

const ProductDetails = function () {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(function (item) {
    return item.id === Number(id);
  });
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState("")

  if (!product) {
    return <main className="product-details product-details--empty">Product not found</main>;
  }

  const relatedProducts = products
    .filter(function (item) {
      return item.id !== product.id;
    })
    .slice(0, 4);

  const handleAddToCart = function () {
  if (!size) {
    setSizeError("Size is required before adding to cart")
    return;
  }
  setSizeError("")
  addToCart(product, quantity, { size, color: product.color || null });
};

  return (
    <main className="product-details">
      <div className="product-details__main">
        
      <div className="product-details__gallery">
  <img src={product.image} alt={product.title} className="product-details__image" />
  <div className="product-details__thumbs">
    <img src={product.image} alt={product.title} className="product-details__thumb" />
    <img src={product.image} alt={product.title} className="product-details__thumb" />
    <img src={product.image} alt={product.title} className="product-details__thumb" />
  </div>
</div>

        <div className="product-details__info">
          <h1 className="product-details__title">{product.title}</h1>
          <p className="product-details__price">${product.price.toFixed(2)}</p>
          <select
            className="product-details__size"
            value={size}
            onChange={function (event) {
              setSize(event.target.value);
            }}
          >
            <option value="">Choose Size</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
          <input
            type="number"
            min="1"
            value={quantity}
            className="product-details__quantity"
            onChange={function (event) {
              setQuantity(Number(event.target.value));
            }}
          />

          {sizeError && 
            <p className="size-error-message">{sizeError}</p>
          }
          <button className="product-details__cta" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <h3 className="product-details__section-heading">Product Details</h3>
          <p className="product-details__description">
            The {product.title} is crafted from breathable materials for all-day comfort, featuring a
            responsive midsole and a durable outsole built for the {product.category.toLowerCase()} category.
          </p>
        </div>
      </div>
      <ProductGrid title="Related Products" products={relatedProducts} />
    </main>
  );
};

export default ProductDetails;