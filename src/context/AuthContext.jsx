


import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    const storedUser = localStorage.getItem("veltrix_user");
    const accessToken = localStorage.getItem("veltrix_access_token");

    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const register = async function (name, email, password) {
    const data = await registerRequest(name, email, password);
    localStorage.setItem("veltrix_access_token", data.tokens.access);
    localStorage.setItem("veltrix_refresh_token", data.tokens.refresh);
    localStorage.setItem("veltrix_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const login = async function (email, password) {
    const data = await loginRequest(email, password);
    localStorage.setItem("veltrix_access_token", data.tokens.access);
    localStorage.setItem("veltrix_refresh_token", data.tokens.refresh);
    localStorage.setItem("veltrix_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = function () {
    localStorage.removeItem("veltrix_access_token");
    localStorage.removeItem("veltrix_refresh_token");
    localStorage.removeItem("veltrix_user");
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