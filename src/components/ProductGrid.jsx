

import ProductCard from "./ProductCard";
import "../css/ProductGrid.css";

const ProductGrid = function ({ title, products, actionLabel }) {
  return (
    <section className="product-grid">
      <div className="product-grid__header">
        <h2 className="section-title">{title}</h2>
        {actionLabel && <span className="product-grid__action">{actionLabel}</span>}
      </div>
      <div className="product-grid__list">
        {products.map(function (product) {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default ProductGrid;