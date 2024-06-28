import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUsername(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsername(response.data.body.firstName); // Assumez que vous souhaitez afficher le prénom
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = (userToken, userName) => {
    setIsAuthenticated(true);
    setUsername(userName);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
