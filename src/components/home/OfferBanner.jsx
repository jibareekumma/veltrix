import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import "../../styles/components/OfferBanner.scss";

import featuredShoe from "/images/featured_shoe.png";

const OfferBanner = function () {
  return (
    <section className="offer-banner">
      <Reveal>
        <div className="offer-banner__card">
          <div className="offer-banner__media">
            <img src={featuredShoe} alt="Aero Sprint featured shoe" loading="lazy" />
          </div>
          <div className="offer-banner__content">
            <span className="offer-banner__eyebrow">Limited Offer</span>
            <h2 className="offer-banner__heading">Get 15% Off</h2>
            <h3 className="offer-banner__subheading">Aero Sprint Collection</h3>
            <p className="offer-banner__tag">#BuiltForSpeed</p>
            <Link to="/product/6" className="btn btn--primary">
              Shop The Drop
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default OfferBanner;
