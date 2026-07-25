

import Hero from "./Hero";
import CategorySlider from "./CategorySlider";
import ProductGrid from "./ProductGrid";
import OfferBanner from "./OfferBanner";
import Testimonials from "./Testimonials";
import BrandsStrip from "./BrandsStrip";
import products from "../data/products";

const Home = function () {
  const newArrivals = products.slice(0, 8);
  const trending = products.slice(4, 12);

  return (
    <main className="home">
      <Hero />
      <CategorySlider />

      <ProductGrid 
      title="New Arrivals" products={newArrivals} />

      <ProductGrid 
      title="Trending Now" products={trending} />

      <OfferBanner />
      <Testimonials />
      <BrandsStrip />
    </main>
  );
};

export default Home;