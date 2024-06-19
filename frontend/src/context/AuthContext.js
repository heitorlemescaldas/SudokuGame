import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await loginService(username, password);
      setUser(response.data);
      navigate('/game');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registerService(username, email, password);
      setUser(response.data);
      navigate('/game');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
