import { createContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    setToken(data.token);
    const userData = { id: data.userId, is_tutor: data.is_tutor };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const register = async (userData) => {
    await registerService(userData);
  };

  const logout = () => {
    setToken(null);
  };

  const value = { user, token, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};