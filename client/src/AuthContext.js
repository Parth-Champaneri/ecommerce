// AuthContext.js

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem('idToken', token);
    setIsAuthenticated(true);
    navigate('/products'); // Redirect to products page after login
  };

  const logout = () => {
    localStorage.removeItem('idToken');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
