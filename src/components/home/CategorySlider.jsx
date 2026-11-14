import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/CategorySlider.scss";

import lifestyleSneekers from "/images/lifestyle_sneekers.jpg";
import runningShoes from "/images/running_shoes.jpg";
import hikingShoes from "/images/hiking_boots.jpg";
import trainingShoes from "/images/training_shoes.jpg";

const categories = [
  { id: 1, label: "Running Shoes", image: runningShoes, category: "Running" },
  { id: 2, label: "Lifestyle Sneakers", image: lifestyleSneekers, category: "Lifestyle" },
  { id: 3, label: "Hiking Boots", image: hikingShoes, category: "Hiking" },
  { id: 4, label: "Training Shoes", image: trainingShoes, category: "Basketball" },
];

const SLIDE_DURATION = 4500;

const CategorySlider = function () {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(
    function () {
      if (isPaused) {
        return;
      }
      const timer = setTimeout(function () {
        setActiveIndex(function (prevIndex) {
          return (prevIndex + 1) % categories.length;
        });
      }, SLIDE_DURATION);
      return function () {
        clearTimeout(timer);
      };
    },
    [activeIndex, isPaused]
  );

  const goToSlide = function (index) {
    setActiveIndex(index);
  };

  const goToPrevious = function () {
    setActiveIndex(function (prevIndex) {
      return prevIndex === 0 ? categories.length - 1 : prevIndex - 1;
    });
  };

  const goToNext = function () {
    setActiveIndex(function (prevIndex) {
      return (prevIndex + 1) % categories.length;
    });
  };

  return (
    <section className="category-slider">
      <h2 className="section-title">Shop By Category</h2>
      <div
        className="category-slider__viewport"
        onMouseEnter={function () {
          setIsPaused(true);
        }}
        onMouseLeave={function () {
          setIsPaused(false);
        }}
      >
        {categories.map(function (category, index) {
          return (
            <div
              key={category.id}
              className={`category-slider__slide ${
                index === activeIndex ? "category-slider__slide--active" : ""
              }`}
              aria-hidden={index !== activeIndex}
            >
              <img src={category.image} alt={category.label} loading="lazy" />
              <div className="category-slider__overlay">
                <span className="category-slider__label">{category.label}</span>
                <Link
                  to={`/products?category=${category.category}`}
                  className="btn btn--primary"
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  Shop Collection
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          );
        })}
        <button
          type="button"
          className="category-slider__nav category-slider__nav--prev"
          onClick={goToPrevious}
          aria-label="Previous category"
        >
          ‹
        </button>
        <button
          type="button"
          className="category-slider__nav category-slider__nav--next"
          onClick={goToNext}
          aria-label="Next category"
        >
          ›
        </button>
      </div>
      <div className="category-slider__dots">
        {categories.map(function (category, index) {
          return (
            <button
              type="button"
              key={category.id}
              className={`category-slider__dot ${
                index === activeIndex ? "category-slider__dot--active" : ""
              }`}
              onClick={function () {
                goToSlide(index);
              }}
              aria-label={`Show ${category.label}`}
            ></button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySlider;
