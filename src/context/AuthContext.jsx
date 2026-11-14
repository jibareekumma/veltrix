import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);
const GUEST_STORAGE_KEY = "veltrix_guest";

const readGuestFlag = function () {
  try {
    return sessionStorage.getItem(GUEST_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const writeGuestFlag = function (isActive) {
  try {
    if (isActive) {
      sessionStorage.setItem(GUEST_STORAGE_KEY, "true");
    } else {
      sessionStorage.removeItem(GUEST_STORAGE_KEY);
    }
  } catch {
    return;
  }
};

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guestActive, setGuestActive] = useState(readGuestFlag);

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

  const endGuestSession = function () {
    writeGuestFlag(false);
    setGuestActive(false);
  };

  const continueAsGuest = function () {
    writeGuestFlag(true);
    setGuestActive(true);
  };

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

    endGuestSession();
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

    endGuestSession();
    setUser(data.user);
    return data.user;
  };

  const logout = async function () {
    await supabase.auth.signOut();
    endGuestSession();
    setUser(null);
  };

  const displayName = user
    ? (user.user_metadata && user.user_metadata.name) || user.email
    : "Guest";

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    isGuest: guestActive && !user,
    displayName,
    register,
    login,
    logout,
    continueAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = function () {
  return useContext(AuthContext);
};
