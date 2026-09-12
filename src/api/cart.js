

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/auth", "/cart")
  : "http://127.0.0.1:8000/api/cart";

const getAuthHeaders = function () {
  const token = localStorage.getItem("veltrix_access_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchCart = async function () {
  const response = await fetch(`${API_BASE}/`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

export const addCartItem = async function (item) {
  const response = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to add cart item");
  }

  return response.json();
};

export const updateCartItem = async function (cartItemId, quantity) {
  const response = await fetch(`${API_BASE}/${cartItemId}/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }

  return response.json();
};

export const removeCartItem = async function (cartItemId) {
  const response = await fetch(`${API_BASE}/${cartItemId}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
};

export const syncCart = async function (items) {
  const response = await fetch(`${API_BASE}/sync/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync cart");
  }

  return response.json();
};