import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user info is stored in local storage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // FastAPI OAuth2PasswordRequestForm requires URL encoded form data
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = response.data.access_token;
    localStorage.setItem('token', token);
    
    // Now fetch the actual user profile
    const profileResponse = await axios.get('http://localhost:8000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const userData = profileResponse.data;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
