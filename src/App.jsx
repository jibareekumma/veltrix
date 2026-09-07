


import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./pages/Products";
import ProductDetails from "./components/ProductDetails";


import Cart from "./pages/Cart";
import Intro from "./components/authPages/Intro";
import Register from "./components/authPages/Register";
import Login from "./components/authPages/Login";
import Contact from "./components/Contact";

const standalonePaths = ["/", "/register", "/login"];

const App = function () {
  const location = useLocation();
  const isStandalonePage = standalonePaths.includes(location.pathname);

  return (
    <>
      {!isStandalonePage && <Header />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path = "/contact" element = {<Contact/>}/>
      </Routes>
      {!isStandalonePage && <Footer />}
    </>
  );
};

export default App;