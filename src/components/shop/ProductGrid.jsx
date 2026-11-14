import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Reveal from "../common/Reveal";
import "../../styles/components/ProductGrid.scss";

const ProductGrid = function ({ title, products, actionLabel, actionTo, pageSize = 8 }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(products.length / pageSize);
  const start = page * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  return (
    <section className="product-grid">
      <div className="product-grid__header">
        <h2 className="section-title">{title}</h2>
        {actionLabel && actionTo && (
          <Link to={actionTo} className="link-arrow">
            {actionLabel}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="product-grid__list" key={page}>
        {visibleProducts.map(function (product, index) {
          return (
            <Reveal key={product.id} delay={index * 70}>
              <ProductCard product={product} />
            </Reveal>
          );
        })}
      </div>
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
};

export default ProductGrid;
