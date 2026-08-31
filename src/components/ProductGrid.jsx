


import { useState } from "react";
import ProductCard from "./ProductCard";
import "../css/ProductGrid.css";

const ProductGrid = function ({ title, products, actionLabel, pageSize = 8 }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(products.length / pageSize);
  const start = page * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  const goToPreviousPage = function () {
    setPage(function (prevPage) {
      return prevPage === 0 ? pageCount - 1 : prevPage - 1;
    });
  };

  const goToNextPage = function () {
    setPage(function (prevPage) {
      return (prevPage + 1) % pageCount;
    });
  };

  return (
    <section className="product-grid">
      <div className="product-grid__header">
        <h2 className="section-title">{title}</h2>
        {actionLabel && <span className="product-grid__action">{actionLabel}</span>}
      </div>
      <div className="product-grid__list">
        {visibleProducts.map(function (product) {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      {pageCount > 1 && (
        <div className="product-grid__pagination">
          <button
            type="button"
            className="product-grid__page-btn"
            onClick={goToPreviousPage}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className="product-grid__page-indicator">
            Page {page + 1} of {pageCount}
          </span>
          <button
            type="button"
            className="product-grid__page-btn"
            onClick={goToNextPage}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;