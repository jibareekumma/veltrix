import Hero from "../components/home/Hero";
import Perks from "../components/home/Perks";
import CategorySlider from "../components/home/CategorySlider";
import ProductGrid from "../components/shop/ProductGrid";
import OfferBanner from "../components/home/OfferBanner";
import Testimonials from "../components/home/Testimonials";
import products from "../data/products";

const newArrivals = products.slice(-8).reverse();

const trending = [...products]
  .sort(function (a, b) {
    return b.rating - a.rating;
  })
  .slice(0, 4);

const Home = function () {
  return (
    <main className="home">
      <Hero />
      <Perks />
      <CategorySlider />
      <ProductGrid
        title="New Arrivals"
        products={newArrivals}
        pageSize={4}
        actionLabel="View All"
        actionTo="/products"
      />
      <OfferBanner />
      <ProductGrid
        title="Trending Now"
        products={trending}
        actionLabel="Shop Top Rated"
        actionTo="/products"
      />
      <Testimonials />
    </main>
  );
};

export default Home;
