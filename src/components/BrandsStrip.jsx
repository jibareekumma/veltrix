

import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/BrandsStrip.css";

const brands = [1, 2, 3, 4, 5];

const BrandsStrip = function () {
  return (
    <section className="brands-strip">
      <h2 className="section-title">Brands We Carry</h2>
      <div className="brands-strip__list">
        {brands.map(function (brandId) {
          return <ImagePlaceholder key={brandId} className="brands-strip__logo" label="Brand" ratio="2/1" />;
        })}
      </div>
    </section>
  );
};

export default BrandsStrip;