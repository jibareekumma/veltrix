

import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/OfferBanner.css";

const OfferBanner = function () {
  return (
    <section className="offer-banner">
      <div className="offer-banner__media">
        <ImagePlaceholder className="offer-banner__image" label="Featured Shoe" ratio="1/1" />
      </div>
      <div className="offer-banner__content">
        <h2 className="offer-banner__heading">Get 15% Off</h2>
        <h3 className="offer-banner__subheading">Aero Sprint Collection</h3>
        <p className="offer-banner__tag">#BuiltForSpeed</p>
        <Link to="/products" className="offer-banner__cta">
          Shop The Drop
        </Link>
      </div>
    </section>
  );
};

export default OfferBanner;