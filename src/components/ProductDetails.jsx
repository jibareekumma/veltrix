

import { useState } from "react";
import { useParams } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
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

  if (!product) {
    return <main className="product-details product-details--empty">Product not found</main>;
  }

  const relatedProducts = products
    .filter(function (item) {
      return item.id !== product.id;
    })
    .slice(0, 4);

  const handleAddToCart = function () {
    addToCart(product, quantity);
  };

  return (
    <main className="product-details">
      <div className="product-details__main">
        <div className="product-details__gallery">
          <ImagePlaceholder className="product-details__image" label={product.title} ratio="1/1" />
          <div className="product-details__thumbs">
            <ImagePlaceholder className="product-details__thumb" ratio="1/1" />
            <ImagePlaceholder className="product-details__thumb" ratio="1/1" />
            <ImagePlaceholder className="product-details__thumb" ratio="1/1" />
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