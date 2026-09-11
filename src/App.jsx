

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
import EmailInput from "./components/authPages/EmailInput";
import CodeAuth from "./components/authPages/CodeAuth";
import NewPassword from "./components/authPages/NewPassword";
import Success from "./components/authPages/Success";
import Contact from "./components/Contact";

const standalonePaths = [
  "/",
  "/register",
  "/login",
  "/forgot-password",
  "/emailInput",
  "/codeAuth",
  "/newPassword",
  "/success",
];

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
        <Route path="/forgot-password" element={<EmailInput />} />
        <Route path="/emailInput" element={<EmailInput />} />
        <Route path="/codeAuth" element={<CodeAuth />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isStandalonePage && <Footer />}
    </>
  );
};

export default App;