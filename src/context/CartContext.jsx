


import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "veltrix_cart";

const loadCartFromStorage = function () {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

export const CartProvider = function ({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  useEffect(function () {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const buildCartItemId = function (productId, size, color) {
    return [productId, size || "no-size", color || "no-color"].join("-");
  };

  const addToCart = function (product, quantity = 1, options = {}) {
    const { size = null, color = null } = options;
    const cartItemId = buildCartItemId(product.id, size, color);

    setCartItems(function (prevItems) {
      const existingItem = prevItems.find(function (item) {
        return item.cartItemId === cartItemId;
      });
      if (existingItem) {
        return prevItems.map(function (item) {
          return item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      return [...prevItems, { ...product, size, color, quantity, cartItemId }];
    });
  };

  const removeFromCart = function (cartItemId) {
    setCartItems(function (prevItems) {
      return prevItems.filter(function (item) {
        return item.cartItemId !== cartItemId;
      });
    });
  };

  const updateQuantity = function (cartItemId, quantity) {
    setCartItems(function (prevItems) {
      return prevItems.map(function (item) {
        return item.cartItemId === cartItemId ? { ...item, quantity } : item;
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