'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user on load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in a real app, this would verify credentials
    // For this simple implementation, we just store the email
    const newUser = { email, name: email.split('@')[0] };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const signup = (email, password, name) => {
    // Mock signup
    const newUser = { email, name };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const saveSearch = (searchParams) => {
    if (!user) return;
    
    // Get existing history or init empty array
    const history = JSON.parse(localStorage.getItem(`history_${user.email}`) || '[]');
    
    // Add new search with timestamp
    const newSearch = { 
      ...searchParams, 
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    const updatedHistory = [newSearch, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem(`history_${user.email}`, JSON.stringify(updatedHistory));
  };

  const getHistory = () => {
    if (!user) return [];
    return JSON.parse(localStorage.getItem(`history_${user.email}`) || '[]');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, saveSearch, getHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
