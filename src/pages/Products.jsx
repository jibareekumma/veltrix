

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

const sortComparators = {
  default: function () {
    return 0;
  },
  "price-asc": function (a, b) {
    return a.price - b.price;
  },
  "price-desc": function (a, b) {
    return b.price - a.price;
  },
  "rating-desc": function (a, b) {
    return b.rating - a.rating;
  },
  "name-asc": function (a, b) {
    return a.title.localeCompare(b.title);
  },
  "name-desc": function (a, b) {
    return b.title.localeCompare(a.title);
  },
};

const categoryOptions = Array.from(
  new Set(products.map(function (product) {
    return product.category;
  }))
);

const Products = function () {
  const [sortOption, setSortOption] = useState("default");
  const [page, setPage] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleSortChange = function (event) {
    setSortOption(event.target.value);
    setPage(0);
  };

  const handleFilterChange = function (setter) {
    return function (event) {
      setter(event.target.value);
      setPage(0);
    };
  };

  const handleInStockToggle = function (event) {
    setInStockOnly(event.target.checked);
    setPage(0);
  };

  const clearFilters = function () {
    setCategoryFilter("all");
    setSizeFilter("all");
    setMinPrice("");
    setMaxPrice("");
    setRatingFilter("all");
    setInStockOnly(false);
    setPage(0);
  };

  const allProducts = extendWithPlaceholders(products, PAGE_SIZE * PAGE_COUNT);

  const filteredProducts = allProducts.filter(function (product) {
    if (categoryFilter !== "all" && product.category !== categoryFilter) {
      return false;
    }
    if (sizeFilter !== "all" && !product.sizes.includes(Number(sizeFilter))) {
      return false;
    }
    if (minPrice !== "" && product.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice !== "" && product.price > Number(maxPrice)) {
      return false;
    }
    if (ratingFilter !== "all" && product.rating < Number(ratingFilter)) {
      return false;
    }
    if (inStockOnly && !product.inStock) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort(sortComparators[sortOption]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
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
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <div className="products-page__filters">
        <select
          className="products-page__filter"
          value={categoryFilter}
          onChange={handleFilterChange(setCategoryFilter)}
        >
          <option value="all">All Categories</option>
          {categoryOptions.map(function (category) {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>

        <select
          className="products-page__filter"
          value={sizeFilter}
          onChange={handleFilterChange(setSizeFilter)}
        >
          <option value="all">All Sizes</option>
          <option value="7">Size 7</option>
          <option value="8">Size 8</option>
          <option value="9">Size 9</option>
          <option value="10">Size 10</option>
          <option value="11">Size 11</option>
        </select>

        <input
          type="number"
          className="products-page__filter products-page__filter--price"
          placeholder="Min $"
          value={minPrice}
          onChange={handleFilterChange(setMinPrice)}
        />
        <input
          type="number"
          className="products-page__filter products-page__filter--price"
          placeholder="Max $"
          value={maxPrice}
          onChange={handleFilterChange(setMaxPrice)}
        />

        <select
          className="products-page__filter"
          value={ratingFilter}
          onChange={handleFilterChange(setRatingFilter)}
        >
          <option value="all">Any Rating</option>
          <option value="4.5">4.5 & up</option>
          <option value="4">4 & up</option>
          <option value="3">3 & up</option>
        </select>

        <label className="products-page__filter products-page__filter--checkbox">
          <input type="checkbox" checked={inStockOnly} onChange={handleInStockToggle} />
          In Stock Only
        </label>

        <button type="button" className="products-page__filter-clear" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="products-page__empty">No shoes match your filters right now.</p>
      ) : (
        <div className="products-page__grid">
          {visibleProducts.map(function (product) {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      )}

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