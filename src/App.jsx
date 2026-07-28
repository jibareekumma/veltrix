


import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./pages/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/Cart";
import Intro from "./components/authPages/Intro";

const App = function () {
  const location = useLocation();
  const isStandalonePage = location.pathname === "/";

  return (
    <>
      {!isStandalonePage && <Header />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {!isStandalonePage && <Footer />}
    </>
  );
};

export default App;