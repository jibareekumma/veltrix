


import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = function ({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = function (product, quantity = 1) {
    setCartItems(function (prevItems) {
      const existingItem = prevItems.find(function (item) {
        return item.id === product.id;
      });
      if (existingItem) {
        return prevItems.map(function (item) {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = function (productId) {
    setCartItems(function (prevItems) {
      return prevItems.filter(function (item) {
        return item.id !== productId;
      });
    });
  };

  const updateQuantity = function (productId, quantity) {
    setCartItems(function (prevItems) {
      return prevItems.map(function (item) {
        return item.id === productId ? { ...item, quantity } : item;
      });
    });
  };

  const cartCount = cartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = function () {
  return useContext(CartContext);
};

export default CartContext;