import Hero from "./Hero";
import CategorySlider from "./CategorySlider";
import ProductGrid from "./ProductGrid";
import OfferBanner from "./OfferBanner";
import Testimonials from "./Testimonials";
import BrandsStrip from "./BrandsStrip";
import products from "../data/products";

const PAGE_SIZE = 8;
const PAGE_COUNT = 3;

const extendWithPlaceholders = function (sourceProducts, totalCount) {
  return Array.from({ length: totalCount }, function (_, index) {
    const source = sourceProducts[index % sourceProducts.length];
    if (index < sourceProducts.length) {
      return source;
    }
    return {
      ...source,
      id: `${source.id}-page${Math.floor(index / sourceProducts.length)}`,
      image: null,
    };
  });
};

const Home = function () {
  const newArrivals = extendWithPlaceholders(products.slice(0, 8), PAGE_SIZE * PAGE_COUNT);
  const trending = extendWithPlaceholders(products.slice(4, 12), PAGE_SIZE * PAGE_COUNT);

  return (
    <main className="home">
      <Hero />
      <CategorySlider />

      <ProductGrid title="New Arrivals" products={newArrivals} />

      <ProductGrid title="Trending Now" products={trending} />

      <OfferBanner />
      <Testimonials />
      <BrandsStrip />
    </main>
  );
};

export default Home;
