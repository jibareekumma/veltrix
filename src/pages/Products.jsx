import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";
import Pagination from "../components/shop/Pagination";
import Reveal from "../components/common/Reveal";
import products from "../data/products";
import "../styles/pages/Products.scss";

const PAGE_SIZE = 8;

const categories = [
  "All",
  ...new Set(
    products.map(function (product) {
      return product.category;
    })
  ),
];

const sortProducts = function (list, sortOption) {
  const sorted = [...list];

  if (sortOption === "price-low") {
    return sorted.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  if (sortOption === "price-high") {
    return sorted.sort(function (a, b) {
      return b.price - a.price;
    });
  }
  if (sortOption === "rating") {
    return sorted.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }
  return sorted;
};

const Products = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("default");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const requestedCategory = searchParams.get("category");
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : "All";

  const handleCategoryChange = function (category) {
    setSearchParams(category === "All" ? {} : { category });
    setPage(0);
  };

  const handleSortChange = function (event) {
    setSortOption(event.target.value);
    setPage(0);
  };

  const handleQueryChange = function (event) {
    setQuery(event.target.value);
    setPage(0);
  };

  const clearFilters = function () {
    setSearchParams({});
    setQuery("");
    setPage(0);
  };

  const filteredProducts = products.filter(function (product) {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesQuery = product.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const sortedProducts = sortProducts(filteredProducts, sortOption);
  const pageCount = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(pageCount - 1, 0));
  const start = safePage * PAGE_SIZE;
  const visibleProducts = sortedProducts.slice(start, start + PAGE_SIZE);
  const gridKey = [activeCategory, sortOption, query, safePage].join("|");

  return (
    <main className="products-page">
      <div className="products-page__intro">
        <h1 className="section-title">All Shoes</h1>
        <p className="products-page__count">
          {sortedProducts.length} {sortedProducts.length === 1 ? "style" : "styles"}
        </p>
      </div>

      <div className="products-page__toolbar">
        <div className="products-page__filters" role="group" aria-label="Filter by category">
          {categories.map(function (category) {
            return (
              <button
                type="button"
                key={category}
                className={`products-page__chip ${
                  category === activeCategory ? "products-page__chip--active" : ""
                }`}
                onClick={function () {
                  handleCategoryChange(category);
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="products-page__controls">
          <input
            type="search"
            className="products-page__search"
            placeholder="Search shoes"
            value={query}
            onChange={handleQueryChange}
            aria-label="Search shoes"
          />
          <select
            className="products-page__sort"
            value={sortOption}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <>
          <div className="products-page__grid" key={gridKey}>
            {visibleProducts.map(function (product, index) {
              return (
                <Reveal key={product.id} delay={index * 60}>
                  <ProductCard product={product} />
                </Reveal>
              );
            })}
          </div>
          <Pagination page={safePage} pageCount={pageCount} onChange={setPage} />
        </>
      ) : (
        <div className="products-page__empty">
          <h2>No shoes found</h2>
          <p>Try a different search or category.</p>
          <button type="button" className="btn btn--dark" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
};

export default Products;
