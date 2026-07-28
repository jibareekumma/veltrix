


import { useEffect, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/CategorySlider.css";

import lifestyleSneekers from "/images/lifestyle_sneekers.jpg"
import runningShoes from "/images/running_shoes.jpg"
import hikingShoes from "/images/hiking_boots.jpg"
import trainingShoes from "/images/training_shoes.jpg"

const categories = [
  { id: 1, label: "Running Shoes", image: runningShoes },
  { id: 2, label: "Lifestyle Sneakers", image: lifestyleSneekers },
  { id: 3, label: "Hiking Boots", image: hikingShoes },
  { id: 4, label: "Training Shoes", image: trainingShoes },
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
              <img src = {category.image} 
              alt="Images Of Shoe" loading="lazy"/>
              <span className="category-slider__label">{category.label}
              </span>
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