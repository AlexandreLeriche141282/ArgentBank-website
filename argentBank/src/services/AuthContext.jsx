import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const login = (newToken, newUserName) => {
        setToken(newToken);
        setUserName(newUserName);
        localStorage.setItem('token', newToken);
        localStorage.setItem('userName', newUserName);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken(null);
        setUserName(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
    };

    const updateUserName = (newUserName) => {
        setUserName(newUserName);
        localStorage.setItem('userName', newUserName);
    };

    return (
        <AuthContext.Provider value={{ token, userName, isAuthenticated, login, logout, updateUserName }}>
            {children}
        </AuthContext.Provider>
    );
};