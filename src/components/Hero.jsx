


import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/Hero.css";


import heroShoe from "/images/hero_shoe.png"

const Hero = function () {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">New Season Drop</span>
          <h1 className="hero__title">Step Into Your Stryde</h1>
          <p className="hero__text">
            Engineered comfort meets street-ready style. Explore the collection built for every mile you take.
          </p>
          <Link to="/products" className="hero__cta">
            Shop Now
          </Link>
        </div>
        <div className="hero__media">
          <img  
          src = {heroShoe}
          alt="Hero Shoe"  loading="lazy"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;