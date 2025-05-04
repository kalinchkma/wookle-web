
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("shopzone_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, role = "buyer") => {
    // In a real app, this would validate credentials with a backend
    const user = {
      id: userData.id || "user_" + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      role: role,
      avatar: userData.avatar || null
    };
    
    setUser(user);
    localStorage.setItem("shopzone_user", JSON.stringify(user));
    return user;
  };

  const register = (userData, role = "buyer") => {
    // In a real app, this would send registration data to a backend
    const user = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      role: role,
      avatar: null
    };
    
    setUser(user);
    localStorage.setItem("shopzone_user", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopzone_user");
  };

  const updateUserRole = (role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("shopzone_user", JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  };

  const updateUserProfile = (userData) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("shopzone_user", JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserRole,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
