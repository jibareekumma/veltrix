import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../css/Products.css";

const PAGE_SIZE = 8;
const PAGE_COUNT = 3;

const extendWithPlaceholders = function (sourceProducts, totalCount) {
  return Array.from({ length: totalCount }, function (_, index) {
    const source = sourceProducts[index % sourceProducts.length];
    if (index < sourceProducts.length) {
      return source;
    }
    return {
      ...source,
      id: `${source.id}-page${Math.floor(index / sourceProducts.length)}`,
      image: null,
    };
  });
};

const Products = function () {
  const [sortOption, setSortOption] = useState("default");
  const [page, setPage] = useState(0);

  const handleSortChange = function (event) {
    setSortOption(event.target.value);
  };

  const allProducts = extendWithPlaceholders(products, PAGE_SIZE * PAGE_COUNT);

  const sortedProducts = [...allProducts].sort(function (a, b) {
    if (sortOption === "price") {
      return a.price - b.price;
    }
    if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const pageCount = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visibleProducts = sortedProducts.slice(start, start + PAGE_SIZE);

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

  const goToPage = function (index) {
    setPage(index);
  };

  return (
    <main className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">All Shoes</h1>
        <select className="products-page__sort" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default Sorting</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      <div className="products-page__grid">
        {visibleProducts.map(function (product) {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <div className="products-page__pagination">
        <button type="button" className="products-page__page-btn" onClick={goToPreviousPage} aria-label="Previous page">
          &#8592;
        </button>
        {Array.from({ length: pageCount }).map(function (_, index) {
          return (
            <button
              type="button"
              key={index}
              className={`products-page__page-btn ${index === page ? "products-page__page-btn--active" : ""}`}
              onClick={function () {
                goToPage(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button type="button" className="products-page__page-btn" onClick={goToNextPage} aria-label="Next page">
          &#8594;
        </button>
      </div>
    </main>
  );
};

export default Products;
