

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { fetchCart, addCartItem, updateCartItem, removeCartItem, syncCart } from "../api/cart";

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

const mapServerItem = function (item) {
  return {
    id: item.id,
    cartItemId: item.cartItemId,
    title: item.title,
    price: Number(item.price),
    image: item.image,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  };
};

export const CartProvider = function ({ children }) {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(function () {
    if (!isAuthenticated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  useEffect(function () {
    if (isAuthenticated && !hasSynced) {
      const localItems = loadCartFromStorage();

      syncCart(localItems)
        .then(function (serverItems) {
          setCartItems(serverItems.map(mapServerItem));
          localStorage.removeItem(CART_STORAGE_KEY);
          setHasSynced(true);
        })
        .catch(function () {
          fetchCart()
            .then(function (serverItems) {
              setCartItems(serverItems.map(mapServerItem));
              setHasSynced(true);
            })
            .catch(function () {});
        });
    }

    if (!isAuthenticated) {
      setHasSynced(false);
    }
  }, [isAuthenticated, hasSynced]);

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

    if (isAuthenticated) {
      addCartItem({
        cartItemId,
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity,
      }).catch(function () {});
    }
  };

  const removeFromCart = function (cartItemId) {
    setCartItems(function (prevItems) {
      return prevItems.filter(function (item) {
        return item.cartItemId !== cartItemId;
      });
    });

    if (isAuthenticated) {
      removeCartItem(cartItemId).catch(function () {});
    }
  };

  const updateQuantity = function (cartItemId, quantity) {
    setCartItems(function (prevItems) {
      return prevItems.map(function (item) {
        return item.cartItemId === cartItemId ? { ...item, quantity } : item;
      });
    });

    if (isAuthenticated) {
      updateCartItem(cartItemId, quantity).catch(function () {});
    }
  };

  const clearCart = function () {
    if (isAuthenticated) {
      cartItems.forEach(function (item) {
        removeCartItem(item.cartItemId).catch(function () {});
      });
    }
    setCartItems([]);
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
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = function () {
  return useContext(CartContext);
};

export default CartContext;