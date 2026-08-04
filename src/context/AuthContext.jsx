


import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    supabase.auth.getSession().then(function ({ data }) {
      setUser(data.session ? data.session.user : null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(function (event, session) {
      setUser(session ? session.user : null);
    });

    return function () {
      listener.subscription.unsubscribe();
    };
  }, []);

  const register = async function (name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    setUser(data.user);
    return data.user;
  };

  const login = async function (email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    setUser(data.user);
    return data.user;
  };

  const logout = async function () {
    await supabase.auth.signOut();
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