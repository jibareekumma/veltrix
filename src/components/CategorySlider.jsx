


import { useEffect, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/CategorySlider.css";

const categories = [
  { id: 1, label: "Running Shoes" },
  { id: 2, label: "Lifestyle Sneakers" },
  { id: 3, label: "Hiking Boots" },
];

const CategorySlider = function () {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(function () {
    const timer = setInterval(function () {
      setActiveIndex(function (prevIndex) {
        return (prevIndex + 1) % categories.length;
      });
    }, 2500);
    return function () {
      clearInterval(timer);
    };
  }, []);

  const goToSlide = function (index) {
    setActiveIndex(index);
  };

  return (
    <section className="category-slider">
      <h2 className="section-title">Featured Categories</h2>
      <div className="category-slider__viewport">
        {categories.map(function (category, index) {
          return (
            <div
              key={category.id}
              className={`category-slider__slide ${
                index === activeIndex ? "category-slider__slide--active" : ""
              }`}
            >
              <ImagePlaceholder className="category-slider__image" label={category.label} ratio="16/7" />
              <span className="category-slider__label">{category.label}</span>
            </div>
          );
        })}
      </div>
      <div className="category-slider__dots">
        {categories.map(function (category, index) {
          return (
            <span
              key={category.id}
              className={`category-slider__dot ${
                index === activeIndex ? "category-slider__dot--active" : ""
              }`}
              onClick={function () {
                goToSlide(index);
              }}
            ></span>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySlider;