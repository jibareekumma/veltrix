import { Link } from "react-router-dom";
import { RETURN_DAYS } from "../../data/store";
import "../../styles/components/Hero.scss";

import heroShoe from "/images/hero_shoe.png";

const stats = [
  { id: 1, value: "12", label: "Signature styles" },
  { id: 2, value: "4", label: "Categories" },
  { id: 3, value: RETURN_DAYS, label: "Day returns" },
];

const Hero = function () {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">New Season Drop</span>
          <h1 className="hero__title">
            Step Into
            <span className="hero__title-accent">Your Stride</span>
          </h1>
          <p className="hero__text">
            Engineered comfort meets street-ready style. Explore the collection built for every mile
            you take.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn--primary">
              Shop Now
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/products?category=Running" className="btn btn--outline-light">
              Running Collection
            </Link>
          </div>
          <ul className="hero__stats">
            {stats.map(function (stat) {
              return (
                <li key={stat.id} className="hero__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hero__media">
          <img src={heroShoe} alt="Veltrix performance running shoe" className="hero__image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
