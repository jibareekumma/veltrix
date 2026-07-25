


import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../css/Products.css";

const Products = function () {
  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = function (event) {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...products].sort(function (a, b) {
    if (sortOption === "price") {
      return a.price - b.price;
    }
    if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

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
        {sortedProducts.map(function (product) {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <div className="products-page__pagination">
        <span className="products-page__page-btn">&#8592;</span>
        <span className="products-page__page-btn products-page__page-btn--active">1</span>
        <span className="products-page__page-btn">2</span>
        <span className="products-page__page-btn">3</span>
        <span className="products-page__page-btn">&#8594;</span>
      </div>
    </main>
  );
};

export default Products;