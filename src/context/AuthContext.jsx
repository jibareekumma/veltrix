


import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:8000/api/auth";

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    const accessToken = localStorage.getItem("veltrixAccessToken");

    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Session expired");
        }
        return response.json();
      })
      .then(function (data) {
        setUser(data.user);
      })
      .catch(function () {
        localStorage.removeItem("veltrixAccessToken");
        localStorage.removeItem("veltrixRefreshToken");
        setUser(null);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  const storeTokens = function (access, refresh) {
    localStorage.setItem("veltrixAccessToken", access);
    localStorage.setItem("veltrixRefreshToken", refresh);
  };

  const register = async function (name, email, password, confirmPassword) {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      const firstError = Object.values(data)[0];
      throw new Error(Array.isArray(firstError) ? firstError[0] : "Something went wrong");
    }

    storeTokens(data.access, data.refresh);
    setUser(data.user);
    return data.user;
  };

  const login = async function (email, password) {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    storeTokens(data.access, data.refresh);
    setUser(data.user);
    return data.user;
  };

  const logout = function () {
    localStorage.removeItem("veltrixAccessToken");
    localStorage.removeItem("veltrixRefreshToken");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = function () {
  return useContext(AuthContext);
};