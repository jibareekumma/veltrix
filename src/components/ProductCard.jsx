

import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/ProductCard.css";

const ProductCard = function ({ product }) {
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <ImagePlaceholder className="product-card__image" label={product.title} ratio="1/1" />
      <h4 className="product-card__title">{product.title}</h4>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
      <div className="product-card__rating">
        {Array.from({ length: 5 }).map(function (_, index) {
          if (index < fullStars) {
            return (
              <span key={index} className="product-card__star product-card__star--full">
                ★
              </span>
            );
          }
          if (index === fullStars && hasHalfStar) {
            return (
              <span key={index} className="product-card__star product-card__star--half">
                ★
              </span>
            );
          }
          return (
            <span key={index} className="product-card__star">
              ★
            </span>
          );
        })}
      </div>
    </Link>
  );
};

export default ProductCard;