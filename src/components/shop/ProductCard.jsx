import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../../styles/components/ProductCard.scss";

const ProductCard = function ({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        <span className="product-card__tag">{product.category}</span>
        <span className="product-card__view" aria-hidden="true">
          View
          <span>→</span>
        </span>
      </div>
      <div className="product-card__body">
        <h4 className="product-card__title">{product.title}</h4>
        <div className="product-card__meta">
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          <Rating value={product.rating} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
